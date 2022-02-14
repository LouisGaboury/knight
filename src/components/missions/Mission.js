import React, { Fragment } from "react";
// eslint-disable-next-line no-unused-vars
import { Mission as ClassMission } from "../services/supabase/classes";

/**
 *
 * @param {Object} props
 * @param {ClassMission} props.mission
 * @param {Function} props.handleForth
 * @param {Function} props.handleBack
 * @returns L'affichage d'une mission sur la page principale
 */
const Mission = ({ mission, handleForth, handleBack }) => {
  return (
    <Fragment>
      <h5 className="text-xl font-semibold mb-4">{mission?.title}</h5>
      <p className="mx-8 text-justify">{mission?.description}</p>
      {/* boutons de switch sur le côté */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="p-4 max-w-xs max-h-16 bg-blue-400 rounded-xl shadow-md relative -left-8 hover:bg-blue-700 transform transition duration-300 ease-in-out focus:ring-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={handleForth}
          className="p-4 max-w-xs max-h-16 bg-blue-400 rounded-xl shadow-md relative -right-8 hover:bg-blue-700 transform transition duration-300 ease-in-out focus:ring-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Fragment>
  );
};

export default Mission;
