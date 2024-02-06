import ConfirmCompleteModal from "./ConfirmCompleteTask";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const TaskCard = ({data, index, reloadComp}) => {
  // change isCompleted Value to true
  const changeStatus = () => {
    const storedData = JSON.parse(localStorage.getItem("prevTasks"));
    const newValue = storedData && storedData.map((storageData) => {
      if(storageData?.id === data?.id){
        return {...storageData, isCompleted: true}
      }
      return storageData;
    })
    localStorage.setItem("prevTasks", JSON.stringify(newValue));
    reloadComp();
  }

  // delete task
  // change isCompleted Value to true
  const deleteTask = () => {
    const storedData = JSON.parse(localStorage.getItem("prevTasks"));
    const remainingItems = storedData.filter((item) => parseInt(item?.id) !== data?.id)
    console.log("remainingItems", remainingItems);
    localStorage.setItem("prevTasks", JSON.stringify(remainingItems));
    reloadComp();
  }

  return (
    <>
      <div className="col-span-12 md:col-span-4">
        <div className={`w-full h-[150px] p-5 rounded-lg shadow-md border-[1px] border-brandColor/10 ${data?.isCompleted == true ? "bg-green-500/5" : "bg-white"}`}>
          <div className="h-full w-full flex flex-col items-start justify-between">
            <div className="flex items-start gap-3">
              <span className="w-14 h-10 bg-black/10 text-black flex items-center justify-center rounded-lg text-[22px] font-bold">
                {index + 1}
              </span>
              <div className="w-full">
                <h2 className="font-medium text-[14px]">
                  {data?.task}
                </h2>
              </div>
            </div>

            <div className="w-full mt-3">
              <hr />
              <div className="flex items-center justify-between w-full">
                <p className={`text-[12px] mt-2 w-full ${data?.isCompleted == true ? "text-green-500" : "text-black"}`}>{data?.isCompleted == true ? "Completed" : "Incomplete"}</p>
                <div className="w-full flex items-center justify-end gap-1 mt-2 text-[13px] -mb-2">
                  
                  <ConfirmDeleteModal deleteTask={deleteTask} />
                  {data?.isCompleted == false && <ConfirmCompleteModal changeStatus={changeStatus} />}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default TaskCard;
