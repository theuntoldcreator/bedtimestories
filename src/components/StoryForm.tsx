
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

const storyCategories = [
  { id: "adventure", label: "Adventure" },
  { id: "horror", label: "Horror" },
  { id: "love", label: "Love" },
  { id: "skyfii", label: "Skyfii" },
  { id: "fairytails", label: "Fairytails" },
];

const storyElements = [
  { id: "dinosaur", label: "Dinosaur" },
  { id: "people", label: "People" },
  { id: "rainbow", label: "Rainbow" },
  { id: "spaceship", label: "Spaceship" },
  { id: "disneyland", label: "Disneyland" },
  { id: "zombie", label: "Zombie" },
];

const formSchema = z.object({
  category: z.string({
    required_error: "Please select a story category.",
  }),
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
  
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyElements: [],
      customSection: "",
    },
  });

  async function onSubmit(data: StoryFormValues) {
    try {
      setIsLoading(true);
      setSubmitDisabled(true);
      
      // Prepare the data for the n8n webhook
      const storyElementsList = data.storyElements.join(", ");
      
      const response = await fetch("https://bedtimestories.mooo.com/webhook/bedtimestories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: data.category,
          story_elements_list: storyElementsList,
          kid_name: data.kidName,
          kid_age: data.kidAge,
          custom_section: data.customSection || "",
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate story");
      }
      
      const result = await response.json();
      onStoryGenerated(result);
      
      toast({
        title: "Story generated!",
        description: "Your magical bedtime story is ready.",
      });
    } catch (error) {
      console.error("Error generating story:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again or check your connection.",
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
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-medium">Story Category</FormLabel>
                  <FormDescription>
                    Choose what type of story you'd like
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-2"
                    >
                      {storyCategories.map((category) => (
                        <FormItem key={category.id} className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value={category.id}
                              id={category.id}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <label
                            htmlFor={category.id}
                            className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium border border-story-lightBlue bg-white peer-data-[state=checked]:bg-story-lightBlue peer-data-[state=checked]:text-story-blue cursor-pointer transition-colors"
                          >
                            {category.label}
                          </label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="storyElements"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-lg font-medium">Story Elements (Pick 1-3)</FormLabel>
                    <FormDescription>
                      Choose up to three elements to include in your story
                    </FormDescription>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {storyElements.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="storyElements"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="kidName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Child's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your child's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="kidAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Child's Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="12" 
                        placeholder="Age (1-12)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="customSection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Custom Details (Optional)</FormLabel>
                  <FormDescription>
                    Add any additional details you'd like included in the story
                  </FormDescription>
                  <FormControl>
                    <Textarea 
                      placeholder="E.g., favorite toy, recent event, or special place..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-story-blue hover:bg-story-skyBlue transition-colors"
              disabled={submitDisabled}
            >
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
