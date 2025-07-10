import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
const TODOListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  //Add option
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  //Delete
  const handleDeleteOption = (idx) => {
    const updatedArr = todoList.filter((_, key) => key !== idx);
    setOption(updatedArr);
  };

  return (
    <div>
      {todoList.map((item, idx) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mb-3 mt-2  "
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2 ">
              {idx < 9 ? `0${idx + 1}` : idx + 1}
            </span>
            {item}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => {
              handleDeleteOption(idx);
            }}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md "
        />

        <button className="card-btn text-nowrap " onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default TODOListInput;
