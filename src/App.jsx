import React, { useState } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  markTodoDone,
  removeTodo,
  updateTodo,
} from "./features/todoSlice";

const App = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todos);

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
    const foundTodoTitle = allTodos.find((item) => item.id === id).title;
    setValue("title", foundTodoTitle);
  };

  const handleDelete = (e, id) => {
    dispatch(removeTodo(id));
  };

  const handleDone = (e, id) => {
    dispatch(markTodoDone(id));
  };

  const onSubmit = (data, e) => {
    if (isEdit.editable) {
      dispatch(updateTodo({ data, id: isEdit.id }));
    } else {
      dispatch(addTodo(data.title));
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
          {allTodos.map((todo, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default App;
