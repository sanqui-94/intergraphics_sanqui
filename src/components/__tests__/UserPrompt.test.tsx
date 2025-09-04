import { render, screen } from "@testing-library/react";
import UserPrompt from "@/components/UserPrompt";

import { suggestionService } from "@/lib/suggestionService";

jest.mock("@/lib/suggestionService");

const mockSuggestionService = suggestionService as jest.Mocked<
  typeof suggestionService
>;

describe("UserPrompt", () => {
  const mockSetSuggestions = jest.fn();
  const mockSetIsGenerating = jest.fn();
  const mockSetHasGenerated = jest.fn();

  const defaultProps = {
    setSuggestions: mockSetSuggestions,
    setIsGenerating: mockSetIsGenerating,
    setHasGenerated: mockSetHasGenerated,
    isGenerating: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockSuggestionService.searchSuggestions.mockResolvedValue([]);

    jest.spyOn(global, "setTimeout").mockImplementation(cb => {
      if (typeof cb === "function") cb();
      return 1 as unknown as NodeJS.Timeout;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders an input and generate button", () => {
    render(<UserPrompt {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Type something...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Generate" })
    ).toBeInTheDocument();
  });

  it('shows "Generating..." when isGenerating is true', () => {
    render(<UserPrompt {...defaultProps} isGenerating={true} />);

    expect(
      screen.getByRole("button", { name: "Generating..." })
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
