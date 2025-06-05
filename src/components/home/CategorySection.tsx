import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Car, Briefcase, Store, Wrench, Smartphone } from 'lucide-react';
import { CategoryInfo } from '../../types';

const categories: CategoryInfo[] = [
  { 
    id: 'homes', 
    label: 'Homes', 
    icon: 'home', 
    color: '#37bce5' 
  },
  { 
    id: 'cars', 
    label: 'Cars', 
    icon: 'car', 
    color: '#e25141' 
  },
  { 
    id: 'services', 
    label: 'Services', 
    icon: 'wrench', 
    color: '#e8b974' 
  },
  { 
    id: 'businesses', 
    label: 'Businesses', 
    icon: 'store', 
    color: '#4caf50' 
  },
  { 
    id: 'jobs', 
    label: 'Jobs', 
    icon: 'briefcase', 
    color: '#9c27b0' 
  },
  { 
    id: 'electronics', 
    label: 'Electronics', 
    icon: 'smartphone', 
    color: '#ff9800' 
  }
];

const CategoryCard: React.FC<{ category: CategoryInfo }> = ({ category }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home': return <Home className="w-8 h-8" />;
      case 'car': return <Car className="w-8 h-8" />;
      case 'wrench': return <Wrench className="w-8 h-8" />;
      case 'store': return <Store className="w-8 h-8" />;
      case 'briefcase': return <Briefcase className="w-8 h-8" />;
      case 'smartphone': return <Smartphone className="w-8 h-8" />;
      default: return <Store className="w-8 h-8" />;
    }
  };

  return (
    <Link 
      to={`/category/${category.id}`}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${category.color}20` }}
      >
        <div style={{ color: category.color }}>
          {getIcon(category.icon)}
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-800">{category.label}</h3>
      <p className="text-sm text-gray-500 mt-1">Explore listings</p>
    </Link>
  );
};

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover thousands of verified listings across multiple categories throughout Cameroon
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;