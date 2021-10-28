import { Fragment, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";
import Section from "../components/Section";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.user());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {user && (
        <Fragment>
          <Header userID={user.id} />
          <Section userID={user.id} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
