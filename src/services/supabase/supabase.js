import { supabase } from "../../supabaseClient";
import { Section, Coterie } from "./classes";

/**
 * @async
 * @description Retourne le nom et l'ID d'une section à partir de l'ID d'un joueur
 * @param {string} userID ID du joueur
 * @returns {Promise<Section>} Une Section du Knight
 */
export async function findSection(userID) {
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
 * @param {number} sectionID
 * @returns {Promise<Coterie[]>}
 */
export async function findCoteries(sectionID) {
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
