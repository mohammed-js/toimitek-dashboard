import { toast } from "react-toastify";
export const baseUrl = "https://riadahit.com/erp/api/v1";

export const localStorageObjectExtractor = (object, key) => {
  var storedObject = JSON.parse(localStorage.getItem(object));
  console.log(storedObject);
  return storedObject?.[key];
};

export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 1000, // Auto close the notification after 3000 milliseconds (3 seconds)
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
