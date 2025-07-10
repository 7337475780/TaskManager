import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "axios";
import { API_PATHS } from "../../utils/apiPath.js";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import moment from "moment";
import AvatarGroup from "../../components/layouts/AvatarGroup.jsx";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-500 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-500 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-500 border border-violet-500/10";
    }
  };

  //get Task Id
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );

      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (err) {
      console.error("Error fetching : ", err);
    }
  };

  //handle todo
  const updateTodoCheckList = async (idx) => {
    const todoCheckList = [...task?.todoCheckList];

    const taskId = id;

    if (todoCheckList && todoCheckList[idx]) {
      todoCheckList[idx].completed = !todoCheckList[idx].completed;

      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          { todoCheckList }
        );

        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          todoCheckList[idx].completed = !todoCheckList[idx].completed;
        }
      } catch (err) {
        todoCheckList[idx].completed = !todoCheckList[idx].completed;
      }
    }
  };

  //Attachment click
  const handleLinkClick = (link) => {
    if (!/^https?:\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }

    return () => {};
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4 ">
            <div className="form-card col-span-3 ">
              <div className="flex items-center justify-between ">
                <h2 className="text-sm md:text-xl font-medium ">
                  {task?.title}
                </h2>

                <div
                  className={`text-[13px] font-medium ${getStatusTagColor(
                    task?.status
                  )} px-4 py-0.5 rounded `}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.desc} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4 ">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500 ">
                    Assigned to
                  </label>

                  <AvatarGroup
                    maxVisible={5}
                    avatars={
                      task?.assignedTo?.map((item) => item?.profilePicUrl) || []
                    }
                  />
                </div>
              </div>

              <div className="">
                <label className="">To-Do Checklist</label>
                {task?.todoChecklist?.map((item, idx) => (
                  <TodoCheckList
                    key={`todo_${idx}`}
                    text={item.text}
                    isChecked={item?.Completed}
                    onChange={() => updateTodoCheckList(idx)}
                  />
                ))}
              </div>

              {task?.attacments?.length > 0 && (
                <div className="">
                  <label className="">Attachments</label>

                  {task?.attacments?.map((link, idx) => (
                    <Attacment
                      key={`link_${idx}`}
                      link={link}
                      index={idx}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className="text-xs font-medium text-slate-500 ">{label}</label>

      <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5   ">
        {value}
      </p>
    </>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100  border-gray-300 rounded-sm outline-none cursor-pointer  "
      />

      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  );
};

const Attacment = ({ key, onClick, link, index }) => {
  return (
    <div
      className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb3
       mt-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-3 ">
        <span className="text-xs text-gray-400 font-semibold mr-2  ">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        <p className="text-xs text-black ">{link}</p>
      </div>
      <LuSquareArrowOutUpRight className="text-gray-400" />
    </div>
  );
};
