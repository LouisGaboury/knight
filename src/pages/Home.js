import { Fragment, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";
import Coteries from "../components/Coteries";

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

  const displayLoading = () => {
    return <Fragment />;
  };

  const displayLoaded = () => {
    return (
      <Fragment>
        <Header userID={user.id} />
        <Coteries userID={user.id} />
      </Fragment>
    );
  };

  return !loading ? displayLoaded() : displayLoading();
};

export default Home;
