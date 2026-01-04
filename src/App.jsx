import React from "react";
import LikeDislikeCounter from "./apps/LikeDislikeCounter";
import PasswordGenerator from "./apps/PasswordGenerator";
import RandomQuoteGenerator from "./apps/RandomQuoteGenerator";
import SimpleCalculator from "./apps/SimpleCalculator";
import Navbar from "./todolist/components/Navbar";
import ToDoList from "./todolist/ToDoList";
import NeonRunner from "./apps/NeonRunner";
import GradientGenerator from "./apps/GradientGenerator";
import WeatherApp from "./apps/WeatherApp";
import BackgroundColorChanger from "./apps/BackgroundColorChanger";

const App = () => {
  let price = "$50";
  let euro = price.replace("$", "EUR");
  alert(euro);
  return (
    <>
      {/* <Navbar /> */}
      <div>
        {/* <LikeDislikeCounter /> */}
        {/* <PasswordGenerator /> */}
        {/* <RandomQuoteGenerator /> */}
        {/* <SimpleCalculator /> */}
        {/* <NeonRunner /> */}
        {/* <ToDoList /> */}
        {/* <GradientGenerator /> */}

        {/* <WeatherApp /> */}
        {/* <BackgroundColorChanger /> */}
      </div>
    </>
  );
};

export default App;
