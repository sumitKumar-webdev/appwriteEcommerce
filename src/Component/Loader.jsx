import React from "react";

export const Loader = () => {
  return (
    <div className="flex w-screen caret-transparent h-screen items-center justify-center bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
};
