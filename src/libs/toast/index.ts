import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = {
  success: (message: string, options = {}) => {
    toast.success(message, { position: "top-right", ...options });
  },
  error: (message: string, options = {}) => {
    toast.error(message, { position: "top-right", ...options });
  },
};

export { Toast };
