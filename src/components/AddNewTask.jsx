import Swal from "sweetalert2";

const AddNewTask = ({reloadComp}) => {

    const click = () => {
        reloadComp();
    }

  const addNew = () => {
    Swal.fire({
      title: "Enter Task Details",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add Task",
      showLoaderOnConfirm: true,
      preConfirm: async (taskValue) => {
        const prevTasks = localStorage.getItem("prevTasks");
        const taskArray = prevTasks ? JSON.parse(prevTasks) : [];

        const newTask = {id: taskArray.length + 1, task: taskValue, isCompleted: false};
        
        taskArray.push(newTask);
        localStorage.setItem("prevTasks", JSON.stringify(taskArray));
        click();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
            title: "Done",
            text: "The task has been Added",
            icon: "success"
          });
      }
    });
  };

  return (
    <>
      {/* add new task button */}
      <button onClick={addNew} className="fixed right-5 bottom-5 bg-black text-white p-2 rounded-full flex items-center justify-center transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </>
  );
};

export default AddNewTask;
