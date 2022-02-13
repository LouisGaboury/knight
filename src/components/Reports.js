import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
// eslint-disable-next-line no-unused-vars
import { Coterie } from "../services/supabase/classes";
import { getCoteriesBySection } from "../services/supabase/supabase";

const Report = ({ sectionID }) => {
  const [coteries, setCoteries] = useState();

  useEffect(() => {
    if (sectionID) {
      getCoteriesBySection(sectionID).then((res) => {
        setCoteries(res);
      });
    }
  }, [sectionID]);

  return (
    <div className="ml-6">
      {coteries?.map(
        /**
         * @param {Coterie} coterie La coterie itérée
         * @param {number} index Place de la coterie dans le tableau généré
         */
        (coterie, index) => {
          return (
            <Dropdown key={index} title={`Coterie n°${coterie.id} ❤️`}>
              <p>Ceci est un test de texte</p>
              <p>Et ça c'en est un autre</p>
              <p>Pour meubler le dropdown</p>
            </Dropdown>
          );
        }
      )}
    </div>
  );
};

export default Report;
