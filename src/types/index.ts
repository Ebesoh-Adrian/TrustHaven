import { Timestamp } from 'firebase/firestore';

// --- UserRole Definition ---
export type UserRole = 'explorer' | 'pioneer' | 'guardian' | 'admin';
// 'explorer': Standard user, can browse and save listings, write reviews.
// 'pioneer': Business user, can create and manage listings.
// 'guardian': Admin or moderator role, with elevated permissions.
// 'admin': Super admin, full control.


export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: Category;
  images: string[];
  isVerified: boolean;
  rating: number; // Aggregate rating from reviews
  reviews: Review[]; // Array of review objects (could also be string[] of review IDs)
  contactInfo: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  createdAt: Timestamp | string; // Changed to allow Firestore Timestamp
  updatedAt: Timestamp | string; // Changed to allow Firestore Timestamp
  userId: string; // The ID of the user who created this listing
  features?: string[]; // Optional additional features/amenities
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  listings: string[]; // Listing IDs (typically references, not full objects)
  savedListings: string[]; // Listing IDs (typically references, not full objects)
  role: UserRole; // Added role property
  createdAt: Timestamp | string; // Changed to allow Firestore Timestamp
  updatedAt?: Timestamp | string; // Added optional updatedAt property for profiles
}

export interface Review {
  id: string;
  userId: string; // ID of the user who wrote the review
  userName: string;
  userAvatar?: string;
  rating: number; // Rating given (e.g., 1-5)
  comment: string;
  createdAt: Timestamp | string; // Changed to allow Firestore Timestamp
}

export type Category =
  | 'homes'
  | 'cars'
  | 'services'
  | 'businesses'
  | 'jobs'
  | 'electronics';

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string; // e.g., a path to an SVG or a LucideReact icon name
  color: string; // e.g., a Tailwind CSS color class or hex code
}

export interface SearchFilters {
  query: string;
  category?: Category;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number; // Minimum rating
  verified?: boolean; // Filter by verified listings
}