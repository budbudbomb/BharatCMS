import React from 'react';

interface SchemeHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export const SchemeHero: React.FC<SchemeHeroProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div 
      className="relative overflow-hidden border-round-xl mb-6 shadow-4"
      style={{ 
        minHeight: '400px',
        background: backgroundImage ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})` : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 flex flex-column justify-content-center px-4 md:px-8 text-white">
        <h1 className="text-4xl md:text-6xl font-bold m-0 mb-3 line-height-2 tracking-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-medium m-0 opacity-90 max-w-30rem line-height-3">
          {subtitle}
        </p>
        <div className="mt-5 flex gap-3">
          <div className="w-4rem h-4px bg-white border-round"></div>
        </div>
      </div>
    </div>
  );
};
