"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePopOver } from "@/contexts/popOverContext";
import { FaWindowClose } from "react-icons/fa";
import LoginForm from "@/views/login";
import SignupForm from "@/views/signup";

const PopOver = () => {
  const { isOpen, setIsOpen, view } = usePopOver();
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsOpen && setIsOpen(false);
            }}
            className="overlay"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        // animate={{ x: isOpen ? "50%" : "100%" }}
        animate={{ x: isOpen ? (window.innerWidth >= 1024 ? "50%" : "0%") : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sliding-div relative w-[100vw] md:w-[50vw]"
      >
        <button
          onClick={() => {
            setIsOpen && setIsOpen(false);
          }}
          className="absolute top-3 left-3"
        >
          <FaWindowClose />
        </button>
        <div className="h-full flex flex-col justify-start items-start mt-4">
          { view =='login' && <LoginForm /> }
          { view =='signup' && <SignupForm /> }
        </div>
      </motion.div>
    </>
  );
};

export default PopOver;
