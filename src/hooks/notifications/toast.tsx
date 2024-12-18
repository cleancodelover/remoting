"use client";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
    const showToast = ({ message, type }:{ message?: string, type: 'success' | 'error' | 'warning' | 'info'}) =>{
        switch(type){
            case 'error':
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    transition: Bounce,
                });
                break;
            case 'info':
                toast.info(message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    transition: Bounce,
                });
                break;
            case 'success':
                toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    transition: Bounce,
                });
                break;
            case 'warning':
            toast.warning(message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                transition: Bounce,
            });
            break;
            default:
                toast(message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    transition: Bounce,
                });

        }
        
    }
  return { showToast }
}

export default useToast;
