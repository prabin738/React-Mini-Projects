import React, { useCallback, useEffect, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst";
    if (charAllowed) {
      str += "~!@#$%^&*()_=";
    }
    if (numAllowed) {
      str += "1234567890";
    }
    let finalPass = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      let char = str.charAt(randomIndex);
      finalPass += char;
    }
    setPassword(finalPass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [length, charAllowed, numAllowed, setPassword]);

  return (
    <div className="bg-[#097C87] w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col p-9 bg-white rounded-xl shadow-2xl w-[500px]">
        {/* Heading */}
        <h1 className="text-3xl font-bold justify-center flex  text-[#097C87] mb-9">
          Password Generator
        </h1>

        {/* Input + Copy Button */}
        <div className="flex w-full mb-6">
          <input
            type="text"
            readOnly
            value={password}
            className="flex-1 p-3 border border-gray-300 rounded-l-md bg-gray-100 focus:outline-none"
          />
          <button
            onClick={copyPassword}
            className="bg-[#097C87] text-white px-4 rounded-r-md hover:bg-[#065c63] transition"
          >
            Copy
          </button>
        </div>

        {/* Slider */}
        <label className="mb-6">
          <span className="block font-semibold mb-2">Length: {length}</span>
          <input
            onChange={(e) => setLength(e.target.value)}
            type="range"
            min="2"
            max="32"
            value={length}
            className="w-full accent-[#097C87] cursor-pointer"
          />
        </label>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 mb-6">
          <label className="flex items-center gap-2">
            <input
              onChange={() => setNumberAllowed((prev) => !prev)}
              type="checkbox"
              className="accent-[#097C87]"
            />
            <span>Include Numbers</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              onChange={() => setCharAllowed((prev) => !prev)}
              type="checkbox"
              className="accent-[#097C87]"
            />
            <span>Include Special Characters</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="bg-[#097C87] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#065c63] transition"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
