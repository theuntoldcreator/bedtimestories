
import React, { useState } from 'react';
import Header from '@/components/Header';
import StoryForm from '@/components/StoryForm';
import StoryDisplay from '@/components/StoryDisplay';
import StoryLoading from '@/components/StoryLoading';

interface Story {
  post: string;
  response: string | any;
}

const Index = () => {
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStoryGenerated = (story: Story) => {
    console.log('Story received:', story);
    // Ensure story has the correct structure
    if (story && typeof story === 'object') {
      setGeneratedStory({
        post: story.post || "Here's your magical bedtime story!",
        response: story.response || ""
      });
    }
  };

  return (
    <div className="min-h-screen dreamy-bg">
      <div className="container max-w-4xl px-4 py-8">
        <Header />
        
        <div className="space-y-8">
          <StoryForm 
            onStoryGenerated={handleStoryGenerated} 
            setIsLoading={setIsLoading} 
          />
          
          {isLoading && <StoryLoading />}
          
          {!isLoading && generatedStory && (
            <StoryDisplay story={generatedStory} />
          )}
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Magical Bedtime Stories</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
