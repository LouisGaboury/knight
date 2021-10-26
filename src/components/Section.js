import { useEffect, useState, useCallback } from "react";
import { findSection, findCoteries } from "../services/supabase/supabase";
import { Section as SectionClass } from "../services/supabase/classes";
import Coterie from "./Coterie";

const Section = (props) => {
  const [section, setSection] = useState(new SectionClass());
  const [coteries, setCoteries] = useState([]);

  // Se déclenche une seule fois au chargement du composant
  // Architecture dégueulasse mais forcée par React
  useEffect(() => {
    async function setRessources() {
      const newSection = await findSection(props.userID);
      const newCoteries = await findCoteries(newSection.id);
      // Les deux fonctions ci dessous sont asynchrones
      setSection(newSection);
      setCoteries(newCoteries);
    }
    setRessources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Se déclenche dès que coteries est updated
  const getCoteries = useCallback(() => {
    return coteries;
  }, [coteries]);

  return (
    <div className="h-2/5 w-4/5 shadow-md bg-gray-100 mx-auto mt-8">
      <h3 className="text-6xl pt-4 mb-8 text-center">{section.name}</h3>
      <p>
        Ici on affichera les diverses infos relatives à la section : RG, objets
        possédés, etc. Ca sera fixe
      </p>
      <hr className="border-2 border-solid" />
      <Coterie getCoteries={getCoteries} />
    </div>
  );
};

export default Section;
