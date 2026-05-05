import { useState } from 'react';

export type Op = '+' | '-' | '*' | '/';

const apply = (a: number, b: number, op: Op): number => {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? NaN : a / b;
  }
};

const format = (n: number): string => {
  if (!Number.isFinite(n)) return 'Erro';
  return String(Number(n.toPrecision(12)));
};

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState<number | null>(null);
  const [operation, setOperation] = useState<Op | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevious(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    if (display === '0') return;
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  };

  const inputPercent = () => {
    setDisplay(format(parseFloat(display) / 100));
  };

  const performOperation = (next: Op) => {
    const value = parseFloat(display);
    if (previous === null) {
      setPrevious(value);
    } else if (operation) {
      const result = apply(previous, value, operation);
      setDisplay(format(result));
      setPrevious(result);
    }
    setOperation(next);
    setWaitingForOperand(true);
  };

  const equals = () => {
    if (operation === null || previous === null) return;
    const value = parseFloat(display);
    const result = apply(previous, value, operation);
    setDisplay(format(result));
    setPrevious(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  return {
    display,
    previous,
    operation,
    inputDigit,
    inputDecimal,
    clear,
    toggleSign,
    inputPercent,
    performOperation,
    equals,
  };
}

export const opSymbol = (op: Op | null): string => {
  if (!op) return '';
  const map: Record<Op, string> = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  return map[op];
};
