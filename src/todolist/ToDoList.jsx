const ToDoList = () => {
  return (
    <>
      <div className="container mx-auto my-5 p-5 rounded-xl bg-violet-100">
        <div className="addtodo">
          <h2 className="text-lg font-bold"> Add a Todo</h2>
          <input type="text" />
          <button>Add</button>
        </div>
        <h1 className="text-lg font-bold">Your Todo</h1>
        <div className="todos">
          <div className="todo"></div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
