import { useEffect, useState } from "react";
import {
  getFreeCoteriesBySection,
  getFreeMissions,
  subscribeFreeMissions,
  assignMission,
} from "../services/supabase/supabase";
import Mission from "./Mission";
import ActionButton from "./ActionButton";

const MissionsSlider = ({ section }) => {
  const [missions, setMissions] = useState(null);
  const [focus, setFocus] = useState(0);
  const [coteries, setCoteries] = useState([]);
  const [selectedCoterieID, setSelectedCoterieID] = useState(null);

  useEffect(() => {
    getFreeMissions().then((res) => setMissions(res));
    subscribeFreeMissions();
    if (section.id) {
      getFreeCoteriesBySection(section.id).then((res) => {
        setCoteries(res);
        setSelectedCoterieID(res[0].id);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const handleAssignMission = async () => {
    console.log(missions[focus], selectedCoterieID);
    await assignMission(missions[focus].id, selectedCoterieID);
  };

  // Allow to control witch coterie is shown
  const changeFocus = (event) => {
    if (event.target.id === "forth") {
      // If we are at the end of the array
      if (focus === missions.length - 1) {
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
        setFocus(missions.length - 1);
      } else {
        // move back from 1 unit
        setFocus(focus - 1);
      }
    }
  };

  // If component set : display. Else : display nothing
  return (
    <section>
      {missions && (
        <Mission mission={missions[focus]} handleFocus={changeFocus} />
      )}
      {/* choix d'une coterie */}
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
      {/* boutons d'action */}
      <ActionButton
        textButton={"Envoyer"}
        onClick={() => handleAssignMission()}
      />
    </section>
  );
};

export default MissionsSlider;
