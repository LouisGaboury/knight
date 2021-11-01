import { useEffect, useState } from "react";
import { getFreeMissions } from "../services/supabase/supabase";
import Mission from "./Mission";

const MissionsSlider = () => {
  const [missions, setMissions] = useState(null);
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    getFreeMissions().then((res) => setMissions(res));
  }, []);

  /* const updateCoterie = (newCoterie) => {
    let newCoteries = [...coteries];
    newCoteries[focus] = newCoterie;
    setCoteries(newCoteries);
  }; */

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
    </section>
  );
};

export default MissionsSlider;
