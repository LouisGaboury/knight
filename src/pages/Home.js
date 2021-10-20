import { Fragment, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";

const Home = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(supabase.auth.user());
    // console.log(Object.keys(user));
    // console.log(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Header userID={user.id} />
      Bienvenue sur la page d'accueil de Knight
    </Fragment>
  );
};

export default Home;
