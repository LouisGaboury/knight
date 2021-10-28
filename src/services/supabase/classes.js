/**
 * Section présente le but et le représentant d'une section du Knight
 * @class
 * @constructor
 * @public
 */
export class Section {
  /**
   * @constructor
   * @param {number} id
   * @param {string} name
   * @param {string} overview
   * @param {number} lord_id
   */
  constructor(id, name, overview, lord_id) {
    /**
     * @type {number}
     * @public
     */
    this.id = id;
    /**
     * @type {string}
     * @public
     */
    this.name = name;
    /**
     * @type {string}
     * @public
     */
    this.overview = overview;
    /**
     * @type {number}
     * @public
     */
    this.lord_id = lord_id;
  }
}

/**
 *
 */
export class Coterie {
  /**
   * @constructor
   * @param {number} id
   * @param {number} section_id
   * @param {number} seneschal_id
   * @param {string} rank
   * @param {number} health
   * @param {number} hope
   * @param {number} xp
   */
  constructor(id, section_id, seneschal_id, rank, health, hope, xp) {
    /**
     * @type {number}
     * @public
     */
    this.id = id;
    /**
     * @type {number}
     * @public
     */
    this.section_id = section_id;
    /**
     * @type {number}
     * @public
     */
    this.seneschal_ = seneschal_id;
    /**
     * @type {string}
     * @public
     */
    this.rank = rank;
    /**
     * @type {number} Entre 0 et 100
     * @public
     */
    this.health = health;
    /**
     * @type {number} Entre 0 et 100
     * @public
     */
    this.hope = hope;
    /**
     * @type {number} Entre 0 et 100
     * @public
     */
    this.xp = xp;
  }
}

/**
 * Leader d'une coterie et son interface auprès du Knight et des instances publiques
 * @class
 * @constructor
 * @public
 */
export class Seneschal {
  /**
   * @constructor
   * @param {number} id
   * @param {string} name
   * @param {Array<Object>} weapons
   * @param {Array<Object>} modules
   * @param {string} armor
   */
  constructor(id, name, weapons, modules, armor) {
    /**
     * @type {number}
     * @public
     */
    this.id = id;
    /**
     * @type {string}
     * @public
     */
    this.name = name;
    /**
     * @type {Array<Object>}
     * @public
     */
    this.weapons = weapons;
    /**
     * @type {Array<Object>}
     * @public
     */
    this.modules = modules;
    /**
     * @type {string}
     * @public
     */
    this.armor = armor;
  }
}
