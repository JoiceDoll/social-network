import React from "react";
import { motion } from "framer-motion";

interface IModal {
  children: React.ReactNode;
  opacity?: string;
  className?: string;
}

const Modal: React.FC<IModal> = ({ children, opacity = 50, className }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-500 ${opacity} flex justify-center items-center z-50`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 1, x: -50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 flex justify-center items-center z-50"
      >
        <div
          className={`bg-white p-6 rounded-lg relative w-full h-full ${className}`}
        >
          <div>{children}</div>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
