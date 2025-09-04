import { Suggestion } from "@/types";
import suggestionsData from "@/data/suggestions.json";

interface SuggestionDataSource {
  searchSuggestions: (query: string) => Promise<Suggestion[]>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class JSONSuggestionDataSource implements SuggestionDataSource {
  private suggestions: Suggestion[] =
    (suggestionsData.suggestions as Suggestion[]) || [];

  async searchSuggestions(query: string): Promise<Suggestion[]> {
    const searchTerm = query.toLowerCase();

    return this.suggestions.filter((suggestion: string) => {
      return suggestion.toLowerCase().includes(searchTerm);
    });
  }
}

class OpenAISuggestionDataSource implements SuggestionDataSource {
  async searchSuggestions(query: string): Promise<Suggestion[]> {
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        return [];
      }

      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error("API call error:", error);
      return [];
    }
  }
}

class SuggestionService {
  private dataSource: SuggestionDataSource;

  constructor(dataSource: SuggestionDataSource) {
    this.dataSource = dataSource;
  }

  async searchSuggestions(query: string): Promise<Suggestion[]> {
    return this.dataSource.searchSuggestions(query);
  }
}

export const suggestionService = new SuggestionService(
  new OpenAISuggestionDataSource()
);
