import { useEffect, useState } from "react";
import AddNewTask from "./components/AddNewTask";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";

const App = () => {
  const [tasks, setTask] = useState([]);

  const [reloadFlag, setReloadFlag] = useState(false);
  const reloadComp = () => {
    setReloadFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {
    const prevTasks = localStorage.getItem("prevTasks") || [];

    if (prevTasks.length !== 0) {
      setTask(JSON.parse(prevTasks));
    } else {
      setTask([]);
    }
  }, [reloadFlag]);

  const completedTasks =
    tasks && tasks.filter((task) => task.isCompleted === true);
  const incompletedTasks =
    tasks && tasks.filter((task) => task.isCompleted === false);

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto mt-10 px-5 pb-10">
        <h2 className="font-bold my-5">Incompleted Tasks</h2>
        <div className="grid grid-cols-12 gap-5">
          {incompletedTasks &&
            incompletedTasks.map((task, i) => (
              <TaskCard key={i} data={task} index={i} reloadComp={reloadComp} />
            ))}
        </div>

        {completedTasks.length !== 0 && (
          <>
            <h2 className="font-bold mt-10 mb-5">Completed Tasks</h2>
            <div className="grid grid-cols-12 gap-5">
              {completedTasks &&
                completedTasks.map((task, i) => (
                  <TaskCard
                    key={i}
                    data={task}
                    index={i}
                    reloadComp={reloadComp}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      <AddNewTask reloadComp={reloadComp} />
    </div>
  );
};

export default App;
