import { Fragment, useState, useEffect } from "react";
import ActionButton from "../utility/ActionButton";
// eslint-disable-next-line no-unused-vars
import { supabase } from "../../supabaseClient";
// eslint-disable-next-line no-unused-vars
import { Mission, Coterie } from "../../services/supabase/classes";
import {
  cancelMission,
  assignMission,
  getSectionByUser,
  getFreeCoteriesBySection,
} from "../../services/supabase/supabase";

/**
 * @param {Object} Props
 * @param {boolean} Props.trigger
 * @param {function} Props.setTrigger
 * @param {Mission} Props.mission
 * @param {function} Props.setMission
 * @returns L'interface qui s'affiche quand on clique sur une mission depuis la map
 */
function FocusMission({ trigger, setTrigger, mission, setMission }) {
  const [coteries, setCoteries] = useState([]);
  const [selectedCoterieID, setSelectedCoterieID] = useState(null);

  useEffect(() => {
    if (mission?.coterie_id) return;
    getSectionByUser(supabase.auth.user().id).then((res) => {
      getFreeCoteriesBySection(res.id).then((res) => {
        setSelectedCoterieID(res[0].id);
        setCoteries(res);
      });
    });
  }, [mission]);

  const handleCancelMission = async () => {
    // On modifie la mission dans la BDD
    await cancelMission(mission.id, selectedCoterieID);
    // Pour éviter un nouvel appel à la BDD, on change la mission en interne au front
    let newMission = mission;
    newMission.status = "Libre";
    newMission.coterie_id = null;
    // On update la mission pour le composant parent - GlobalMap
    setMission(newMission);
  };

  const handleAssignMission = async () => {
    await assignMission(mission.id, selectedCoterieID);
    // Pour éviter un nouvel appel à la BDD, on change la mission en interne au front
    let newMission = mission;
    newMission.status = "En cours";
    newMission.coterie_id = selectedCoterieID;
    // On update la mission pour le composant parent - GlobalMap
    setMission(newMission);
  };

  return trigger ? (
    <section className="fixed z-10 top-0 left-0 h-screen w-full bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white shadow-md rounded w-1/2 h-2/3 flex flex-col">
        <h2 className="text-4xl pt-4 mb-8 text-center">{mission?.title}</h2>
        <p className="mx-6 mb-8 text-justify">{mission?.description}</p>
        <div className={"flex justify-around mb-8"}>
          <p>
            Difficulté : <span>{mission?.difficulty}</span>
          </p>
          <p>
            Récompense : <span>{mission?.reward}</span>
          </p>
        </div>
        {/* Choix d'une coterie à envoyer. Ne s'affiche que si mission libre */}
        {!mission?.coterie_id && (
          <Fragment>
            <label htmlFor="coterie-select" className="mx-6">
              Sélectionnez une coterie :
            </label>
            <select
              name="coterie"
              id="coterie-select"
              className="mx-6"
              onChange={(event) => {
                setSelectedCoterieID(event.target.value);
              }}
            >
              {coteries?.map(
                /**
                 * @param {Coterie} coterie La coterie itérée
                 * @param {number} index Place de la coterie dans le tableau généré
                 */
                (coterie, index) => {
                  return (
                    <option value={coterie.id} key={index}>
                      Coterie {coterie.rank} n°{coterie.id} - Sénéchal{" "}
                      {" " + coterie.seneschal.name}
                    </option>
                  );
                }
              )}
            </select>
          </Fragment>
        )}
        {/* Ligne des boutons d'actions */}
        <div className="flex justify-around mt-8">
          <ActionButton
            textButton={mission.coterie_id ? "Rappeler" : "Envoyer"}
            onClick={() =>
              mission.coterie_id ? handleCancelMission() : handleAssignMission()
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
