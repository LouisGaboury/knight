import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const MissionsListenerContext = React.createContext();

export function MissionsContext({ children }) {
  const [freeMissions, setFreeMissions] = useState([]);

  useEffect(() => {
    subscribeFreeMissions();
  }, []);

  /**
   * @description Ouvre un lien websocket avec la BDD - mission
   */
  const subscribeFreeMissions = () => {
    try {
      const missionListener = supabase
        .from("mission")
        .on("UPDATE", (payload) => {
          console.log("Premier tableau", freeMissions);
          let newFreeMissions = [...freeMissions];
          let updatedMission = newFreeMissions.find(
            (mission) => mission.id === payload.new.id
          );
          updatedMission = payload.new;
          setFreeMissions(newFreeMissions);
          console.log("Nouveau tableau", freeMissions);
        })
        .subscribe();
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <MissionsListenerContext.Provider value={freeMissions}>
      {children}
    </MissionsListenerContext.Provider>
  );
}
