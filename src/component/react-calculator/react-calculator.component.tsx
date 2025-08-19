import { memo, useCallback, useState } from "react";
import "./react-calculator.component.css";

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

type ButtonProps = {
  value: string;
  onClick: () => void;
};

type ResultProps = {
  value: string;
  error: string;
};

const Button = memo(({ value, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{value}</button>;
});

const Result = ({ value, error }: ResultProps) => (
  <div className="display-container">
    {error && <div className="error-message">{error}</div>}

    <input type="text" value={value} readOnly />
  </div>
);

const ReactCalculator = () => {
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
    "C",
    "0",
    "=",
    "+",
  ];

  return (
    <div className="">
      <Result value={input} error={error} />

      <div className="button-list">
        {buttons.map((btn) => (
          <Button
            key={btn}
            value={btn}
            onClick={
              btn === "="
                ? calculate
                : btn === "C"
                ? clearInput
                : () => handleInput(btn)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ReactCalculator;
