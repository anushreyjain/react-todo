import React, { useState } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Test todo", status: false },
  ]);

  const [isEdit, setIsEdit] = useState({ id: null, editable: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleEdit = (e, id) => {
    setIsEdit({ id: id, editable: true });
    const foundTodoTitle = todos.find((item) => item.id === id).title;
    setValue("title", foundTodoTitle);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (e, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const onSubmit = (data, e) => {
    if (isEdit.editable) {
      const updatedTodo = todos.map((todo) => ({
        ...todo,
        title: todo.id === isEdit.id ? data.title : todo.title,
      }));
      setTodos(updatedTodo);
    } else {
      const newData = {
        ...data,
        id: uuidv4(),
        status: false,
      };
      setTodos([...todos, newData]);
    }
    setIsEdit({ id: null, editable: false });
    reset();
  };

  return (
    <div className="h-screen bg-slate-950 text-gray-200 flex flex-col items-center mx-auto">
      <div className="w-1/2 my-10">
        <AddTodo
          errors={errors}
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
        />
        <div
          className="todo-container border border-slate-900 text-gray-100 text-sm 
        rounded-md p-4 h-[calc(100vh-9.375rem)] overflow-auto flex flex-col gap-4"
        >
          {todos.length > 0 ? (
            <>
              {todos.map((todo, index) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  status={todo.status}
                  handleDone={handleDone}
                  title={todo.title}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          ) : (
            <div className="flex justify-center text-slate-500">
              <p>No Todos to show, Please create a TODO.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
