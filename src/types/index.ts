export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: Category;
  images: string[];
  isVerified: boolean;
  rating: number;
  reviews: Review[];
  contactInfo: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  createdAt: string;
  updatedAt: string;
  userId: string;
  features?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  listings: string[]; // Listing IDs
  savedListings: string[]; // Listing IDs
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
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
  icon: string;
  color: string;
}

export interface SearchFilters {
  query: string;
  category?: Category;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  verified?: boolean;
}