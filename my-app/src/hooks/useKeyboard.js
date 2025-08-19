import { useEffect, useRef } from "react";

/**
 * Custom hook for keyboard input handling
 * Provides full keyboard support for calculator operations
 */
export const useKeyboard = (calculatorActions) => {
  const actionsRef = useRef(calculatorActions);

  // Update ref when actions change
  useEffect(() => {
    actionsRef.current = calculatorActions;
  }, [calculatorActions]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const actions = actionsRef.current;
      if (!actions) return;

      const key = event.key;

      // Prevent default behavior for calculator keys
      if (["Enter", "=", "Escape", "Backspace", "%"].includes(key)) {
        event.preventDefault();
      }

      // Number keys (0-9)
      if (key >= "0" && key <= "9") {
        actions.inputDigit(key);
      }
      // Decimal point
      else if (key === ".") {
        actions.inputDecimal();
      }
      // Basic operations
      else if (key === "+") {
        actions.performOperation("+");
      } else if (key === "-") {
        actions.performOperation("-");
      } else if (key === "*") {
        actions.performOperation("×");
      } else if (key === "/") {
        actions.performOperation("÷");
      }
      // Enter or equals
      else if (key === "Enter" || key === "=") {
        actions.performCalculation();
      }
      // Escape (clear all)
      else if (key === "Escape") {
        actions.clearAll();
      }
      // Backspace
      else if (key === "Backspace") {
        actions.backspace();
      }
      // Percentage
      else if (key === "%") {
        actions.calculatePercentage();
      }
      // Advanced operations (with modifiers)
      else if (event.ctrlKey || event.metaKey) {
        switch (key) {
          case "s":
            event.preventDefault();
            actions.calculateSquare();
            break;
          case "r":
            event.preventDefault();
            actions.calculateSquareRoot();
            break;
          case "c":
            event.preventDefault();
            actions.calculateCube();
            break;
          case "t":
            event.preventDefault();
            actions.calculateCubeRoot();
            break;
          case "n":
            event.preventDefault();
            actions.toggleSign();
            break;
        }
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array to prevent infinite re-renders

  // Return keyboard shortcuts info for UI display
  const keyboardShortcuts = {
    "Numbers (0-9)": "Input digits",
    "Decimal (.)": "Add decimal point",
    "Operators (+, -, *, /)": "Basic operations",
    "Enter or =": "Calculate result",
    Escape: "Clear all",
    Backspace: "Delete last digit",
    "%": "Calculate percentage",
    "Ctrl/Cmd + S": "Square",
    "Ctrl/Cmd + R": "Square root",
    "Ctrl/Cmd + C": "Cube",
    "Ctrl/Cmd + T": "Cube root",
    "Ctrl/Cmd + N": "Toggle sign",
  };

  return { keyboardShortcuts };
};
