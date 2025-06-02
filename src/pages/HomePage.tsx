import React from 'react';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import FeaturedListings from '../components/home/FeaturedListings';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedListings />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default HomePage;