// components/PermissionPopup.tsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  onClose: () => void;
}

const PermissionPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30 bg-opacity-40">
      <div className="bg-[#2c2c2c] text-white p-8 rounded-3xl shadow-lg text-center w-[90%] max-w-md">
        <h2 className="text-3xl font-bold mb-2">Thank You</h2>
        <p className="text-lg font-semibold">Requested Permission</p>
        <p className="text-lg font-semibold mb-4">From Admin</p>
        <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-6" />
        <button
          onClick={onClose}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          Back To Exam Page
        </button>
      </div>
    </div>
  );
};

export default PermissionPopup;
