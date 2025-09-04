"use client";
import { Suggestion } from "@/types";
import { suggestionService } from "@/lib/suggestionService";
import { useState } from "react";

interface UserPromptProps {
  setSuggestions: (suggestions: Suggestion[]) => void;
  setIsGenerating: (value: boolean) => void;
  setHasGenerated: (value: boolean) => void;
  isGenerating: boolean;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function UserPrompt({
  setSuggestions,
  setIsGenerating,
  setHasGenerated,
  isGenerating,
}: UserPromptProps) {
  const [inputValue, setInputValue] = useState<string>("");

  async function generateSuggestions(query: string) {
    if (!query.trim()) {
      setHasGenerated(false);
      setSuggestions([]);
      return;
    }

    setIsGenerating(true);

    try {
      await sleep(2000);
      const results = await suggestionService.searchSuggestions(query);
      setSuggestions(results);
      setHasGenerated(true);
    } catch (error) {
      console.error("Error while generating suggestions: ", error);
      setSuggestions([]);
      setHasGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleClick() {
    await generateSuggestions(inputValue);
  }

  return (
    <div className="flex w-sm gap-2 rounded-md p-2 text-center md:w-xl">
      <input
        name="userPrompt"
        className="flex-1 rounded-md border border-stone-200 px-3 py-2 text-stone-300 focus:border-stone-500 focus:ring-2 focus:ring-stone-400"
        placeholder="Type something..."
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button
        disabled={isGenerating}
        className={`text-md rounded-full px-6 py-2 whitespace-nowrap transition-colors ${
          isGenerating
            ? "cursor-not-allowed bg-stone-400 text-stone-200"
            : "bg-stone-800 text-white hover:bg-stone-700"
        }`}
        onClick={handleClick}
      >
        {isGenerating ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
