import React from "react";
import LikeDislikeCounter from "./components/LikeDislikeCounter";
import PasswordGenerator from "./components/PasswordGenerator";
import RandomQuoteGenerator from "./components/RandomQuoteGenerator";
import SimpleCalculator from "./components/SimpleCalculator";
import Navbar from "./todolist/components/Navbar";
import ToDoList from "./todolist/ToDoList";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* <LikeDislikeCounter /> */}
        {/* <PasswordGenerator /> */}
        {/* <RandomQuoteGenerator /> */}
        {/* <SimpleCalculator /> */}

        <ToDoList />
      </div>
    </>
  );
};

export default App;
