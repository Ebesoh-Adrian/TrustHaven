// trusthaven-frontend/src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth for listening to auth state
import { doc, getDoc } from 'firebase/firestore'; // Firestore for fetching user profile
// Update the import path below to match the actual location of your firebase.ts file.
// For example, if your firebase.ts is in 'src/firebase/firebase.ts', use:
// Update the path below to the actual location of your firebase.ts file.
// For example, if your firebase.ts is in 'src/firebase/firebase.ts', use:
import { auth, db } from '../firebase/firebase'; // Adjust the path as needed
import { UserProfile, UserRole } from '../types'; // Import your custom UserProfile and UserRole types

// 1. Define the shape of your AuthContext data
interface AuthContextType {
  currentUser: User | null; // The Firebase User object (from authentication)
  userProfile: UserProfile | null; // The custom user profile data from Firestore
  userRole: UserRole | null; // The specific role of the user ('explorer', 'pioneer', 'guardian')
  isLoading: boolean; // True while checking auth state and loading user profile
}

// 2. Create the AuthContext
// Provide a default undefined value initially. The Provider will set the real value.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the AuthProvider component
// This component will manage the authentication state and provide it to its children.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as loading, as we need to check auth state

  // useEffect to listen for Firebase Auth state changes
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function to clean up the listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user); // Set the Firebase User object

      if (user) {
        // If a user is logged in, fetch their custom profile data from Firestore
        try {
          const docRef = doc(db, 'users', user.uid); // Reference to the user's document
          const docSnap = await getDoc(docRef); // Fetch the document

          if (docSnap.exists()) {
            // If profile exists, cast it to UserProfile type and set states
            const profile = docSnap.data() as UserProfile;
            setUserProfile(profile);
            setUserRole(profile.role);
          } else {
            // User exists in Firebase Auth but no profile in Firestore (should ideally not happen post-registration)
            console.warn('User profile not found in Firestore for UID:', user.uid);
            setUserProfile(null);
            setUserRole(null); // Or assign a default 'guest' role here if necessary
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
          setUserRole(null);
        }
      } else {
        // No user is logged in, reset all states
        setUserProfile(null);
        setUserRole(null);
      }
      setIsLoading(false); // Authentication state check and profile loading is complete
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  // The value provided to all consumers of this context
  const contextValue: AuthContextType = {
    currentUser,
    userProfile,
    userRole,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create a custom hook to easily consume the AuthContext
// This hook makes it cleaner to use the context in functional components.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error helps catch bugs where useAuth is called outside AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};