import { useEffect, useState } from 'react'
import './App.css'

const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'C'
]

function App() {
  const [displayValue, setDisplayValue] = useState<string>('0');

  const handleButtonClick = (btn: string) => {
    if(btn === 'C') {
      setDisplayValue('0');
    }
    else if(btn === '=') {
      try {
        const result = eval(displayValue);
        setDisplayValue(result.toString());
      } catch {
        setDisplayValue('Error');
      }
    }
    else {
      setDisplayValue(prev => (prev === '0' ? btn : prev + btn));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const allowedKeys = '0123456789+-*/.';
      if(allowedKeys.includes(e.key)) {
        e.preventDefault();
        handleButtonClick(e.key);
      }
      else if(e.key === 'Enter') {
        e.preventDefault();
        handleButtonClick('=');
      }
      else if(e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        handleButtonClick('C');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleButtonClick]);

  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">React TypeScript Calculator</h1>

      <div className="bg-white p-4 rounded-x1 shadow-lg w-80">
        <div className="bg-black text-white text-right p-4 rounded mb-2 text-xl whitespace-pre-wrap break-words" id="display">
          {displayValue}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <button key={btn} onClick={() => handleButtonClick(btn)}
            className="bg-blue-700 text-white p-3 rounded hover:bg-blue-600 active:bg-blue-700 cursor-pointer transition"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      </div>
  );
}

export default App
