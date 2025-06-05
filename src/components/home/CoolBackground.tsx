import React from 'react';

interface CoolBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const CoolBackground: React.FC<CoolBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Radial gradient background */}
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 50% 40%, #f5f5f5 0%, #ededed 60%, #fafafa 100%)'
      }}>
        {/* Concentric rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60 opacity-40" />
          <div className="absolute left-1/2 top-1/2 w-[90vw] h-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40 opacity-30" />
          <div className="absolute left-1/2 top-1/2 w-[60vw] h-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30 opacity-20" />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CoolBackground; 