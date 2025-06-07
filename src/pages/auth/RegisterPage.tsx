// trusthaven-frontend/src/pages/auth/RegisterPage.tsx

import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Globe, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import { Button } from '../../components/ui/Button';
import axios from '../../api/axios';

// Firebase Client SDK Imports
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  AuthError,
  ConfirmationResult,
} from 'firebase/auth';
import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase'; // Ensure correct path for firebase.ts
import { UserRole } from '../../types'; // Ensure correct path for types

// Define a type for your form data
interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string; // This 'phone' is only used if registering via email/password
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  selectedRole: UserRole;
}

// Declare window.recaptchaVerifier globally for Firebase RecaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    // Add any other global properties if necessary
  }
}


const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // State to manage which authentication method's UI is active
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email'); // 'email' or 'phone'

  // State for phone authentication specific inputs
  const [phoneInput, setPhoneInput] = useState(''); // Separate state for phone number input in OTP flow
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null); // Ref for the reCAPTCHA container

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '', // This 'phone' is only used if registering via email/password
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    selectedRole: 'explorer', // Default to 'explorer' (User)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Helper function to create Firestore user profile after successful auth
  const createUserProfileInFirestore = async (
    uid: string,
    email: string | null,
    phoneNumber: string | null,
    displayName: string | null
  ) => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        uid: uid,
        email: email,
        username: displayName || email?.split('@')[0] || phoneNumber || 'New User',
        phoneNumber: phoneNumber,
        role: formData.selectedRole, // Use the selected role from the form
        createdAt: Timestamp.now(),
        status: 'active',
      });
      console.log('User profile created in Firestore.');
    } else {
      console.log('Existing user profile found in Firestore, merging data.');
      // Update last login time and potentially phone number if it wasn't there before
      await setDoc(userDocRef, {
        lastLogin: Timestamp.now(),
        phoneNumber: phoneNumber || userDocSnap.data().phoneNumber || null,
        // If role was not set during initial signup, set it now.
        // Or if it was, ensure it's not overwritten if it was previously set.
        role: userDocSnap.data().role || formData.selectedRole,
      }, { merge: true });
    }
  };


  // --- Email/Password Registration (via Cloud Function) ---
  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      setIsLoading(false);
      return;
    }
    if (formData.selectedRole === 'guardian') {
      setError('Cannot register as a Guardian directly. Please contact support.');
      setIsLoading(false);
      return;
    }

    try {
      // IMPORTANT: Ensure your Firebase project ID is correctly set in .env file
      // and that your Firebase Cloud Function 'signup' is deployed and accessible.
      // If running locally, ensure Firebase Emulators are active.
      const FUNCTIONS_EMULATOR_URL = `http://127.0.0.1:5001/${import.meta.env.VITE_FIREBASE_PROJECT_ID}/us-central1/signup`;

      const response = await axios.post(FUNCTIONS_EMULATOR_URL, {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone, // This phone is for the initial profile creation, not for auth itself
        selectedRole: formData.selectedRole,
      }, {
        withCredentials: true
      });

      console.log('Registration successful:', response.data);
      alert('Account created successfully! Please sign in with your email and password.');
      navigate('/login');

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          axios.isAxiosError(err)
            ? err.response?.data?.message || err.message
            : (err instanceof Error ? err.message : String(err));
        console.error('Registration failed:', errorMessage);
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } else {
        console.error('Registration failed:', (err as Error).message);
        setError('Registration failed: An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- Google Sign-up ---
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy before signing up with Google.');
      setIsLoading(false);
      return;
    }
    if (formData.selectedRole === 'guardian') {
      setError('Cannot register as a Guardian directly via Google Sign-up. Please contact support.');
      setIsLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await createUserProfileInFirestore(user.uid, user.email, user.phoneNumber, user.displayName);

      alert('Successfully signed up with Google!');
      navigate('/dashboard');
    } catch (err) {
      const firebaseError = err as AuthError;
      console.error('Google registration failed:', firebaseError.message, firebaseError.code);
      let message = 'Google registration failed.';
      if (firebaseError.code === 'auth/popup-closed-by-user') {
        message = 'Google sign-in popup was closed or cancelled.';
      } else if (firebaseError.code === 'auth/cancelled-popup-request') {
        message = 'Google sign-in popup already open or cancelled.';
      } else if (firebaseError.code === 'auth/account-exists-with-different-credential') {
        message = 'An account with this email already exists using different sign-in methods (e.g., email/password). Try logging in with the existing method or linking accounts.';
      } else if (firebaseError.code === 'auth/network-request-failed') {
        message = 'Network error during Google sign-up. Check your internet connection.';
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Phone Number (OTP) Sign-up - Step 1: Send OTP ---
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!phoneInput) { // Use phoneInput state for this flow
      setError('Please enter your phone number.');
      setIsLoading(false);
      return;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      setIsLoading(false);
      return;
    }
    if (formData.selectedRole === 'guardian') {
      setError('Cannot register as a Guardian directly via Phone Sign-up. Please contact support.');
      setIsLoading(false);
      return;
    }

    try {
      if (!recaptchaContainerRef.current) {
        throw new Error("reCAPTCHA container not found. It's required for phone authentication.");
      }

      // Clear any previous reCAPTCHA instances before creating a new one
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        'size': 'invisible', // Can be 'normal' for a visible widget
        'callback': (response: unknown) => {
          // reCAPTCHA solved, this callback fires when the user is verified.
          console.log('reCAPTCHA solved:', response);
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.warn('reCAPTCHA expired.');
          setError('reCAPTCHA expired. Please try again.');
          setIsLoading(false); // Stop loading if reCAPTCHA expires
        }
      });

      // Explicitly call verify if using invisible reCAPTCHA before signInWithPhoneNumber,
      // though signInWithPhoneNumber often implicitly handles it.
      await window.recaptchaVerifier.verify();

      const confirmation = await signInWithPhoneNumber(auth, phoneInput, window.recaptchaVerifier); // Use phoneInput
      setConfirmationResult(confirmation);
      alert('OTP sent to your phone! Please enter it below.');
    } catch (err) {
      const firebaseError = err as AuthError;
      console.error('Error sending OTP:', firebaseError.message, firebaseError.code);
      let message = 'Failed to send OTP.';
      if (firebaseError.code === 'auth/too-many-requests') {
        message = 'Too many requests. Please try again later.';
      } else if (firebaseError.code === 'auth/invalid-phone-number') {
        message = 'Invalid phone number format. Please include country code (e.g., +2376xxxxxxxxx).';
      } else if (firebaseError.code === 'auth/quota-exceeded') {
        message = 'SMS quota exceeded. Please try again later.';
      } else if (firebaseError.code === 'auth/web-storage-unsupported') {
        message = 'Browser storage is disabled or unavailable, which is required for reCAPTCHA.';
      } else if (firebaseError.code === 'auth/missing-phone-number') {
        message = 'Phone number is missing.';
      } else if (firebaseError.code === 'auth/captcha-check-failed') {
        message = 'reCAPTCHA verification failed. Please try again.';
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Phone Number (OTP) Sign-up - Step 2: Verify OTP ---
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!otp) {
      setError('Please enter the OTP.');
      setIsLoading(false);
      return;
    }
    if (!confirmationResult) {
      setError('No OTP was sent. Please send OTP first.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Ensure the user's full name from the form is passed here for profile creation
      await createUserProfileInFirestore(user.uid, user.email, user.phoneNumber, formData.fullName);

      alert('Phone number verified and account created!');
      navigate('/dashboard');
    } catch (err) {
      const firebaseError = err as AuthError;
      console.error('Error verifying OTP:', firebaseError.message, firebaseError.code);
      let message = 'Failed to verify OTP.';
      if (firebaseError.code === 'auth/invalid-verification-code') {
        message = 'Invalid OTP. Please check the code and try again.';
      } else if (firebaseError.code === 'auth/code-expired') {
        message = 'The OTP has expired. Please request a new one.';
      } else if (firebaseError.code === 'auth/user-disabled') {
        message = 'This user account has been disabled.';
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-5">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">TH</span>
          </div>
        </Link>
        <h2 className="text-center text-3xl font-bold text-gray-900 flex items-center justify-center relative">
          {/* Back to Home Link */}
          <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <User className="w-8 h-8 mr-2 text-gray-400" />
          Sign Up
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          {error && (
            <div className="text-red-600 text-sm text-center p-2 border border-red-300 rounded-md bg-red-50 mb-4">
              {error}
            </div>
          )}

          {/* Styled "Sign Up as" Text */}
          <p className="mt-2 mb-4 text-center text-md font-semibold text-gray-700"> {/* Increased font, added weight and margin */}
            Sign Up as
          </p>

          {/* Role Selection Buttons at the top */}
          <div className="mb-6 flex justify-center space-x-4">
            <Button
              type="button"
              variant={formData.selectedRole === 'explorer' ? 'default' : 'outline'}
              className="px-6 py-2"
              onClick={() => setFormData(prev => ({ ...prev, selectedRole: 'explorer' }))}
            >
              User
            </Button>
            <Button
              type="button"
              variant={formData.selectedRole === 'pioneer' ? 'default' : 'outline'}
              className="px-6 py-2"
              onClick={() => setFormData(prev => ({ ...prev, selectedRole: 'pioneer' }))}
            >
              Business
            </Button>
          </div>
          {/* End Role Selection Buttons */}

          {/* Conditional rendering of Email/Password Form */}
          {authMethod === 'email' && (
            <form className="space-y-6" onSubmit={handleEmailPasswordSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number (Optional for Email/Password)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="+237 6XX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                isLoading={isLoading}
              >
                {!isLoading && <ArrowRight className="w-5 h-5 mr-2" />}
                Register with Email
              </Button>
            </form>
          )}

          {/* Conditional rendering of Phone Number (OTP) Form */}
          {authMethod === 'phone' && (
            <form className="space-y-6" onSubmit={e => e.preventDefault()}> {/* Prevent default form submission */}
              {/* This full name field will only be visible when phone auth is chosen */}
              <div>
                <label htmlFor="fullNamePhone" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullNamePhone" // Unique ID
                    name="fullName" // Keep name as 'fullName' to update formData correctly
                    type="text"
                    required
                    value={formData.fullName} // Use formData.fullName
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {!confirmationResult ? (
                <>
                  <div>
                    <label htmlFor="phoneInput" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phoneInput" // Unique ID
                        name="phoneInput" // Unique name for this state
                        type="tel"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="+237 6XX XXX XXX"
                        required // Make it required for this flow
                      />
                    </div>
                  </div>
                  <div className="flex items-center"> {/* Keep agreement checkbox */}
                    <input
                      id="agreeToTermsPhone" // Unique ID for phone auth form
                      name="agreeToTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="agreeToTermsPhone" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <Button
                    type="button"
                    className="w-full flex justify-center py-2 px-4" // Main action button, so not outline
                    onClick={handleSendOtp}
                    isLoading={isLoading}
                  >
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="••••••"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="w-full flex justify-center py-2 px-4" // Main action button, so not outline
                    onClick={handleVerifyOtp}
                    isLoading={isLoading}
                  >
                    Verify OTP
                  </Button>
                </>
              )}
              {/* reCAPTCHA container - MUST BE PRESENT for Phone Auth */}
              {/* This div must be in the DOM for RecaptchaVerifier to attach to. */}
              {/* It's usually invisible by default but needs to be rendered. */}
              <div id="recaptcha-container" ref={recaptchaContainerRef} className="mt-4"></div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setAuthMethod('email'); // Switch back to email form
                  setConfirmationResult(null); // Reset OTP flow
                  setPhoneInput(''); // Clear phone input
                  setOtp(''); // Clear OTP input
                  setError(null); // Clear errors
                  if (window.recaptchaVerifier) { // Clear reCAPTCHA instance
                    window.recaptchaVerifier.clear();
                  }
                }}
              >
                Back to Email Registration
              </Button>
            </form>
          )}

          {/* Or separator */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {/* Google Sign-up Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-center py-2 px-4 items-center"
                onClick={handleGoogleSignUp}
                isLoading={isLoading}
              >
                <Globe className="w-5 h-5 mr-2" />
                Sign Up with Google
              </Button>

              {/* Phone Sign-up Button (visible only if email method is active) */}
              {authMethod === 'email' && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex justify-center py-2 px-4 items-center"
                  onClick={() => {
                    setAuthMethod('phone');
                    // Clear email/password fields if switching from email method
                    setFormData(prev => ({ ...prev, email: '', password: '', confirmPassword: '', phone: '' }));
                    setError(null); // Clear errors when switching method
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Sign Up with Phone Number
                </Button>
              )}
            </div>
          </div>
          {/* Moved 'Already have an account?' link to the very bottom */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;