import { render, screen } from "@testing-library/react";
import Results from "../Results";

describe("Results Component", () => {
  const defaultProps = {
    suggestions: [],
    isGenerating: false,
    hasGenerated: false,
  };

  describe("Default state (no interaction)", () => {
    it("renders CallToAction when no interaction has occurred", () => {
      render(<Results {...defaultProps} />);

      const container = screen.getByTestId("call-to-action");
      expect(container).toBeInTheDocument();
    });
  });

  describe("Generating state", () => {
    it("shows loading spinner when generating", () => {
      const { container } = render(
        <Results {...defaultProps} isGenerating={true} />
      );

      expect(screen.getByText("Searching...")).toBeInTheDocument();
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("No suggestions state", () => {
    it("shows no results message when generation completed with empty results", () => {
      render(
        <Results {...defaultProps} hasGenerated={true} suggestions={[]} />
      );

      expect(
        screen.getByText(/come up with any suggestions/)
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please try again with different keywords.")
      ).toBeInTheDocument();
    });
  });

  describe("Has suggestions state", () => {
    const mockSuggestions = [
      "First creative writing suggestion",
      "Second creative writing suggestion",
      "Third creative writing suggestion",
    ];

    it("shows suggestions list when generation completed with results", () => {
      render(
        <Results
          {...defaultProps}
          hasGenerated={true}
          suggestions={mockSuggestions}
        />
      );

      expect(screen.getByText("Found 3 suggestions")).toBeInTheDocument();
      expect(
        screen.getByText("First creative writing suggestion")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Second creative writing suggestion")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Third creative writing suggestion")
      ).toBeInTheDocument();
    });
  });

  describe("Component structure", () => {
    it("always renders with px-6 pb-6 classes", () => {
      const { container } = render(<Results {...defaultProps} />);

      expect(container.firstChild).toHaveClass("px-6", "pb-6");
    });
  });
});
