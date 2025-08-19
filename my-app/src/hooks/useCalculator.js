import { useState, useCallback, useRef, useEffect } from "react";
import {
  performBasicOperation,
  calculatePercentage,
  calculateSquare,
  calculateSquareRoot,
  calculateCube,
  calculateCubeRoot,
  calculatePower,
  calculateExponential,
  calculateNaturalLog,
  calculateLog10,
  calculateReciprocal,
  toggleSign,
  formatNumber,
  parseNumber,
} from "../lib/calculations";

/**
 * Custom hook for calculator logic
 * Handles all mathematical operations and state management
 */
export const useCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  // Use refs to access current state without causing re-renders
  const displayRef = useRef(display);
  const operationRef = useRef(operation);
  const waitingForOperandRef = useRef(waitingForOperand);

  // Update refs when state changes
  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    operationRef.current = operation;
  }, [operation]);

  useEffect(() => {
    waitingForOperandRef.current = waitingForOperand;
  }, [waitingForOperand]);

  // Input digit
  const inputDigit = useCallback((digit) => {
    setDisplay((currentDisplay) => {
      if (waitingForOperandRef.current) {
        setWaitingForOperand(false);
        return digit;
      } else {
        return currentDisplay === "0" ? digit : currentDisplay + digit;
      }
    });
  }, []);

  // Input decimal
  const inputDecimal = useCallback(() => {
    setDisplay((currentDisplay) => {
      if (waitingForOperandRef.current) {
        setWaitingForOperand(false);
        return "0.";
      } else if (currentDisplay.indexOf(".") === -1) {
        return currentDisplay + ".";
      }
      return currentDisplay;
    });
  }, []);

  // Clear all
  const clearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  // Clear current
  const clear = useCallback(() => {
    setDisplay("0");
    setWaitingForOperand(false);
  }, []);

  // Backspace
  const backspace = useCallback(() => {
    setDisplay((currentDisplay) => {
      if (currentDisplay.length === 1) {
        return "0";
      } else {
        return currentDisplay.slice(0, -1);
      }
    });
  }, []);

  // Perform operation
  const performOperation = useCallback((nextOperation) => {
    try {
      const inputValue = parseNumber(displayRef.current);

      setPreviousValue((currentPreviousValue) => {
        if (currentPreviousValue === null) {
          setExpression(`${displayRef.current} ${nextOperation}`);
          return inputValue;
        } else if (operationRef.current) {
          const currentValue = currentPreviousValue || 0;
          const newValue = performBasicOperation(
            currentValue,
            inputValue,
            operationRef.current
          );
          setDisplay(formatNumber(newValue));
          setExpression(`${formatNumber(newValue)} ${nextOperation}`);
          return newValue;
        }
        return currentPreviousValue;
      });

      setWaitingForOperand(true);
      setOperation(nextOperation);
    } catch (error) {
      console.error("Calculator operation error:", error);
      alert(error.message);
    }
  }, []);

  // Perform calculation
  const performCalculation = useCallback(() => {
    if (!previousValue || !operation) return;

    try {
      const inputValue = parseNumber(display);
      const result = performBasicOperation(
        previousValue,
        inputValue,
        operation
      );
      const calculation = `${formatNumber(
        previousValue
      )} ${operation} ${inputValue} = ${formatNumber(result)}`;

      setHistory((prev) => [calculation, ...prev.slice(0, 9)]); // Keep last 10 calculations
      setDisplay(formatNumber(result));
      setExpression(calculation);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    } catch (error) {
      console.error("Calculator calculation error:", error);
      alert(error.message);
    }
  }, [previousValue, operation, display]);

  // Advanced mathematical functions
  const calculatePercentage = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculatePercentage(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`${currentValue}% = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateSquare = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateSquare(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`${currentValue}² = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateSquareRoot = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateSquareRoot(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`√${currentValue} = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateCube = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateCube(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`${currentValue}³ = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateCubeRoot = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateCubeRoot(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`∛${currentValue} = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateExponentialAction = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateExponential(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`e^${currentValue} = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateNaturalLogAction = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateNaturalLog(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`ln(${currentValue}) = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateLog10Action = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateLog10(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`log₁₀(${currentValue}) = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateReciprocalAction = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = calculateReciprocal(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`1/${currentValue} = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const insertPi = useCallback(() => {
    setDisplay(formatNumber(Math.PI));
    setExpression(`π = ${formatNumber(Math.PI)}`);
    setWaitingForOperand(true);
  }, []);

  const insertE = useCallback(() => {
    setDisplay(formatNumber(Math.E));
    setExpression(`e = ${formatNumber(Math.E)}`);
    setWaitingForOperand(true);
  }, []);

  const calculatePower10 = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = Math.pow(10, currentValue);
      setDisplay(formatNumber(result));
      setExpression(`10^${currentValue} = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateSin = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = Math.sin(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`sin(${currentValue}) = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateCos = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = Math.cos(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`cos(${currentValue}) = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const calculateTan = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = Math.tan(currentValue);
      setDisplay(formatNumber(result));
      setExpression(`tan(${currentValue}) = ${formatNumber(result)}`);
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  const toggleSignAction = useCallback(() => {
    try {
      const currentValue = parseNumber(display);
      const result = toggleSign(currentValue);
      setDisplay(formatNumber(result));
    } catch (error) {
      alert(error.message);
    }
  }, [display]);

  return {
    // State
    display,
    expression,
    history,

    // Actions
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
    calculateExponential: calculateExponentialAction,
    calculateNaturalLog: calculateNaturalLogAction,
    calculateLog10: calculateLog10Action,
    calculateReciprocal: calculateReciprocalAction,
    insertPi,
    insertE,
    calculatePower10,
    calculateSin,
    calculateCos,
    calculateTan,
    toggleSign: toggleSignAction,
  };
};
