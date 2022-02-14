import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Coterie } from "../../services/supabase/classes";
import { getCoteriesBySection } from "../../services/supabase/supabase";
import ReportsList from "./ReportsList";

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
    <div className="mx-6">
      {coteries?.map(
        /**
         * @param {Coterie} coterie La coterie itérée
         * @param {number} index Place de la coterie dans le tableau généré
         */
        (coterie, index) => {
          return (
            <div key={index}>
              <h5 className="text-xl font-medium">Coterie n°{coterie.id}</h5>
              <hr className="border border-solid border-gray-600" />
              <ReportsList coterie={coterie} />
            </div>
          );
        }
      )}
    </div>
  );
};

export default Report;
