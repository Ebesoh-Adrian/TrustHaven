import React from 'react';
import { Home } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
      <Home className="w-5 h-5 text-white" />
    </div>
  );
};

export default Logo;