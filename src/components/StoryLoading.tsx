
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Star } from "lucide-react";

const StoryLoading = () => {
  return (
    <Card className="story-card border-none shadow-lg bg-white animate-pulse">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="flex items-center justify-center space-x-2">
          <Moon className="h-6 w-6 text-story-blue animate-float" />
          <Star className="h-4 w-4 text-story-skyBlue animate-twinkle" />
          <Moon className="h-6 w-6 text-story-blue animate-float" />
        </div>
        <p className="text-lg text-muted-foreground mt-4">Creating your magical story...</p>
      </CardContent>
    </Card>
  );
};

export default StoryLoading;
