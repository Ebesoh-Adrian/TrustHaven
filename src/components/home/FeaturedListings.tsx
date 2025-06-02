import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ListingCard from '../listings/ListingCard';
import { Button } from '../ui/Button';
import { Listing } from '../../types';

// Sample featured listings data
const featuredListings: Listing[] = [
  {
    id: '1',
    title: 'Modern 3 Bedroom Apartment in Molyko',
    description: 'Spacious and modern apartment with all amenities, close to the university and shopping centers. Fully furnished with 24/7 security and water supply.',
    price: 150000,
    location: 'Molyko, Buea',
    category: 'homes',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    isVerified: true,
    rating: 4.8,
    reviews: [],
    contactInfo: {
      phone: '+237 670 123 456',
      email: 'owner@example.com',
      whatsapp: '+237 670 123 456'
    },
    createdAt: '2023-09-15',
    updatedAt: '2023-09-15',
    userId: 'user1',
    features: ['3 Bedrooms', 'Furnished', '24/7 Security', 'Water Supply']
  },
  {
    id: '2',
    title: 'Toyota Corolla 2018 - Excellent Condition',
    description: 'Well maintained Toyota Corolla with low mileage. First owner, all documents up to date. Available for test drive in Buea.',
    price: 6500000,
    location: 'Small Soppo, Buea',
    category: 'cars',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/193021/pexels-photo-193021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    isVerified: true,
    rating: 4.5,
    reviews: [],
    contactInfo: {
      phone: '+237 650 789 123',
      whatsapp: '+237 650 789 123'
    },
    createdAt: '2023-09-10',
    updatedAt: '2023-09-10',
    userId: 'user2'
  },
  {
    id: '3',
    title: 'Professional Web Design & Development Services',
    description: 'Get your business online with our professional web design services. We create responsive, SEO-friendly websites for businesses in Cameroon.',
    price: 150000,
    location: 'Buea, South West',
    category: 'services',
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    isVerified: true,
    rating: 5.0,
    reviews: [],
    contactInfo: {
      phone: '+237 675 432 109',
      email: 'info@techdev.cm',
      whatsapp: '+237 675 432 109'
    },
    createdAt: '2023-09-05',
    updatedAt: '2023-09-05',
    userId: 'user3'
  },
  {
    id: '4',
    title: 'Restaurant Space for Rent - Prime Location',
    description: 'Commercial space available for restaurant in a busy area of Molyko. The space includes a kitchen, dining area, and outdoor seating.',
    price: 300000,
    location: 'Molyko, Buea',
    category: 'businesses',
    images: [
      'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    isVerified: false,
    rating: 4.2,
    reviews: [],
    contactInfo: {
      phone: '+237 680 345 678',
      email: 'properties@example.com'
    },
    createdAt: '2023-09-01',
    updatedAt: '2023-09-01',
    userId: 'user4'
  }
];

const FeaturedListings: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Listings</h2>
            <p className="text-gray-600">
              Explore our handpicked listings verified for quality and authenticity
            </p>
          </div>
          <Link to="/listings" className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center">
              View all listings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              featured={true} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;