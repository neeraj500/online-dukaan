import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
  return (
    <div className="bg-neutral-100 h-dvh w-full flex justify-center items-center">
          <BeatLoader
        color="#3b82f6"
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
