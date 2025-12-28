import React, { useState } from "react";
// We don't need toast imports yet since that is "logic"

const GradientGenerator = () => {
  // ---------------------------------------------------------
  // 🧠 LOGIC ZONE: This is where you will add your state later
  // ---------------------------------------------------------
  const [count, setCount] = useState(12);
  const [type, setType] = useState("linear");
  const [gradientList, setGradientList] = useState([]);

  const getHexColorCode = () => {
    const colorCombination = Math.floor(Math.random() * 255 * 255 * 255);

    const colorHex = colorCombination.toString(16).padStart(6, "0");
    // alert(colorHex);
    return `#${colorHex}`;
    // alert(colorHex);
  };

  const generateGradient = () => {
    const colors = [];

    for (let i = 0; i < count; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      //   console.log(degree, color1, color2);
      const degreeString = `${degree}deg`;
      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: 'linear-gradient(${degreeString}, ${color1}, ${color2})`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: 'radial-gradient(circle, ${color1}, ${color2})'`,
        });
      }
    }

    setGradientList(colors);
  };

  return (
    // 1. Main Container: Full height, white background
    <div className="min-h-screen bg-white">
      {/* 2. Content Wrapper: Width 75% (9/12) and centered (mx-auto) */}
      <div className="w-9/12 mx-auto">
        {/* ------------------------------------------------------ */}
        {/* HEADER SECTION                                         */}
        {/* Layout: Flexbox to push Title to left, Controls to right */}
        {/* ------------------------------------------------------ */}
        <div
          className="flex justify-between mt-5 mb-8 p-6 rounded-xl"
          // We use a static style here for now to visualize it
          style={{ background: "linear-gradient(to right, #fbc2eb, #a6c1ee)" }}
        >
          <h1 className="text-3xl font-bold">🎨 Gradient Generator</h1>

          {/* Controls Container: Flex with gap for spacing */}
          <div className="flex gap-4">
            {/* Number Input */}
            <input
              type="number"
              className="border bg-white border-slate-300 rounded-lg w-[100px] p-2"
              placeholder="12"
              defaultValue="12"
            />

            {/* Type Select */}
            <select className="border border-slate-300 bg-white rounded-lg w-[100px] p-2">
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>

            {/* Generate Button */}
            <button
              onClick={generateGradient}
              className="px-16 py-2 bg-rose-500 text-white rounded font-medium cursor-pointer hover:bg-rose-600 transition"
            >
              Generate
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------ */}
        {/* GRID SECTION                                           */}
        {/* Layout: Grid with 4 columns                               */}
        {/* ------------------------------------------------------ */}
        <div className="grid grid-cols-4 gap-4">
          {/* HARDCODED CARDS (For UI visualization only) 
             Later, you will delete these and use {gradients.map...}
          */}

          {/* Card 1 */}
          <div
            className="h-[180px] rounded-xl relative shadow-md"
            style={{ background: "linear-gradient(45deg, #ff9a9e, #fad0c4)" }}
          >
            <span className="bg-black/50 hover:bg-black cursor-pointer text-white rounded absolute bottom-3 right-3 text-[10px] py-1 px-2">
              COPY
            </span>
          </div>

          {/* Card 2 */}
          <div
            className="h-[180px] rounded-xl relative shadow-md"
            style={{ background: "radial-gradient(circle, #a18cd1, #fbc2eb)" }}
          >
            <span className="bg-black/50 hover:bg-black cursor-pointer text-white rounded absolute bottom-3 right-3 text-[10px] py-1 px-2">
              COPY
            </span>
          </div>

          {/* Card 3 */}
          <div
            className="h-[180px] rounded-xl relative shadow-md"
            style={{ background: "linear-gradient(120deg, #84fab0, #8fd3f4)" }}
          >
            <span className="bg-black/50 hover:bg-black cursor-pointer text-white rounded absolute bottom-3 right-3 text-[10px] py-1 px-2">
              COPY
            </span>
          </div>

          {/* Card 4 */}
          <div
            className="h-[180px] rounded-xl relative shadow-md"
            style={{ background: "radial-gradient(circle, #ffecd2, #fcb69f)" }}
          >
            <span className="bg-black/50 hover:bg-black cursor-pointer text-white rounded absolute bottom-3 right-3 text-[10px] py-1 px-2">
              COPY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
