import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { findLordByUser } from "../services/supabase/supabase";
import { Link } from "react-router-dom";

const Header = () => {
  const [lord, setLord] = useState("");

  useEffect(() => {
    findLordByUser(supabase.auth.user().id).then((res) => {
      setLord(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={"bg-blue-800 h-20 flex items-center justify-between"}>
      <h2 className={"text-3xl font-semibold ml-8 text-white"}>
        Bienvenue, seigneur {lord?.name}
      </h2>
      <nav className="flex justify-evenly text-lg text-white font-semibold w-1/3">
        <Link to="/map" className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="hidden lg:inline">Carte du monde</span>
        </Link>
        <Link to="/shop" className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="hidden lg:inline">Achats de section</span>
        </Link>
      </nav>
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
