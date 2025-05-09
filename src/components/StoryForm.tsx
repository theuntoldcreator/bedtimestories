import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen } from "lucide-react";
import { generateFallbackStory } from "@/utils/storyGenerator";

const storyCategories = [/* same as before */];
const storyElements = [/* same as before */];

const formSchema = z.object({
  category: z.string({ required_error: "Please select a story category." }),
  storyElements: z.array(z.string()).refine((value) => value.length > 0 && value.length <= 3, {
    message: "Please select between 1 and 3 story elements.",
  }),
  kidName: z.string().min(1, { message: "Please enter your child's name." }),
  kidAge: z.coerce.number().int().min(1).max(12, { message: "Age must be between 1 and 12." }),
  customSection: z.string().optional(),
});

type StoryFormValues = z.infer<typeof formSchema>;

interface StoryFormProps {
  onStoryGenerated: (story: { post: string; response: string }) => void;
  setIsLoading: (loading: boolean) => void;
}

const StoryForm = ({ onStoryGenerated, setIsLoading }: StoryFormProps) => {
  const { toast } = useToast();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [useSendFullPrompt, setUseSendFullPrompt] = useState(true);

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { storyElements: [], customSection: "" },
  });

  async function onSubmit(data: StoryFormValues) {
    try {
      setIsLoading(true);
      setSubmitDisabled(true);

      const storyElementsList = data.storyElements.join(", ");
      const prompt = `Write a short bedtime story in the ${data.category} category for a child named ${data.kidName}, who is ${data.kidAge} years old. Include: ${storyElementsList}. ${data.customSection ? `Also: ${data.customSection}.` : ""} Make sure it’s age-appropriate, imaginative, positive, ~10 lines, with a happy ending.`;

      const requestBody = useSendFullPrompt
        ? { chatInput: prompt }
        : {
            category: data.category,
            storyElements: data.storyElements,
            kidName: data.kidName,
            kidAge: data.kidAge,
            customSection: data.customSection || "",
          };

      const response = await fetch("https://bedtimestories.mooo.com/webhook/bedtimestories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to generate story");

      const result = await response.json();

      // ✅ Pass only clean `post` and `response` to parent
      onStoryGenerated({
        post: result.post || "Here's your magical bedtime story!",
        response: result.response || "No story text received.",
      });

      // ✅ Reset form after success
      form.reset();

      toast({ title: "Story generated!", description: "Your magical bedtime story is ready." });
    } catch (error) {
      console.error("Error:", error);

      const fallbackStory = generateFallbackStory(
        data.category,
        data.storyElements,
        data.kidName,
        data.kidAge,
        data.customSection || ""
      );

      onStoryGenerated({
        post: "Here's your magical bedtime story (offline mode)",
        response: fallbackStory,
      });

      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "We couldn't connect to the story wizard. Showing offline story instead.",
      });
    } finally {
      setIsLoading(false);
      setSubmitDisabled(false);
    }
  }

  return (
    <Card className="story-card border-none shadow-lg bg-white">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ✂ Keep your fields unchanged here */}
            {/* ✂ Checkbox for structured data selection */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="data-format"
                checked={!useSendFullPrompt}
                onCheckedChange={(checked) => setUseSendFullPrompt(!checked)}
              />
              <label htmlFor="data-format" className="text-sm text-muted-foreground cursor-pointer">
                Send structured data instead of full prompt
              </label>
            </div>
            {/* ✂ Submit button */}
            <Button type="submit" className="w-full bg-story-blue hover:bg-story-skyBlue" disabled={submitDisabled}>
              <BookOpen className="mr-2 h-4 w-4" />
              Create Magical Story
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StoryForm;
