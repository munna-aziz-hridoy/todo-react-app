import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import TaskModal from "../TaskModal/TaskModal";
import TaskTable from "../TaskTable/TaskTable";
import { useQuery } from "react-query";
import Spinner from "../Spinner/Spinner";

const Home = () => {
  const [user] = useAuthState(auth);
  const [closeModal, setCloseModal] = useState(false);
  const [task, setTask] = useState([]);

  const url = `https://polar-lake-39202.herokuapp.com/getTask?email=${user?.email}`;
  const { isLoading, refetch } = useQuery(["task", user], () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTask(data));
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="container mx-auto my-20">
      <h2 className="text-4xl font-bold text-primary capitalize text-center">
        my today's task
      </h2>
      <div className="flex justify-end">
        <label
          onClick={() => setCloseModal(!closeModal)}
          htmlFor="task-modal"
          className="btn  btn-outline text-primary hover:bg-primary hover:text-white font-semibold capitalize text-xl rounded-lg mt-10"
        >
          add task
        </label>
      </div>
      {task.length !== 0 ? (
        <TaskTable task={task} setTask={setTask} refetch={refetch} />
      ) : (
        <p className="text-3xl font-semibold text-red-400 capitalize my-5 text-center">
          Please add some task
        </p>
      )}
      {closeModal && (
        <TaskModal
          setCloseModal={setCloseModal}
          prevTask={task}
          setTask={setTask}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default Home;
