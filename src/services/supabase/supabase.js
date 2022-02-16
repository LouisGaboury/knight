import { supabase } from "../../supabaseClient";
import { Section, Coterie, Seneschal, Mission } from "./classes";

// LORD

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
      .eq("joueur_id", userID)
      .limit(1)
      .single();
    // Fixe le nom du lord dans le state pour affichage
    if (error) throw error;
    return lord;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

// SECTION

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
      .eq("joueur_id", userID)
      .limit(1)
      .single();
    if (error) throw error;
    // retourne le nom et l'id de la section du joueur
    return new Section(
      data.lord_id[0].id,
      data.lord_id[0].name,
      data.lord_id[0].overview,
      data.lord_id[0].lord_id
    );
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Set the section's activity to true
 * @param {number} sectionID Section's id
 * @returns {boolean} Operation succeed
 */
export async function confirmActivity(sectionID) {
  try {
    const { error } = await supabase
      .from("section")
      .update({ active: true }, { returning: "minimal" })
      .eq("id", sectionID);
    if (error) throw error;
    return true;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

// COTERIE

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
          coterie.xp,
          coterie.active
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
      const { data: coterie, error } = await supabase
        .from("coterie")
        .update({ xp: coterieXP + 10, active: true })
        .match({ id: coterieID })
        .limit(1)
        .single();
      if (error) throw error;
      return coterie;
      // Si la coterie passe au rang supérieur
    } else {
      if (coterieRank === "rookie") {
        // rookie -> vétérans
        const { data: coterie, error } = await supabase
          .from("coterie")
          .update({ xp: 0, rank: "vétérans", active: true })
          .match({ id: coterieID })
          .limit(1)
          .single();
        if (error) throw error;
        return coterie;
      } else {
        // vétarans -> élites
        const { data: coterie, error } = await supabase
          .from("coterie")
          .update({ xp: 0, rank: "élite", active: true })
          .match({ id: coterieID })
          .limit(1)
          .single();
        if (error) throw error;
        return coterie;
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
      const { data: coterie, error } = await supabase
        .from("coterie")
        .update({ health: coterieHP + 20, active: true })
        .match({ id: coterieID })
        .limit(1)
        .single();
      if (error) throw error;
      return coterie;
    } else {
      // Si la coterie allait dépasser 100HP : ramenés à 100 automatiquement
      const { data: coterie, error } = await supabase
        .from("coterie")
        .update({ health: 100, active: true })
        .match({ id: coterieID })
        .limit(1)
        .single();
      if (error) throw error;
      return coterie;
    }
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Set a coterie to active
 * @param {number} coterieID Coterie's ID
 * @returns {boolean} The operation is successful or not
 */
export async function setActive(coterieID) {
  try {
    const { error } = await supabase
      .from("coterie")
      .update({ active: true }, { returning: "minimal" })
      .eq("id", coterieID);
    if (error) throw error;
    return true;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Set a coterie to inactive
 * @param {number} coterieID Coterie's ID
 * @returns {boolean} The operation is successful or not
 */
export async function setInactive(coterieID) {
  try {
    const { error } = await supabase
      .from("coterie")
      .update({ active: false }, { returning: "minimal" })
      .eq("id", coterieID);
    if (error) throw error;
    return true;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

// SENESCHAL

/**
 * @async
 * @description Permet de trouver un sénéchal par l'ID de sa section
 * @param {number} seneschalID L'ID du sénéchal recherché
 * @returns {Promise<Seneschal>} L'objet Seneschal entier
 */
export async function getSeneschalByID(seneschalID) {
  try {
    const { data: seneschal, error } = await supabase
      .from("seneschal")
      .select()
      .eq("id", seneschalID)
      .limit(1)
      .single();
    if (error) throw error;
    return new Seneschal(
      seneschal.id,
      seneschal.name,
      seneschal.weapons,
      seneschal.modules,
      seneschal.armor
    );
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

// MISSION

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
 * @param {number} missionID L'ID de la mission
 * @param {number} coterieID l'ID de la coterie
 * @returns {boolean} L'opération est un succès
 */
export async function cancelMission(missionID, coterieID) {
  try {
    const { error } = await supabase
      .from("mission")
      .update({ coterie_id: null, status: "Libre" }, { returning: "minimal" })
      .match({ id: missionID });
    if (error) throw error;
    setInactive(coterieID);
    return true;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}

/**
 * @async
 * @description Assigne une coterie à une mission
 * @param {number} missionID l'ID de la mission
 * @param {number} coterieID l'ID de la coterie
 * @returns {boolean} L'opération est un succès
 */
export async function assignMission(missionID, coterieID) {
  try {
    const { error } = await supabase
      .from("mission")
      .update(
        { coterie_id: coterieID, status: "En cours" },
        { returning: "minimal" }
      )
      .match({ id: missionID })
      .is("coterie_id", null);
    if (error) throw error;
    setActive(coterieID);
    return true;
  } catch (error) {
    alert("La mission a déjà été pourvue par quelqu'un d'autre");
  }
}

// REPORT

/**
 * @async
 * @description Retourne les rapports d'une coterie
 * @param {number} coterieID
 */
export async function getReportsByCoterie(coterieID) {
  try {
    const { data, error } = await supabase
      .from("report")
      .select()
      .order("day", { ascending: false })
      .eq("coterie_id", coterieID)
      .limit(10);
    if (error) throw error;
    return data;
  } catch (error) {
    alert(error.error_description || error.message);
  }
}
