import { Fragment } from "react";

const FocusMission = ({ trigger, setTrigger, mission }) => {
  return trigger ? (
    <section className="fixed z-10 top-0 left-0 h-screen w-full bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white shadow-md rounded w-1/2 h-2/3">
        <h2>{mission?.title}</h2>
        <button
          onClick={() => {
            setTrigger(false);
          }}
        >
          Close
        </button>
      </div>
    </section>
  ) : (
    <Fragment />
  );
};

export default FocusMission;
