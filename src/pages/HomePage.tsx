'use client';

import { useState } from 'react';
import { Suggestion } from '@/types';
import UserPrompt from '@/components/UserPrompt';
import Results from '@/components/Results';

export default function HomePage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-900 p-8 text-center font-sans text-stone-300">
      <h1 className="text-xl leading-relaxed font-extrabold md:text-3xl">
        The Journalist Assistant
      </h1>
      <UserPrompt
        setSuggestions={setSuggestions}
        setIsGenerating={setIsGenerating}
        setHasGenerated={setHasGenerated}
        isGenerating={isGenerating}
      />
      <Results
        suggestions={suggestions}
        isGenerating={isGenerating}
        hasGenerated={hasGenerated}
      />
    </div>
  );
}
