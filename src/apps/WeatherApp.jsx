import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import video from "../video.mp4";
import { toast, ToastContainer } from "react-toastify";

const WeatherApp = () => {
  /*
  📌 What I Learned from Building the Weather App:

  1. Component Structure:
     - Split the app into multiple components (SearchBar, WeatherCard, WeatherApp).
     - Learned how parent holds state and passes data down via props.

  2. Props & Data Flow:
     - SearchBar sends user input (city) up to parent using a callback prop.
     - WeatherApp fetches data based on that input and passes weather info down to WeatherCard.
     - Understood React’s unidirectional data flow (parent → child, child → parent via functions).

  3. State Management:
     - Used useState to manage weather data, loading state, and error messages.
     - Practiced conditional rendering (show loading spinner, error message, or weather card).

  4. API Integration:
     - Learned to call external APIs using Axios.
     - Built dynamic URLs with query parameters and API keys.
     - Handled async requests with try/catch/finally.

  5. Error Handling:
     - Displayed specific error messages for 404 (city not found) and 401 (invalid API key).
     - Cleared old weather data when errors occurred.

  6. UI Enhancements:
     - Added background video and overlay for styling.
     - Integrated Toastify for better error/success notifications.

  🎯 Overall: This project helped me understand how data flows between components,
      how to manage multiple states, and how to connect React apps with real APIs.
*/
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
  // const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=YOUR_API_KEY&units=metric`;

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      // console.log(response.data);
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again");
        toast.error("Failed");
      } else if (err.response && err.response.status === 401) {
        setError("Invalid API key. Check your .env file");
        toast.error("Failed");
      } else {
        setError("An error occurred. Please try again later");
        toast.error("Failed");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        Your Browser doesn't support video tag
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-1"></div>
      <div className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-md w-full z-10">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
        <SearchBar fetchWeather={fetchWeather} />
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
      <ToastContainer position="top-center" draggable />
    </div>
  );
};

export default WeatherApp;
