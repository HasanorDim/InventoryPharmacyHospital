import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <ClipLoader color="#2563EB" size={100} />
        <span className="absolute text-center text-gray-700 text-sm">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
