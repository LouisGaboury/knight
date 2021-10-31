import { supabase } from "../../supabaseClient";
import { Section, Coterie, Seneschal, Mission } from "./classes";

/**
 * @async
 * @description Retourne le nom et l'ID d'une section à partir de l'ID d'un joueur
 * @param {string} userID ID du joueur
 * @returns {Promise<Section>} Une Section du Knight
 */
export async function getSection(userID) {
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
export async function getCoteries(sectionID) {
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
 * @description
 * @param {number} seneschalID
 * @returns {Promise<Seneschal>}
 */
export async function getSeneschal(seneschalID) {
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
export async function getMissions(coterieID) {
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
          mission.lord_id,
          mission.coterie_id,
          mission.title,
          mission.description,
          mission.status,
          mission.localisation,
          mission.difficulte
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
 * @description Donne 10px de plus à une coterie. Si elle atteint 100 px : lui donne un niveau de plus
 * @param {number} coterieID ID de la coterie à entrainer
 * @param {number} coterieXP XP de la coterie qui est entrainée
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
      return data;
      // Si la coterie passe au rang supérieur
    } else {
      if (coterieRank === "rookie") {
        const { data, error } = await supabase
          .from("coterie")
          .update({ xp: 0, rank: "vétérans" })
          .match({ id: coterieID });
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("coterie")
          .update({ xp: 0, rank: "élite" })
          .match({ id: coterieID });
        if (error) throw error;
        return data;
      }
    }
  } catch (error) {
    alert(error.error_description || error.message);
  }
}
