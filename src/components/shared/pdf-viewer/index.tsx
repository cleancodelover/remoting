"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReading } from "@/contexts/readingContext";
import { FaWindowClose } from "react-icons/fa";

const PDFViewer = () => {
  const { bookUrl, setBookUrl } = useReading();
  return (
    <div>
      <AnimatePresence>
        {bookUrl && (
          <motion.div
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={()=>{setBookUrl && setBookUrl(undefined)}}
            className="overlay bg-black bg-opacity-50 inset-0"
            
          />
        )}
      </AnimatePresence>
      {bookUrl && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: 1000 }}
          className="fixed top-0 left-0 w-screen h-screen  inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center md:px-4"
        >
          <div className="flex flex-col self-center items-center">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={()=>{setBookUrl && setBookUrl(undefined)}}
            className="self-end"
          >
            <h1 className="flex flex-row justify-center items-center gap-2"><FaWindowClose /> Close</h1>
          </motion.button>
            <iframe
              src={bookUrl}
              className="w-[800px] h-[700px]"
              style={{ border: "none" }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PDFViewer;
