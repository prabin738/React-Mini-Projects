import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [operator, setOperator] = useState("");

  // Base style for all round floating buttons
  const baseButtonStyle =
    "cursor-pointer group flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_15px_rgba(0,0,0,0.4)] active:translate-y-0 active:shadow-[0_2px_5px_rgba(0,0,0,0.3)]";

  // Variant styles
  const numberStyle = `${baseButtonStyle} bg-slate-700 hover:bg-slate-600`;
  const topRowStyle = `${baseButtonStyle} bg-cyan-800 hover:bg-cyan-700 text-cyan-100`;
  // Using a gradient for operators to make them stand out
  const operatorStyle = `${baseButtonStyle} bg-gradient-to-br from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500`;

  // Style for the wide "0" button (pill shape)
  const zeroButtonStyle = `col-span-2 flex h-16 w-full items-center justify-start pl-6 rounded-full text-xl font-bold text-white bg-slate-700 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-slate-600 hover:shadow-[0_8px_15px_rgba(0,0,0,0.4)] active:translate-y-0 active:shadow-[0_2px_5px_rgba(0,0,0,0.3)]`;

  return (
    // Main Container with a dark gradient background
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 font-sans">
      {/* Calculator Body Container */}
      <div className="w-full max-w-[340px] rounded-[3rem] bg-slate-800/50 p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50">
        {/* Unique Floating Display Screen */}
        <div className="mb-6 flex h-36 flex-col items-end justify-end rounded-3xl bg-black/40 p-5 shadow-inner ring-1 ring-white/10 backdrop-blur-sm">
          {/* Previous Input (small text) */}
          <div className="mb-1 text-lg font-medium text-slate-400">1,200 +</div>
          {/* Current Input (large text) - uses tracking-wider for modern look */}
          <div className="text-5xl font-extrabold tracking-wider text-white break-all line-clamp-2">
            500
          </div>
        </div>

        {/* Keypad Grid with larger gap for floating effect */}
        <div className="grid grid-cols-4 gap-4">
          {/* --- Row 1 --- */}
          <button className={topRowStyle}>AC</button>
          <button className={topRowStyle}>+/-</button>
          <button className={topRowStyle}>
            <FiDelete className="text-2xl" />
          </button>
          <button className={operatorStyle}>÷</button>

          {/* --- Row 2 --- */}
          <button className={numberStyle}>7</button>
          <button className={numberStyle}>8</button>
          <button className={numberStyle}>9</button>
          <button className={operatorStyle}>×</button>

          {/* --- Row 3 --- */}
          <button className={numberStyle}>4</button>
          <button className={numberStyle}>5</button>
          <button className={numberStyle}>6</button>
          <button className={operatorStyle}>-</button>

          {/* --- Row 4 --- */}
          <button className={numberStyle}>1</button>
          <button className={numberStyle}>2</button>
          <button className={numberStyle}>3</button>
          <button className={operatorStyle}>+</button>

          {/* --- Row 5 --- */}
          {/* Zero (Wide Pill Shape) */}
          <button className={zeroButtonStyle}>0</button>

          {/* Decimal */}
          <button className={numberStyle}>.</button>

          {/* Equals */}
          <button className={operatorStyle}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
