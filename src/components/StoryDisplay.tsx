
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface StoryDisplayProps {
  story: {
    post: string;
    response: string | any;
  } | null;
}

const StoryDisplay = ({ story }: StoryDisplayProps) => {
  if (!story) return null;
  
  // Add a safe check for story.response and handle different response formats
  let displayText = "";
  
  if (story.response) {
    // Handle case where response might be a string or an object
    if (typeof story.response === 'string') {
      displayText = story.response;
    } else if (typeof story.response === 'object') {
      // Try to convert object to string if possible
      try {
        displayText = JSON.stringify(story.response);
      } catch (e) {
        displayText = "Unable to display story content";
        console.error("Error parsing story response:", e);
      }
    }
  } else {
    displayText = "Story content not available";
  }

  // Split the text into paragraphs for better display
  const paragraphs = displayText.split('\n').filter(p => p.trim() !== '');

  console.log('Story display receiving:', { story, displayText, paragraphs });

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
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))
            ) : (
              <p>{displayText}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryDisplay;
