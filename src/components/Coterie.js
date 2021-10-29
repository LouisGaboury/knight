import { Fragment, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ActionButton from "./ActionButton";
import { getSeneschal, getMissions } from "../services/supabase/supabase";

const Coterie = ({ coterie, handleFocus }) => {
  const [seneschal, setSeneschal] = useState("");
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    getSeneschal(coterie.seneschal_id).then((res) => {
      setSeneschal(res);
    });
    getMissions(coterie.id).then((res) => {
      setMissions(res);
    });
  }, [coterie]);

  return (
    <Fragment>
      <h5 className="mb-6 mt-4 text-center text-3xl">Coterie n°{coterie.id}</h5>
      {/* boutons de switch sur le côté */}
      <div className="flex justify-between">
        <button
          onClick={handleFocus}
          id="back"
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
          onClick={handleFocus}
          id="forth"
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
      {/* indicateurs circulaires (santé, pex, espoir) */}
      <div className="relative mb-10 -top-10 flex flex-row justify-around mx-10">
        <div className="w-40 h-40">
          <p className="mb-4 text-center text-lg font-bold">Santé</p>
          <CircularProgressbar
            value={coterie.health}
            text={`${coterie.health}%`}
            styles={{
              path: {
                stroke: "#d1280f",
              },
              text: {
                fill: "#d1280f",
              },
            }}
          />
        </div>
        <div className="w-40 h-40">
          <p className="mb-4 text-center text-lg font-bold">Espoir</p>
          <CircularProgressbar value={coterie.hope} text={`${coterie.hope}%`} />
        </div>
        <div className="w-40 h-40">
          <p className="mb-4 text-center text-lg font-bold">XP</p>
          <CircularProgressbar value={coterie.xp} text={`${coterie.xp}%`} />
        </div>
      </div>
      {/* historique et boutons d'action */}
      <div className="flex">
        {/* historique */}
        <div className="w-1/2">
          <ul>
            <li>Sénéchal : {seneschal.name}</li>
            <li>Rang : {coterie.rank}</li>
            <li>Mission actuelle :</li>
            <li>Missions totales : {missions && missions.length}</li>
          </ul>
        </div>
        {/* boutons d'action */}
        <div className="flex flex-col justify-around w-1/2">
          <div className="flex justify-around mb-4">
            <ActionButton textButton={"Se reposer"} />
            <ActionButton textButton={"Entrainer"} />
          </div>
          <div className="flex justify-around">
            <ActionButton textButton={"Rappeler"} />
            <ActionButton textButton={"Dissoudre"} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Coterie;
