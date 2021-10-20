import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Header = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(props.userID);
    async function findLord() {
      try {
        const { data, error } = await supabase
          .from("lord")
          .select("name")
          .eq("joueur", props.userID);
        setName(data[0].name);
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    }
    findLord();
  }, []);

  return (
    <header>
      <p>Bienvenue, seigneur {name}</p>
    </header>
  );
};

export default Header;
