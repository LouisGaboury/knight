import { Fragment, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ActionButton from "./ActionButton";
import {
  getSeneschalByID,
  getMissionsByCoterie,
  trainCoterie,
  restCoterie,
  cancelMission,
} from "../services/supabase/supabase";
// eslint-disable-next-line no-unused-vars
import { Mission, Coterie as ClassCoterie } from "../services/supabase/classes";

/**
 * @param {Object} Props
 * @param {ClassCoterie} Props.coterie
 * @param {function} Props.updateCoterie
 * @param {function} Props.handleForth
 * @param {function} Props.handleBack
 * @returns L'affichage détaillé d'une coterie
 */
const Coterie = ({ coterie, handleBack, handleForth, updateCoterie }) => {
  const [seneschal, setSeneschal] = useState("");
  const [missions, setMissions] = useState([]);
  const [missionActuelle, setMissionActuelle] = useState("");

  useEffect(() => {
    getSeneschalByID(coterie.seneschal_id).then((res) => {
      setSeneschal(res);
    });
    getMissionsByCoterie(coterie.id).then((res) => {
      setMissions(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coterie]);

  useEffect(() => {
    setMissionActuelle(findLastMission());
  }, [missions]);

  /**
   * @description Trouve la dernière des missions effectuée par le groupe
   * @param {Mission[]} missions
   * @returns {string} Titre de la mission en cour
   */
  const findLastMission = () => {
    let lastMission = 0;
    let index = 0;
    missions.forEach((mission) => {
      if (mission.id > lastMission) {
        lastMission = mission.id;
        index = missions.indexOf(mission);
      }
    });
    return missions[index];
  };

  /**
   * @description Ajoute l'expérience voulue à la coterie chargée en props du composant
   */
  const handleTraining = async () => {
    // Impossible d'aller au delà du niveau élite
    if (coterie.rank !== "élite") {
      const result = await trainCoterie(coterie.id, coterie.xp, coterie.rank);
      updateCoterie(result);
    }
  };

  /**
   * @description Régénère la coterie d'une certaine quantité de pdv
   */
  const handleRest = async () => {
    const result = await restCoterie(coterie.id, coterie.health);
    updateCoterie(result);
  };

  const handleCancelMission = async () => {
    await cancelMission(missionActuelle.id);
    setMissionActuelle(null);
  };

  return (
    <Fragment>
      <h5 className="mb-6 mt-4 text-center text-3xl">Coterie n°{coterie.id}</h5>
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
      <div className="flex mx-6">
        {/* historique */}
        <div className="w-1/2">
          <ul>
            <li>Sénéchal : {seneschal.name}</li>
            <li>Rang : {coterie.rank}</li>
            <li>Mission actuelle : {missionActuelle?.title}</li>
            <li>Missions totales : {missions?.length}</li>
          </ul>
        </div>
        {/* boutons d'action */}
        <div className="flex flex-col justify-around w-1/2">
          <div className="flex justify-around mb-4">
            <ActionButton
              textButton={"Se reposer"}
              onClick={handleRest}
              disabled={missionActuelle ? true : false}
            />
            <ActionButton
              textButton={"Entrainer"}
              onClick={handleTraining}
              disabled={missionActuelle ? true : false}
            />
          </div>
          <div className="flex justify-around">
            <ActionButton
              textButton={"Rappeler"}
              onClick={handleCancelMission}
              disabled={missionActuelle ? false : true}
            />
            <ActionButton textButton={"WIP"} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Coterie;
