"use client";

import { useCalculator } from "../hooks/useCalculator";
import { useKeyboard } from "../hooks/useKeyboard";
import { formatNumber, parseNumber } from "../lib/calculations";

export default function Calculator() {
  const calculatorActions = useCalculator();
  const { keyboardShortcuts } = useKeyboard(calculatorActions);

  const {
    display,
    expression,
    history,
    inputDigit,
    inputDecimal,
    clearAll,
    clear,
    backspace,
    performOperation,
    performCalculation,
    calculatePercentage,
    calculateSquare,
    calculateSquareRoot,
    calculateCube,
    calculateCubeRoot,
    calculateExponential,
    calculateNaturalLog,
    calculateLog10,
    calculateReciprocal,
    insertPi,
    insertE,
    calculatePower10,
    calculateSin,
    calculateCos,
    calculateTan,
    toggleSign,
  } = calculatorActions;

  const renderButton = (content, onClick, className = "") => {
    return (
      <button
        className={`glass-button calculator-button ${className}`}
        onClick={onClick}
        aria-label={content}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="calculator-container glass p-6">
      {/* Display */}
      <div className="glass-display calculator-display">
        <div className="calculator-expression">{expression || "0"}</div>
        <div className="calculator-result">{display}</div>
      </div>

      {/* Keypad */}
      <div className="calculator-keypad">
        {/* Row 1 */}
        {renderButton("AC", clearAll, "clear")}
        {renderButton("C", clear, "clear")}
        {renderButton("⌫", backspace)}
        {renderButton("÷", () => performOperation("÷"), "operator")}

        {/* Row 2 */}
        {renderButton("7", () => inputDigit("7"))}
        {renderButton("8", () => inputDigit("8"))}
        {renderButton("9", () => inputDigit("9"))}
        {renderButton("×", () => performOperation("×"), "operator")}

        {/* Row 3 */}
        {renderButton("4", () => inputDigit("4"))}
        {renderButton("5", () => inputDigit("5"))}
        {renderButton("6", () => inputDigit("6"))}
        {renderButton("-", () => performOperation("-"), "operator")}

        {/* Row 4 */}
        {renderButton("1", () => inputDigit("1"))}
        {renderButton("2", () => inputDigit("2"))}
        {renderButton("3", () => inputDigit("3"))}
        {renderButton("+", () => performOperation("+"), "operator")}

        {/* Row 5 */}
        {renderButton("0", () => inputDigit("0"))}
        {renderButton(".", inputDecimal)}
        {renderButton("±", toggleSign)}
        {renderButton("=", performCalculation, "equals")}
      </div>

      {/* Advanced operations */}
      <div className="calculator-advanced-row">
        {renderButton("x²", calculateSquare)}
        {renderButton("√", calculateSquareRoot)}
        {renderButton("x³", calculateCube)}
        {renderButton("∛", calculateCubeRoot)}
        {renderButton("%", calculatePercentage)}
      </div>

      <div className="calculator-advanced-row">
        {renderButton("eˣ", calculateExponential)}
        {renderButton("ln", calculateNaturalLog)}
        {renderButton("log", calculateLog10)}
        {renderButton("1/x", calculateReciprocal)}
        {renderButton("π", insertPi)}
      </div>

      <div className="calculator-advanced-row">
        {renderButton("e", insertE)}
        {renderButton("10ˣ", calculatePower10)}
        {renderButton("sin", calculateSin)}
        {renderButton("cos", calculateCos)}
        {renderButton("tan", calculateTan)}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6 glass p-4">
          <h3 className="text-lg font-semibold mb-3 text-center">History</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {history.map((item, index) => (
              <div key={index} className="text-sm text-gray-300 font-mono">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard shortcuts info */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        <details className="cursor-pointer">
          <summary className="hover:text-gray-300">Keyboard Shortcuts</summary>
          <div className="mt-2 text-left space-y-1">
            {Object.entries(keyboardShortcuts).map(([key, description]) => (
              <div key={key} className="flex justify-between">
                <span className="font-mono">{key}</span>
                <span className="ml-4">{description}</span>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
