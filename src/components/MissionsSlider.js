import { useEffect, useState } from "react";
import {
  getFreeCoteriesBySection,
  getFreeMissions,
  assignMission,
} from "../services/supabase/supabase";
import Mission from "./Mission";
import ActionButton from "./ActionButton";
import { supabase } from "../supabaseClient";

const MissionsSlider = ({ section }) => {
  const [missions, setMissions] = useState(null);
  const [focus, setFocus] = useState(0);
  const [coteries, setCoteries] = useState([]);
  const [selectedCoterieID, setSelectedCoterieID] = useState(null);

  useEffect(() => {
    getFreeMissions().then((res) => setMissions(res));
    getFreeCoteriesBySection(section.id).then((res) => {
      setCoteries(res);
      setSelectedCoterieID(res[0].id);
    });
    let listener = supabase
      .from("mission")
      .on("UPDATE", () => {
        // Si les missions sont modifiées : recharger les missions
        getFreeMissions().then((res) => setMissions(res));
        getFreeCoteriesBySection(section.id).then((res) => {
          setCoteries(res);
          setSelectedCoterieID(res[0].id);
        });
      })
      .subscribe();
    // clean-up effect
    return () => {
      // Quand le composant est démonté : efface l'abonnement à la BDD
      supabase.removeSubscription(listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const handleAssignMission = async () => {
    await assignMission(missions[focus].id, selectedCoterieID);
  };

  const goForth = () => {
    // If we are at the end of the array
    if (focus === coteries.length - 1) {
      // go back to zero
      setFocus(0);
    } else {
      // else advance
      setFocus(focus + 1);
    }
  };

  const goBack = () => {
    // If we are at the beginning of the array
    if (focus === 0) {
      // go to the end of the array
      setFocus(coteries.length - 1);
    } else {
      // move back from 1 unit
      setFocus(focus - 1);
    }
  };

  // If component set : display. Else : display nothing
  return (
    <section>
      {missions && (
        <Mission
          mission={missions[focus]}
          handleForth={goForth}
          handleBack={goBack}
        />
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
