import React from 'react';
import { motion } from 'framer-motion';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import type { LucideIcon } from 'lucide-react';

interface ModernFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor?: string; // Hex color without #
}

export const ModernFeatureCard: React.FC<ModernFeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  accentColor = '0369A1' 
}) => {
  const hexColor = `#${accentColor.replace('#', '')}`;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="p-3 h-full"
    >
      <Card 
        className="h-full border-1 border-100 shadow-4 surface-card border-round-3xl relative overflow-hidden transition-all duration-300 hover:shadow-8"
        style={{ borderTop: `4px solid ${hexColor}` }}
      >
        <div className="flex flex-column align-items-center text-center p-4">
          <div 
            className="flex align-items-center justify-content-center border-round-2xl mb-4 transition-transform duration-500 hover:rotate-12" 
            style={{ 
                width: '72px', 
                height: '72px', 
                backgroundColor: `${hexColor}15`,
                color: hexColor
            }}
          >
            <Icon size={36} strokeWidth={2.5} />
          </div>

          <h3 className="text-xl font-black text-900 mb-3 tracking-tighter leading-tight">{title}</h3>
          <p className="text-600 text-sm line-height-3 mb-5 px-2">{description}</p>

          <Button 
            label="Learn More" 
            icon="pi pi-chevron-right" 
            iconPos="right" 
            className="p-button-rounded font-bold px-4 transition-all"
            style={{ 
                backgroundColor: hexColor, 
                borderColor: hexColor,
                boxShadow: `0 8px 20px -6px ${hexColor}60`
            }}
          />
        </div>

        {/* Subtle background decoration */}
        <div 
            className="absolute top-0 right-0 w-4rem h-4rem opacity-10 pointer-events-none" 
            style={{ 
                background: `radial-gradient(circle at top right, ${hexColor}, transparent)`,
                borderRadius: '0 0 0 100%' 
            }} 
        />
      </Card>
    </motion.div>
  );
};

