import React from "react";

const AddTodo = ({ handleSubmit, errors, onSubmit, register }) => {
  return (
    <div
      className={`w-full rounded form-container ${
        errors?.title ? "mb-5" : "mb-10"
      } `}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-x-5">
        <input
          {...register("title", {
            required: "Please enter your todo..",
            minLength: {
              value: 4,
              message: "Minimum length is four",
            },
          })}
          type="text"
          placeholder="Enter todo"
          className="outline-none text-sm p-3 rounded bg-gray-900 w-full 
            active:outline-slate-700 focus:outline-slate-700"
        />
        <input
          type="submit"
          placeholder="Submit"
          className="bg-slate-800 px-5 text-sm rounded cursor-pointer uppercase font-semibold 
        duration-300 active:scale-95"
        />
      </form>
      <p className="text-red-500 mt-2">{errors?.title?.message}</p>
    </div>
  );
};

export default AddTodo;
