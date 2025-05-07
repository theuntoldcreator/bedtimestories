
import React from 'react';
import { Moon, Star } from "lucide-react";

const Header = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center justify-center py-6">
        <Moon className="h-8 w-8 text-story-blue animate-float" />
        <h1 className="text-4xl md:text-5xl font-bold text-center mx-4 bg-gradient-to-r from-story-blue to-story-skyBlue bg-clip-text text-transparent">
          Magical Bedtime Stories
        </h1>
        <Star className="h-6 w-6 text-story-skyBlue animate-twinkle" />
      </div>
      <div className="text-center text-muted-foreground mb-8">
        Create a personalized bedtime story for your little one
      </div>
    </div>
  );
};

export default Header;
