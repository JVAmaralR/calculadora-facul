import { opSymbol, useCalculator } from './useCalculator';
import './Calculator.css';

export default function Calculator() {
  const {
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
  } = useCalculator();

  const expression =
    previous !== null && operation !== null
      ? `${previous} ${opSymbol(operation)}`
      : ' ';

  return (
    <div className="calculator">
      <div className="expression">{expression}</div>
      <div className="display">{display}</div>
      <div className="keys">
        <button className="fn" onClick={clear}>C</button>
        <button className="fn" onClick={toggleSign}>±</button>
        <button className="fn" onClick={inputPercent}>%</button>
        <button className="op" onClick={() => performOperation('/')}>÷</button>

        <button onClick={() => inputDigit('7')}>7</button>
        <button onClick={() => inputDigit('8')}>8</button>
        <button onClick={() => inputDigit('9')}>9</button>
        <button className="op" onClick={() => performOperation('*')}>×</button>

        <button onClick={() => inputDigit('4')}>4</button>
        <button onClick={() => inputDigit('5')}>5</button>
        <button onClick={() => inputDigit('6')}>6</button>
        <button className="op" onClick={() => performOperation('-')}>−</button>

        <button onClick={() => inputDigit('1')}>1</button>
        <button onClick={() => inputDigit('2')}>2</button>
        <button onClick={() => inputDigit('3')}>3</button>
        <button className="op" onClick={() => performOperation('+')}>+</button>

        <button className="zero" onClick={() => inputDigit('0')}>0</button>
        <button onClick={inputDecimal}>.</button>
        <button className="op" onClick={equals}>=</button>
      </div>
    </div>
  );
}
