import { Fragment, useState, useEffect } from "react";
import MissionsSlider from "../components/missions/MissionsSlider";
import Reports from "../components/reports/Reports";
import Header from "../components/Header";
import Section from "../components/Section";
import { supabase } from "../supabaseClient";
import { getSectionByUser } from "../services/supabase/supabase";

const Home = () => {
  const [section, setSection] = useState(null);

  useEffect(() => {
    getSectionByUser(supabase.auth.user().id).then((res) => setSection(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Header />
      <Section section={section} />
      <div className="w-4/5 shadow-md bg-gray-100 mx-auto mt-8">
        <h3 className="text-6xl pt-4 mb-8 text-center">Missions libres</h3>
        {section && <MissionsSlider section={section} />}
      </div>
      <div className="w-4/5 shadow-md bg-gray-100 mx-auto my-8">
        <h3 className="text-6xl pt-4 mb-8 text-center">Rapports</h3>
        <Reports sectionID={section?.id} />
      </div>
    </Fragment>
  );
};

export default Home;
