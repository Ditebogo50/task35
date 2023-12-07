import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  };

  const toastError = (message, opts = {}) => {
    toast.error(message, { ...options, opts });
  };

  const toastSuccess = (message, opts = {}) => {
    toast.success(message, { ...options, opts });
  };

  return { toastError, toastSuccess };
};

export default useToast;
