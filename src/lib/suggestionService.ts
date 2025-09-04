import { Suggestion } from '@/types';
import suggestionsData from '@/data/suggestions.json';

interface SuggestionDataSource {
  searchSuggestions: (query: string) => Promise<Suggestion[]>;
}

class JSONSuggestionDataSource implements SuggestionDataSource {
  private suggestions: Suggestion[] =
    (suggestionsData.suggestions as Suggestion[]) || [];

  async searchSuggestions(query: string): Promise<Suggestion[]> {
    const searchTerm = query.toLowerCase();

    return this.suggestions.filter(suggestion => {
      return suggestion.toLowerCase().includes(searchTerm);
    });
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
  new JSONSuggestionDataSource()
);
