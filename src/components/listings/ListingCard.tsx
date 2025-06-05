import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Calendar, Heart } from 'lucide-react';
import { Listing } from '../../types';

interface ListingCardProps {
  listing: Listing;
  featured?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, featured = false }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CM', {
      style: 'currency',
      currency: 'XAF',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Link 
      to={`/listing/${listing.id}`}
      className={`block bg-white rounded-lg overflow-hidden transition-shadow ${
        featured 
          ? 'shadow-[0_4px_24px_0_rgba(226,81,65,0.18)] hover:shadow-[0_8px_32px_0_rgba(226,81,65,0.28)]'
          : 'shadow-md hover:shadow-lg'
      }`}
    >
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
        
        {/* Verified badge */}
        {listing.isVerified && (
          <div className="absolute top-3 right-3 bg-white/90 text-primary text-xs font-semibold px-2 py-1 rounded flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}
        
        {/* Favorite button */}
        <button
          className="absolute bottom-3 right-3 bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition-colors"
          onClick={toggleFavorite}
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-primary text-primary' : 'text-gray-700'}`} 
          />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500 capitalize">{listing.category}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{listing.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
          {listing.title}
        </h3>
        
        <div className="flex items-start mb-3">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-1 flex-shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-1">{listing.location}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {listing.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            <span>Listed on {formatDate(listing.createdAt)}</span>
          </div>
          <span className="text-lg font-bold text-primary">
            {formatPrice(listing.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;