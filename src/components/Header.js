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
          .eq("joueur_id", props.userID);
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
    <header className={"bg-blue-800 h-20 flex items-center justify-between"}>
      <h2 className={"text-3xl font-semibold ml-8 text-white"}>
        Bienvenue, seigneur {name}
      </h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white mr-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        />
      </svg>
    </header>
  );
};

export default Header;
