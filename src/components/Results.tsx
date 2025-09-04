import { Suggestion } from "@/types";
import CallToAction from "@/components/CallToAction";

interface ResultsProps {
  suggestions: Suggestion[];
  isGenerating: boolean;
  hasGenerated: boolean;
}

export default function Results({
  suggestions,
  hasGenerated,
  isGenerating,
}: ResultsProps) {
  const showSuggestions = suggestions && suggestions.length > 0;
  return (
    <div className="px-6 pb-6">
      {isGenerating && (
        <div className="py-8 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-stone-300"></div>
          <p className="mt-2 text-sm text-stone-300">Searching...</p>
        </div>
      )}
      {!isGenerating && hasGenerated && (
        <div className="space-y-4">
          {showSuggestions ? (
            <>
              <div className="pb-2 text-sm text-stone-200">
                Found {suggestions.length} suggestion
                {suggestions.length !== 1 ? "s" : ""}
              </div>
              <div className="space-y-1">
                <ul className="list-disc pl-6 text-stone-100 marker:text-stone-400">
                  {suggestions.map(suggestion => (
                    <li key={suggestion} className="leading-relaxed">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="mb-1 text-stone-300">
                I didn’t come up with any suggestions this time around.
              </p>
              <p className="text-sm text-stone-200">
                Please try again with different keywords.
              </p>
            </div>
          )}
        </div>
      )}
      {!hasGenerated && !isGenerating && <CallToAction />}
    </div>
  );
}
