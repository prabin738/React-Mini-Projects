import React, { useState } from "react";

const BackgroundColorChanger = () => {
  const [color, setColor] = useState("olive");
  const [inputColor, setInputColor] = useState("");
  const colors = ["Red", "Green", "blue", "Yellow"];

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <div className="bg-white p-6 w-full max-w-md shadow-lg rounded-lg">
        {/* Buttons row */}
        <div className="flex flex-wrap gap-3 mb-4">
          {colors.map((c) => (
            <button
              onClick={() => setColor(c)}
              key={c}
              className="px-4 py-2 rounded-md cursor-pointer text-white  font-bold shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: c }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Input + Set Background button (UI only) */}
        <div className="flex gap-3">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setColor(e.target.value);
              }
            }}
            onChange={(e) => setInputColor(e.target.value)}
            type="text"
            placeholder="Enter a color..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setColor(inputColor)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition"
          >
            Set Background
          </button>
        </div>
      </div>
    </div>
    /*
  📘 What I Learned from BackgroundColorChanger Project:

  1. React State Management:
     - Learned how to use useState to store and update values (background color).
     - Understood how state changes trigger re-rendering of the UI.

  2. Event Handling:
     - Practiced handling onClick events to change background color when a button is clicked.
     - Learned how onChange works for input fields to capture user-typed values.

  3. Controlled vs Uncontrolled Inputs:
     - Saw the difference between using state (controlled input) vs directly reading input value.
     - Learned why controlled inputs are the recommended React pattern.

  4. Dynamic UI Rendering:
     - Used .map() to dynamically generate multiple buttons from an array of colors.
     - Applied inline styles (style={{ backgroundColor: c }}) to make each button visually distinct.

  5. Tailwind CSS Styling:
     - Practiced using Tailwind utility classes for layout, spacing, hover effects, and responsiveness.
     - Learned how to combine flex, gap, padding, rounded, and shadow classes for a clean UI.

  6. Component Structure:
     - Organized UI into logical sections (button row, input + action button).
     - Understood how layout decisions (flex-row vs flex-col) affect appearance.

  👉 Overall: This project taught me the basics of React state, event handling, controlled inputs, 
     dynamic rendering, and styling with Tailwind — all combined into a simple but functional app.
*/
  );
};

export default BackgroundColorChanger;
