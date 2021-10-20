import { Fragment, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";

const Home = () => {
  const [user, setUser] = useState({});
  // Loading -> empêche d'afficher tant que le user n'est pas défini
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(supabase.auth.user());
    // Une fois qu'on a le user -> on provoque l'affichage général
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {!loading ? <Header userID={user.id} /> : <Fragment />}
      Bienvenue sur la page d'accueil de Knight
    </Fragment>
  );
};

export default Home;
