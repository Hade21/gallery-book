import React from "react";

const Button = ({ disable, children }) => {
  return (
    <button
      type="submit"
      disabled={disable}
      className={
        disable
          ? "px-14 py-3 bg-slate-400 text-gray-200 rounded-lg w-fit font-commisioner font-bold mx-auto cursor-pointer transition-colors"
          : "px-14 py-3 bg-rose-600 rounded-lg w-fit font-commisioner font-bold mx-auto cursor-pointer transition-colors"
      }
    >
      {children}
    </button>
  );
};

export default Button;
