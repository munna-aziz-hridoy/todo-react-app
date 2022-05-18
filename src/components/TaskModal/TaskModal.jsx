import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const TaskModal = ({ setCloseModal, prevTask, setTask, refetch }) => {
  const [user] = useAuthState(auth);

  const handleAddTask = (e) => {
    e.preventDefault();

    const task = e.target.task.value;
    const description = e.target.description.value;
    const todo = { task, description, completed: false, user: user?.email };

    fetch("https://polar-lake-39202.herokuapp.com/addtask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    }).then(() => {
      e.target.task.value = "";
      e.target.description.value = "";
      toast("One task added");
      setCloseModal(false);
      setTask([...prevTask, todo]);
      refetch();
    });
  };

  return (
    <div>
      <input type="checkbox" id="task-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="task-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-primary text-2xl font-semibold text-center">
            Add Task
          </h2>
          <form onSubmit={handleAddTask} className="flex flex-col gap-5 py-10">
            <input
              name="task"
              required
              type="text"
              placeholder="Task"
              className="input input-bordered input-primary w-full rounded-lg"
            />
            <textarea
              name="description"
              className="textarea textarea-primary w-full rounded-lg"
              placeholder="Description"
            />
            <input
              type="submit"
              value="Add Task"
              htmlFor="task-modal"
              className="btn  btn-primary text-white hover:bg-transparent hover:text-primary font-semibold capitalize text-xl rounded-lg w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
