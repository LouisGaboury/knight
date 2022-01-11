import { useEffect, useState, Fragment } from "react";
import { getSectionByUser } from "../services/supabase/supabase";
import { supabase } from "../supabaseClient";
import { Section as SectionClass } from "../services/supabase/classes";
import CoteriesSlider from "./CoteriesSlider";
import MissionsSlider from "./MissionsSlider";

const Section = () => {
  const [section, setSection] = useState(new SectionClass());

  useEffect(() => {
    getSectionByUser(supabase.auth.user().id).then((res) => setSection(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="w-4/5 shadow-md bg-gray-100 mx-auto mt-8">
        <h3 className="text-6xl pt-4 mb-8 text-center">{section.name}</h3>
        <p>
          Ici on affichera les diverses infos relatives à la section : RG,
          objets possédés, etc. Ca sera fixe
        </p>
        <hr className="border-2 border-solid" />
        <CoteriesSlider idSection={section.id} />
      </div>
      <div className="w-4/5 shadow-md bg-gray-100 mx-auto mt-8">
        <h3 className="text-6xl pt-4 mb-8 text-center">Missions libres</h3>
        <MissionsSlider section={section} />
      </div>
    </Fragment>
  );
};

export default Section;
