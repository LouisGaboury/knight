import { useEffect, useState, useCallback, Fragment } from "react";
import { findSection, findCoteries } from "../services/supabase/supabase";
import { Section as SectionClass } from "../services/supabase/classes";
import Coterie from "./Coterie";

const Section = (props) => {
  const [section, setSection] = useState(new SectionClass());
  const [coteries, setCoteries] = useState([]);

  useEffect(() => {
    async function setRessources() {
      const newSection = await findSection(props.userID);
      const newCoteries = await findCoteries(newSection.id);
      setSection(newSection);
      setCoteries(newCoteries);
    }
    setRessources();
  }, []);

  const getCoteries = useCallback(() => {
    return coteries;
  }, [coteries]);

  return (
    <div className="h-32 w-32 shadow-md">
      <h3>{section.name}</h3>
      <Coterie getCoteries={getCoteries} />
    </div>
  );
};

export default Section;
