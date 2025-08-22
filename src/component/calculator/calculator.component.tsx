import { memo, useCallback, useState } from "react";
import "./calculator.component.css";
import { useHotkeys } from "react-hotkeys-hook";
import { hotkeys } from "../../hotkeys/hotkeys";

export const evaluateExpression = (expression: string) => {
  if (!expression) return 0;

  const validation = expression.replace(/[^-()\d/*+.]/g, "");

  try {
    const result = eval(validation);

    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid result");
    }

    return parseFloat(result.toFixed(10));
  } catch (error) {
    throw new Error("Calculation error");
  }
};

type CalculatorButtonProps = {
  value: string;
  onClick: () => void;
};

type CalculatorResultInputProps = {
  value: string;
  error: string;
  setInput: (input: string) => void;
};

const CalculatorButton = memo(({ value, onClick }: CalculatorButtonProps) => {
  return (
    <button onClick={onClick} className="">
      {value}
    </button>
  );
});

const CalculatorResultInput = ({
  value,
  error,
  setInput,
}: CalculatorResultInputProps) => (
  <div className="display-container">
    {error && <div className="error-message">{error}</div>}

    <input
      type="text"
      value={value}
      className=""
      onChange={(e) => setInput(e.target.value)}
    />
  </div>
);

const Calculator = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleInput = useCallback((value: string) => {
    setError("");
    setInput((prev) => prev + value);
  }, []);

  const calculate = useCallback(() => {
    try {
      if (
        !["+", "-", "*", "/", "="].some((substring) =>
          input.includes(substring)
        )
      )
        return;

      const result = evaluateExpression(input);

      setInput(String(result));
    } catch (err) {
      setError("Invalid expression");
    }
  }, [input]);

  const clearInput = useCallback(() => {
    setInput("");
    setError("");
  }, []);

  const clearLastSym = () => {
    setInput(input.slice(0, -1));
    setError("");
  };

  // TODO add to const
  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "AC",
    "0",
    "=",
    "+",
    "C",
  ];

  useHotkeys(hotkeys.Backspace, () => clearLastSym());
  useHotkeys(hotkeys.Enter, () => calculate());

  return (
    <div className="">
      <CalculatorResultInput value={input} error={error} setInput={setInput} />

      <div className="button-list">
        {buttons.map((btn) => (
          <CalculatorButton
            key={btn}
            value={btn}
            onClick={
              btn === "="
                ? calculate
                : btn === "C"
                ? clearLastSym
                : btn === "AC"
                ? clearInput
                : () => handleInput(btn)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
