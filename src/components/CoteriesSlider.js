import { useEffect, useState } from "react";
import { getCoteriesBySection } from "../services/supabase/supabase";
import Coterie from "./Coterie";

const CoteriesSlider = ({ idSection }) => {
  const [coteries, setCoteries] = useState(null);
  const [focus, setFocus] = useState(0);

  /**
   * @description On idSection arrival, set coteries
   */
  useEffect(() => {
    if (idSection) {
      getCoteriesBySection(idSection).then((res) => setCoteries(res));
    }
  }, [idSection]);

  const updateCoterie = (newCoterie) => {
    let newCoteries = [...coteries];
    newCoteries[focus] = newCoterie;
    setCoteries(newCoteries);
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
      {coteries && (
        <Coterie
          coterie={coteries[focus]}
          handleForth={goForth}
          handleBack={goBack}
          updateCoterie={updateCoterie}
        />
      )}
    </section>
  );
};

export default CoteriesSlider;
