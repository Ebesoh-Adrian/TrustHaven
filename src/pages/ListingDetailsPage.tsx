import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  Share2, 
  Heart, 
  CheckCircle, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Listing } from '../types';

// Sample listing data (in a real app, this would be fetched from an API)
const sampleListings: Record<string, Listing> = {
  '1': {
    id: '1',
    title: 'Modern 3 Bedroom Apartment in Molyko',
    description: 'Spacious and modern apartment with all amenities, close to the university and shopping centers. Fully furnished with 24/7 security and water supply. This property features 3 bedrooms, 2 bathrooms, a spacious living room, and a modern kitchen. It is located in a secure compound with 24-hour security and backup water supply.\n\nThe apartment is within walking distance to the University of Buea and major shopping centers. It comes fully furnished with quality furniture and appliances including a refrigerator, washing machine, and air conditioners in all rooms.\n\nUtilities are not included in the rent, but the landlord provides a backup generator for power outages. Internet connection is available and can be arranged separately.',
    price: 150000,
    location: 'Molyko, Buea, South West Region',
    category: 'homes',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    isVerified: true,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Emmanuel Tabi',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 5,
        comment: 'Excellent apartment, exactly as described. The location is perfect and the landlord is very responsive.',
        createdAt: '2023-08-10'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Marie Noel',
        userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4,
        comment: 'Great place, but had some issues with the water supply occasionally. Otherwise, very comfortable and well-maintained.',
        createdAt: '2023-07-25'
      }
    ],
    contactInfo: {
      phone: '+237 670 123 456',
      email: 'owner@example.com',
      whatsapp: '+237 670 123 456'
    },
    createdAt: '2023-06-15',
    updatedAt: '2023-06-30',
    userId: 'user1',
    features: ['3 Bedrooms', '2 Bathrooms', 'Furnished', '24/7 Security', 'Water Supply', 'Close to University']
  }
};

const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // In a real app, you would fetch the listing data based on the ID
  const listing = sampleListings[id || '1'];

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h2>
        <p className="text-gray-600 mb-8">The listing you're looking for doesn't exist or has been removed.</p>
        <Link to="/listings">
          <Button>Browse Other Listings</Button>
        </Link>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleFavorite = () => {
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
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="pt-16 bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center">
              <li className="flex items-center">
                <Link to="/" className="text-primary hover:underline">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center">
                <Link to={`/category/${listing.category}`} className="text-primary hover:underline capitalize">
                  {listing.category}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-gray-600 truncate max-w-[200px]">
                {listing.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-[300px] md:h-[500px] bg-gray-100">
                <img 
                  src={listing.images[currentImageIndex]} 
                  alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button 
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button 
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm py-1 px-2 rounded">
                  {currentImageIndex + 1} / {listing.images.length}
                </div>
              </div>
              
              {/* Thumbnail Preview */}
              <div className="flex p-2 overflow-x-auto">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 mr-2 rounded overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Listing Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900 mr-2">{listing.title}</h1>
                    {listing.isVerified && (
                      <div className="flex items-center text-primary bg-primary/10 px-2 py-1 rounded text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(listing.price)}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(listing.rating) 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-700">{listing.rating.toFixed(1)}</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-700">{listing.reviews.length} reviews</span>
                <span className="mx-2 text-gray-500">•</span>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Listed on {formatDate(listing.createdAt)}</span>
                </div>
              </div>
              
              {/* Features */}
              {listing.features && listing.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
              
              {/* Reviews */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Reviews</h3>
                {listing.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {listing.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4">
                        <div className="flex items-start">
                          <img 
                            src={review.userAvatar} 
                            alt={review.userName}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-800">{review.userName}</h4>
                              <span className="text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            <div className="flex my-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 mb-6">
                {listing.contactInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <a 
                      href={`tel:${listing.contactInfo.phone}`}
                      className="text-gray-700 hover:text-primary"
                    >
                      {listing.contactInfo.phone}
                    </a>
                  </div>
                )}
                {listing.contactInfo.whatsapp && (
                  <div className="flex items-center">
                    <svg 
                      className="w-5 h-5 text-primary mr-3" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <a 
                      href={`https://wa.me/${listing.contactInfo.whatsapp.replace(/\+|\s/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary"
                    >
                      WhatsApp
                    </a>
                  </div>
                )}
                {listing.contactInfo.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <a 
                      href={`mailto:${listing.contactInfo.email}`}
                      className="text-gray-700 hover:text-primary"
                    >
                      {listing.contactInfo.email}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Button className="w-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center" onClick={toggleFavorite}>
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
                  {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Listing
                </Button>
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="bg-primary/10 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <Info className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-gray-800">Safety Tips</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Meet in a public place for the first viewing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verify the identity of the seller before making any payments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Do not send money via wire transfer to people you haven't met</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Report suspicious listings to our team</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link to="/safety-guide" className="text-primary flex items-center hover:underline">
                  <span>Read our full safety guide</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;