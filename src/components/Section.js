import { useEffect, useState } from "react";
import { findSection } from "../services/supabase/supabase";
import { Section as SectionClass } from "../services/supabase/classes";
import Coterie from "./Coterie";

const Section = (props) => {
  const [section, setSection] = useState(new SectionClass());

  useEffect(() => {
    findSection(props.userID).then((res) => setSection(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-4/5 shadow-md bg-gray-100 mx-auto mt-8">
      <h3 className="text-6xl pt-4 mb-8 text-center">{section.name}</h3>
      <p>
        Ici on affichera les diverses infos relatives à la section : RG, objets
        possédés, etc. Ca sera fixe
      </p>
      <hr className="border-2 border-solid" />
      <Coterie idSection={section.id} />
    </div>
  );
};

export default Section;
