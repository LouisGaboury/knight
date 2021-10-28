import { Fragment, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ActionButton from "./ActionButton";

const Coterie = ({ getCoteries }) => {
  const [coteries, setCoteries] = useState([]);
  const [focus, setFocus] = useState(0);

  // Se déclenche dès que getCoteries est updated
  useEffect(() => {
    setCoteries(getCoteries());
  }, [getCoteries]);

  // Allow to control witch coterie is shown
  const changeFocus = (event) => {
    if (event.target.id === "forth") {
      // If we are at the end of the array
      if (focus === coteries.length - 1) {
        // go back to zero
        setFocus(0);
      } else {
        // else advance
        setFocus(focus + 1);
      }
    } else {
      // If we are at the beginning of the array
      if (focus === 0) {
        // go to the end of the array
        setFocus(coteries.length - 1);
      } else {
        // move back from 1 unit
        setFocus(focus - 1);
      }
    }
  };

  // Just display nothing if component doesn't set yet
  const displayLoading = () => {
    return <Fragment />;
  };

  const displayLoaded = () => {
    return (
      <section>
        <h5 className="mb-6 mt-4 text-center text-3xl">
          Coterie n°{coteries[focus].id}
        </h5>
        {/* boutons de switch sur le côté */}
        <div className="flex justify-between">
          <button
            onClick={changeFocus}
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
            onClick={changeFocus}
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
              value={coteries[focus].health}
              text={`${coteries[focus].health}%`}
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
            <CircularProgressbar
              value={coteries[focus].hope}
              text={`${coteries[focus].hope}%`}
            />
          </div>
          <div className="w-40 h-40">
            <p className="mb-4 text-center text-lg font-bold">XP</p>
            <CircularProgressbar
              value={coteries[focus].xp}
              text={`${coteries[focus].xp}%`}
            />
          </div>
        </div>
        {/* historique et boutons d'action */}
        <div className="flex">
          {/* historique */}
          <div className="w-1/2">
            <ul>
              <li>Sénéchal :</li>
              <li>Rang : {coteries[focus].rank}</li>
              <li>Mission actuelle :</li>
              <li>Missions totales :</li>
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
      </section>
    );
  };

  // If component set : display. Else : display nothing
  return coteries.length > 0 ? displayLoaded() : displayLoading();
};

export default Coterie;
