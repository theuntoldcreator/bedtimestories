
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface StoryDisplayProps {
  story: {
    post: string;
    response: string;
  } | null;
}

const StoryDisplay = ({ story }: StoryDisplayProps) => {
  if (!story) return null;
  
  console.log('Story display receiving:', story);
  
  return (
    <div className="animate-fade-in">
      <Card className="story-card border-none shadow-lg bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-2xl text-story-blue">
            <Star className="h-5 w-5 mr-2 text-story-skyBlue animate-twinkle" />
            {story.post}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="story-text text-lg">
            <p className="whitespace-pre-line">{story.response}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryDisplay;
