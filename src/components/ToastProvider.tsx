import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/toastify-overrides.css";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-white dark:bg-containerBackground",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={(context) =>
          `${contextClass[context?.type || "default"]} relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer mt-4`
        }
        bodyClassName="font-poppins text-black dark:text-white"
      />
    </>
  );
};
