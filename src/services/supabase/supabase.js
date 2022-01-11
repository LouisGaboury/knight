import { supabase } from "../../supabaseClient";
import { Section, Coterie, Seneschal, Mission } from "./classes";

/**
 * @async
 * @description Permet de retrouver un Lord en fonction de l'utilisateur
 * @param {string} userID ID de l'utilisateur
 * @returns Un objet Lord
 */
export async function findLordByUser(userID) {
  try {
    // Trouve le bon lord dans la BDD
    const { data: lord, error } = await supabase
      .from("lord")
      .select("*")
      .eq("joueur_id", userID);
    // Fixe le nom du lord dans le state pour affichage
    if (error) throw error;
    return lord[0];
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Retourne le nom et l'ID d'une section à partir de l'ID d'un joueur
 * @param {string} userID ID du joueur
 * @returns {Promise<Section>} Une Section du Knight
 */
export async function getSectionByUser(userID) {
  try {
    // cherche la section du joueur dans la BDD selon son ID
    const { data, error } = await supabase
      .from("lord")
      .select("name, lord_id:section ( name, id, overview, lord_id )")
      .eq("joueur_id", userID);
    if (error) throw error;
    // retourne le nom et l'id de la section du joueur
    return new Section(
      data[0].lord_id[0].id,
      data[0].lord_id[0].name,
      data[0].lord_id[0].overview,
      data[0].lord_id[0].lord_id
    );
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Retrouve les coteries liées à l'ID d'une section
 * @param {number} sectionID ID de la section dans les tables Supabase
 * @returns {Promise<Coterie[]>} Un tableau de coteries
 */
export async function getCoteriesBySection(sectionID) {
  try {
    const { data, error } = await supabase
      .from("coterie")
      .select()
      .eq("section_id", sectionID);
    if (error) throw error;
    const coteries = [];
    data.forEach((coterie) => {
      coteries.push(
        new Coterie(
          coterie.id,
          coterie.section_id,
          coterie.seneschal_id,
          coterie.rank,
          coterie.health,
          coterie.hope,
          coterie.xp
        )
      );
    });
    return coteries;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Retourne les coteries d'une section qui ne sont pas encore sur une mission
 * @param {number} sectionID ID de la section dans les tables Supabase
 * @returns {Promise<Coterie[]>} Un tableau de coteries
 */
export async function getFreeCoteriesBySection(sectionID) {
  try {
    const { data: coteries, error } = await supabase
      .from(`free_coteries`)
      .select("*, seneschal(id, name)")
      .eq("section_id", sectionID);
    if (error) throw error;
    return coteries;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Permet de trouver un sénéchal par l'ID de sa section
 * @param {number} seneschalID L'ID du sénéchal recherché
 * @returns {Promise<Seneschal>} L'objet Seneschal entier
 */
export async function getSeneschalByID(seneschalID) {
  try {
    const { data, error } = await supabase
      .from("seneschal")
      .select()
      .eq("id", seneschalID);
    if (error) throw error;
    return new Seneschal(
      data[0].id,
      data[0].name,
      data[0].weapons,
      data[0].modules,
      data[0].armor
    );
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Retrouve les missions à partir de l'ID de la coterie qui les a réalisé/les réalise
 * @param {number} coterieID ID de la coterie dans les tables Supabase
 * @returns {Promise<Mission[]>} Un tableau de missions
 */
export async function getMissionsByCoterie(coterieID) {
  try {
    const { data, error } = await supabase
      .from("mission")
      .select()
      .eq("coterie_id", coterieID);
    if (error) throw error;
    const missions = [];
    data.forEach((mission) => {
      missions.push(
        new Mission(
          mission.id,
          mission.faction_id,
          mission.coterie_id,
          mission.title,
          mission.description,
          mission.status,
          mission.latitude,
          mission.longitude,
          mission.difficulty,
          mission.reward
        )
      );
    });
    return missions;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Retourne toutes les missions non-assignées à une coterie
 * @returns {Promise<Mission[]>} La promesse d'un tableau de missions
 */
export async function getFreeMissions() {
  try {
    const { data, error } = await supabase
      .from("mission")
      .select()
      .is("coterie_id", null);
    if (error) throw error;
    const missions = [];
    data.forEach((mission) => {
      missions.push(
        new Mission(
          mission.id,
          mission.faction_id,
          mission.coterie_id,
          mission.title,
          mission.description,
          mission.status,
          mission.latitude,
          mission.longitude,
          mission.difficulty,
          mission.reward
        )
      );
    });
    return missions;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Retourne toutes les missions
 * @returns {Promise<Mission[]>} La promesse d'un tableau de missions
 */
export async function getMissions() {
  try {
    const { data, error } = await supabase.from("mission").select();
    if (error) throw error;
    const missions = [];
    data.forEach((mission) => {
      missions.push(
        new Mission(
          mission.id,
          mission.faction_id,
          mission.coterie_id,
          mission.title,
          mission.description,
          mission.status,
          mission.latitude,
          mission.longitude,
          mission.difficulty,
          mission.reward
        )
      );
    });
    return missions;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Retire une coterie engagée sur une mission
 * @param {number} missionID L'ID de la mission à annulée
 */
export async function cancelMission(missionID) {
  try {
    const { error } = await supabase
      .from("mission")
      .update({ coterie_id: null, status: "Libre" })
      .match({ id: missionID });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Assigne une coterie à une mission
 * @param {number} missionID l'ID de la mission
 * @param {number} coterieID l'ID de la coterie
 */
export async function assignMission(missionID, coterieID) {
  try {
    const { error } = await supabase
      .from("mission")
      .update({ coterie_id: coterieID, status: "En cours" })
      .match({ id: missionID });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Donne 10px de plus à une coterie. Si elle atteint 100 px : lui donne un niveau de plus
 * @param {number} coterieID ID de la coterie à entrainer
 * @param {number} coterieXP XP de la coterie qui est entrainée
 * @param {number} coterieRank Rank de la coterie (rookie, vétérans, élite)
 * @returns {Promise<Coterie>} La coterie avec les valeurs mises à jour
 */
export async function trainCoterie(coterieID, coterieXP, coterieRank) {
  try {
    // Si la coterie ne passe pas de niveau
    if (coterieXP < 90) {
      const { data, error } = await supabase
        .from("coterie")
        .update({ xp: coterieXP + 10 })
        .match({ id: coterieID });
      if (error) throw error;
      return data[0];
      // Si la coterie passe au rang supérieur
    } else {
      if (coterieRank === "rookie") {
        // rookie -> vétérans
        const { data, error } = await supabase
          .from("coterie")
          .update({ xp: 0, rank: "vétérans" })
          .match({ id: coterieID });
        if (error) throw error;
        return data[0];
      } else {
        // vétarans -> élites
        const { data, error } = await supabase
          .from("coterie")
          .update({ xp: 0, rank: "élite" })
          .match({ id: coterieID });
        if (error) throw error;
        return data[0];
      }
    }
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Rend 20 HP à une coterie et renvoie les valeurs modifiées
 * @param {number} coterieID ID de la coterie qui se repose
 * @param {number} coterieHP HP de la coterie avant repos
 * @returns {Promise<>}
 */
export async function restCoterie(coterieID, coterieHP) {
  try {
    if (coterieHP <= 80) {
      const { data, error } = await supabase
        .from("coterie")
        .update({ health: coterieHP + 20 })
        .match({ id: coterieID });
      if (error) throw error;
      return data[0];
    } else {
      // Si la coterie allait dépasser 100HP : ramenés à 100 automatiquement
      const { data, error } = await supabase
        .from("coterie")
        .update({ health: 100 })
        .match({ id: coterieID });
      if (error) throw error;
      return data[0];
    }
  } catch (error) {
    alert(error.error_description || error.message);
  }
}
