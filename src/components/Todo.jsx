import React from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdOutlineRemoveDone } from "react-icons/md";

const Todo = ({
  title,
  handleDone,
  handleEdit,
  handleDelete,
  status,
  id,
  ...property
}) => {
  return (
    <div className="todo bg-slate-900 rounded px-4 py-3 flex justify-between items-center">
      <div
        className={`todo-title flex-grow ${
          status ? "line-through text-gray-600" : ""
        }`}
      >
        {title}
      </div>
      <div className="buttons-container flex gap-x-3 w-[7rem] justify-end flex-shrink-0">
        <div
          onClick={(e) => {
            handleDone(e, id);
          }}
          className="p-2 text-base cursor-pointer hover:text-white transition-all
           text-slate-400 bg-slate-950 w-fit rounded duration-300 active:scale-90"
        >
          {status ? <MdOutlineRemoveDone /> : <IoCheckmarkDone />}
        </div>
        <div
          onClick={(e) => {
            handleEdit(e, id);
          }}
          className="p-2 text-base cursor-pointer hover:text-white transition-all
           text-slate-400 bg-slate-950 w-fit rounded duration-300 active:scale-90"
        >
          <MdModeEdit />
        </div>

        <div
          onClick={(e) => {
            handleDelete(e, id);
          }}
          className="p-2 text-base cursor-pointer hover:text-white transition-all
           text-slate-400 bg-slate-950 w-fit rounded duration-300 active:scale-90"
        >
          <MdDelete />
        </div>
      </div>
    </div>
  );
};

export default Todo;
