import { useState } from "react";

const ToDoList = () => {
  const [todo, setTodo] = useState(" ");
  const [todos, setTodos] = useState([]);

  const handleClick = () => {};

  const handleDelete = () => {};

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      todo: todo,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTodo(""); // clear input
  };

  return (
    <>
      <div className="container mx-auto my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold"> Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="bg-white w-1/2"
            type="text"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 text-sm py-1 text-white mx-6 rounded-md font-bold cursor-pointer"
          >
            Add
          </button>
        </div>
        <h1 className="text-lg font-bold">Your Todo</h1>
        <div className="todos">
          {todo.map((item) => {
            <div className="todo flex">
              <div className={item.isCompleted ? "" : "line-through"}>
                {item.todo}
              </div>
              <div className="buttons">
                <button
                  onClick={handleClick}
                  className="bg-violet-800 hover:bg-violet-950 p-2 text-sm py-1 text-white mx-1 rounded-md font-bold cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-violet-800 hover:bg-violet-950 p-2 text-sm py-1 text-white mx-1 rounded-md font-bold cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </>
  );
};

export default ToDoList;
