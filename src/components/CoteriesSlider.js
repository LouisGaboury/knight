import { useEffect, useState } from "react";
import { getCoteries } from "../services/supabase/supabase";
import Coterie from "./Coterie";

const CoteriesSlider = ({ idSection }) => {
  const [coteries, setCoteries] = useState(null);
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (idSection) {
      getCoteries(idSection).then((res) => setCoteries(res));
    }
  }, [idSection]);

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

  // If component set : display. Else : display nothing
  return (
    <section>
      {coteries && (
        <Coterie coterie={coteries[focus]} handleFocus={changeFocus} />
      )}
    </section>
  );
};

export default CoteriesSlider;
