import React, { useEffect } from "react";

const CoustomAlert = ({ show, title, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">

      <div className="bg-white rounded-3xl w-[90%] max-w-md p-8 shadow-2xl animate-popup relative overflow-hidden">

        {/* CONFETTI (LIGHT) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="confetti"></div>
        </div>

        {/* SUCCESS TICK */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white animate-check"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-black">{title}</h2>
        <p className="text-gray-600 text-center mt-2">{message}</p>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-gray-900 transition font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CoustomAlert;
