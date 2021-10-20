import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Header = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    async function findLord() {
      try {
        // Trouve le bon lord dans la BDD
        const { data, error } = await supabase
          .from("lord")
          .select("name")
          .eq("joueur", props.userID);
        // Fixe le nom du lord dans le state pour affichage
        setName(data[0].name);
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    }
    // Déclenche la fonction ci-dessus
    findLord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={"bg-blue-300 h-20 align-middle"}>
      <p className={"align-middle h-full"}>Bienvenue, seigneur {name}</p>
    </header>
  );
};

export default Header;
