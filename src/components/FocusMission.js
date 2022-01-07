import { Fragment } from "react";
import ActionButton from "./ActionButton";
// eslint-disable-next-line no-unused-vars
import { Mission } from "../services/supabase/classes";
import { cancelMission } from "../services/supabase/supabase";

/**
 * @param {Object} Props
 * @param {boolean} Props.trigger
 * @param {function} Props.setTrigger
 * @param {Mission} Props.mission
 * @returns L'interface qui s'affiche quand on clique sur une mission depuis la map
 */
function FocusMission({ trigger, setTrigger, mission }) {
  return trigger ? (
    <section className="fixed z-10 top-0 left-0 h-screen w-full bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white shadow-md rounded w-1/2 h-2/3 flex flex-col">
        <h2 className="text-4xl pt-4 mb-8 text-center">{mission?.title}</h2>
        <p className={"mx-6 mb-8 text-justify"}>{mission?.description}</p>
        <div className={"flex justify-around mb-8"}>
          <p>
            Difficulté : <span>{mission?.difficulty}</span>
          </p>
          <p>
            Récompense : <span>{mission?.reward}</span>
          </p>
        </div>
        <div className="flex justify-around">
          <ActionButton
            textButton={mission.coterie_id ? "Rappeler" : "Assigner"}
            onClick={() =>
              mission.coterie_id
                ? cancelMission(mission.id)
                : console.log("implémenter le système de coteries sur missions")
            }
          />
          <ActionButton
            textButton={"Fermer"}
            onClick={() => setTrigger(false)}
          />
        </div>
      </div>
    </section>
  ) : (
    <Fragment />
  );
}

export default FocusMission;
