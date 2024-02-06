import Swal from "sweetalert2";

const ConfirmCompleteModal = ({changeStatus}) => {
  const ConfirmCompleteTask = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Completed!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Completed!",
            text: "The task has been marked as completed.",
            icon: "success",
          });
          changeStatus();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      <button
        onClick={ConfirmCompleteTask}
        className="p-1 text-green-500 rounded-[4px]"
        title="Mark as Check"
      >
        <img src="/image.svg" className="h-4 w-4 text-green-600" />
      </button>

      {/* modal */}
    </>
  );
};

export default ConfirmCompleteModal;
