
/**
 * Generates a fallback story when the remote API is unavailable
 */
export const generateFallbackStory = (
  category: string,
  storyElements: string[],
  kidName: string,
  kidAge: number,
  customDetail: string
): string => {
  // Templates for different categories
  const templates: Record<string, string[]> = {
    adventure: [
      `Once upon a time, ${kidName} went on an amazing adventure. `,
      `${kidName} discovered a secret map that led to a hidden treasure. `,
      `Brave ${kidName} decided to explore the mysterious forest behind their house. `
    ],
    horror: [
      `${kidName} told spooky stories with friends during a sleepover. `,
      `It was a dark and stormy night, but ${kidName} felt safe and cozy inside their blanket fort. `,
      `${kidName} and their friends dressed up as friendly monsters for a costume party. `
    ],
    love: [
      `${kidName} made a special card for someone they cared about. `,
      `${kidName} shared their favorite toys with their best friend. `,
      `Everyone smiled when ${kidName} gave big hugs to their family. `
    ],
    skyfii: [
      `${kidName} built a spaceship from cardboard boxes and flew to the stars. `,
      `In a galaxy far away, Space Captain ${kidName} went on a mission to save the universe. `,
      `${kidName} discovered a tiny alien who needed help finding their way home. `
    ],
    fairytails: [
      `In a magical kingdom, ${kidName} was known as the kindest person in all the land. `,
      `${kidName} found a talking frog who was actually an enchanted prince. `,
      `A fairy godmother granted ${kidName} three wishes to use wisely. `
    ]
  };

  // Element snippets
  const elementSnippets: Record<string, string> = {
    dinosaur: `A friendly dinosaur named Rex helped ${kidName} along the way. `,
    people: `Many friendly people from the village joined ${kidName} on this journey. `,
    rainbow: `A beautiful rainbow appeared, showing ${kidName} the path forward. `,
    spaceship: `${kidName} traveled in a shiny spaceship that could fly anywhere in seconds. `,
    disneyland: `They visited a magical park with castles and exciting rides. `,
    zombie: `They met a silly zombie who only wanted to play tag instead of being scary. `
  };

  // Age-appropriate endings
  const endings = [
    `When it was time to go home, ${kidName} felt happy and sleepy after such a wonderful day. `,
    `As the sun set, ${kidName} knew it was time for bed, dreaming of more adventures tomorrow. `,
    `${kidName}'s parents tucked them into bed, and they fell asleep with a big smile. `,
    `The end! And ${kidName} lived happily ever after. `
  ];

  // Custom detail integration
  const customDetailText = customDetail ? 
    `${kidName} especially loved it because ${customDetail}. ` : 
    '';

  // Build the story
  let story = '';
  
  // Start with a template based on category
  const categoryTemplates = templates[category] || templates.adventure;
  const startTemplate = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
  story += startTemplate;
  
  // Add element snippets
  storyElements.forEach(element => {
    if (elementSnippets[element]) {
      story += elementSnippets[element];
    }
  });
  
  // Add custom detail if provided
  if (customDetailText) {
    story += customDetailText;
  }
  
  // Add an ending
  story += endings[Math.floor(Math.random() * endings.length)];
  
  return story;
};
