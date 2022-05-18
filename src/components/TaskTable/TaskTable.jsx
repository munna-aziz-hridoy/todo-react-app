import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { toast } from "react-toastify";

const TaskTable = ({ task, setTask, refetch }) => {
  const handleComplete = (id) => {
    const selected = task.find((item) => item._id === id);
    const rest = task.filter((item) => item._id !== id);

    let { completed, ...restItem } = selected;
    if (!completed) {
      completed = true;
      const updatedTask = { ...restItem, completed };
      const url = `https://polar-lake-39202.herokuapp.com/complete?id=${id}`;
      fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedTask),
      }).then(() => toast("Task Completed"));

      const newTask = [...rest, updatedTask];
      setTask(newTask);
    }
    refetch();
    return;
  };

  const handleDelete = (id) => {
    const isDelete = window.confirm("Are you sure you want to delete?");

    const url = `https://polar-lake-39202.herokuapp.com/delete?id=${id}`;
    if (isDelete) {
      fetch(url, { method: "DELETE" }).then(() => toast.error("Task Deleted"));
      const rest = task.filter((item) => item._id !== id);
      setTask(rest);
    }
    refetch();
    return;
  };

  return (
    <div className="mb-10 mt-3 shadow-md">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {task?.map((item, index) => (
              <tr key={index}>
                <th
                  className={`w-[5%] ${item.completed ? "line-through" : ""}`}
                >
                  {index + 1}
                </th>
                <td
                  className={`w-[25%] ${item.completed ? "line-through" : ""}`}
                >
                  {item?.task}
                </td>
                <td className={item.completed ? "line-through" : ""}>
                  {item?.description}
                </td>
                <td className="w-[15%]">
                  <div className="flex justify-center items-center gap-5">
                    <button
                      className="flex justify-center items-center text-3xl rounded-lg shadow-md p-3 text-green-700 border-2 border-green-700"
                      onClick={() => handleComplete(item?._id)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="flex justify-center items-center text-3xl rounded-full shadow-md p-3 text-red-400 border-2 border-red-400"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
