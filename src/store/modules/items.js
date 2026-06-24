export default {
  state: {
    minorItems: [
      {
        type: "smallMissiles",
        name: "Missiles + 2",
        amount: 2,
        total: 15,
        startAmount: 15,
      },
      {
        type: "bigMissiles",
        name: "Missiles + 10",
        amount: 10,
        startAmount: 15,
      },
      {
        type: "energyPart",
        name: "Energy Part",
        total: 0,
        amount: 1,
        startAmount: 0,
      },
      {
        type: "energyFull",
        name: "Energy Full",
        total: 0,
        amount: 1,
        startAmount: 0,
      },
      {
        type: "smallPowerBomb",
        name: "Powerbomb + 1",
        total: 0,
        amount: 1,
        startAmount: 0,
      },
    ],
    items: [
      {
        type: "morphBall",
        name: "Morph Ball",
        checked: false,
        logic: false,
      },
      {
        type: "slide",
        name: "Slide",
        checked: true,
        logic: true,
      },

      {
        type: "bomb",
        name: "Bomb",
        checked: false,
        logic: false,
      },
      {
        type: "crossBomb",
        name: "Cross Bomb",
        checked: false,
        logic: false,
      },
      {
        type: "powerBomb",
        name: "Main Power Bomb",
        checked: false,
        logic: false,
      },
      {
        type: "chargeBeam",
        name: "Charge Beam",
        checked: false,
        logic: false,
      },
      {
        type: "diffusionBeam",
        name: "Diffusion Beam",
        checked: false,
        logic: false,
      },
      {
        type: "variaSuit",
        name: "Varia Suit",
        checked: false,
        logic: false,
      },
      {
        type: "gravitySuit",
        name: "Gravity Suit",
        checked: false,
        logic: false,
      },
      {
        type: "spiderMagnet",
        name: "Spider Magnet",
        checked: false,
        logic: false,
      },
      {
        type: "grappleBeam",
        name: "Grapple Beam",
        checked: false,
        logic: false,
      },
      {
        type: "phantomCloak",
        name: "Phantom Cloak",
        checked: false,
        logic: false,
      },
      {
        type: "flashShift",
        name: "Flash Shift",
        checked: false,
        logic: false,
      },
      {
        type: "pulseRadar",
        name: "Pulse Radar",
        checked: false,
        logic: false,
      },
      {
        type: "wideBeam",
        name: "Wide Beam",
        checked: false,
        logic: false,
      },
      {
        type: "plasmaBeam",
        name: "Plasma Beam",
        checked: false,
        logic: false,
      },
      {
        type: "waveBeam",
        name: "Wave Beam",
        checked: false,
        logic: false,
      },
      {
        type: "speedBooster",
        name: "Speed Booster",
        checked: false,
        logic: false,
      },

      {
        type: "superMissiles",
        name: "Super Missiles",
        checked: false,
        logic: false,
      },

      {
        type: "iceMissiles",
        name: "Ice Missiles",
        checked: false,
        logic: false,
      },
      {
        type: "stormMissiles",
        name: "Storm Missiles",
        checked: false,
        logic: false,
      },

      {
        type: "spinBoost",
        name: "Spin Boost",
        checked: false,
        logic: false,
      },

      {
        type: "spaceJump",
        name: "Space Jump",
        checked: false,
        logic: false,
      },
      {
        type: "screwAttack",
        name: "Screw Attack",
        checked: false,
        logic: false,
      },
    ],
    xDefeated: {
      type: "releaseTheX",
      name: "Release The X",
      checked: false,
      logic: false,
    },

    progressiveLogic: [
      {
        type: "progressiveBomb",
        logic: false,
      },
      {
        type: "progressiveBeam",
        logic: false,
      },
      {
        type: "progressiveCharge",
        logic: false,
      },
      {
        type: "progressiveSuit",
        logic: false,
      },
      {
        type: "progressiveJump",
        logic: false,
      },
      {
        type: "movement",
        logic: false,
      },
      {
        type: "health",
        amount: 99,
        logic: false,
      },
    ],
  },
  mutations: {
    UPDATE_AREA(state, index) {
      state.items[index].logic = !state.items[index].logic;
    },
    /**
     * Set-by-value hydration for restore (PER-01/PER-02).
     * Accepts a checkedItems map { [type]: boolean } and xDefeated boolean.
     * ABSOLUTE-SET semantics — does NOT toggle; safe to call from restoreState.
     * Mirrors logic ← checked so the engine (which reads items[].logic) sees the
     * restored inventory; recompute does NOT re-derive logic from checked.
     */
    HYDRATE_ITEMS(state, { checkedItems, xDefeated }) {
      const map = checkedItems || {};
      for (const item of state.items) {
        if (Object.prototype.hasOwnProperty.call(map, item.type)) {
          item.checked = map[item.type] === true;
        } else {
          item.checked = false;
        }
        item.logic = item.checked;
      }
      if (typeof xDefeated === "boolean") {
        state.xDefeated.logic = xDefeated;
        state.xDefeated.checked = xDefeated;
      }
    },
    /**
     * Reset all items to unchecked/unlogic state (for resetProgress).
     * Retains static display data (name/type). slide starts true (default).
     */
    RESET_ITEMS(state) {
      for (const item of state.items) {
        item.checked = item.type === "slide";
        item.logic = item.type === "slide";
      }
      state.xDefeated.logic = false;
      state.xDefeated.checked = false;
    },
    UPDATE_PROGRESSIVE(state, index) {
      if (index) {
        state.progressiveLogic[index] = true;
      }
    },
    SET_MISSILES(state, { amount }) {
      state.minorItems[0].total += amount;
    },
    SET_ABILITY(state, { index, amount }) {
      state.minorItems[index].total += amount;
    },
    SET_X(state) {
      state.xDefeated.logic = !state.xDefeated.logic;
    },
    ROTATE_ENERGY(state) {
      state.minorItems[2].total = 0;
    },
    FIX_ENERGY(state) {
      state.minorItems[2].total += 3;
      // state.minorItems[3].total -= 1;
    },
    PREVENT_NEGATIVE(state, index) {
      state.minorItems[index].total = state.minorItems[index].startAmount;
    },
  },
  actions: {
    updateX({ commit }) {
      commit("SET_X");
    },
    updateArea({ commit, dispatch }, { index }) {
      commit("UPDATE_AREA", index);
      dispatch("logic/recompute", null, { root: true });
    },
    checkProgressive({ commit, state }) {
      let index = null;
      if (state.items[0].checked) {
        index = 0;
      }
      commit("UPDATE_PROGRESSIVE", index);
    },
    updateMinor({ commit, state }, { index, amount }) {
      if (
        state.minorItems[index].type === "smallMissiles" ||
        state.minorItems[index].type === "bigMissiles"
      ) {
        let total = state.minorItems[0].total + amount;
        if (state.minorItems[0].startAmount >= total) {
          commit("PREVENT_NEGATIVE", 0);
          amount = 0;
        }
        commit("SET_MISSILES", { amount });
      } else {
        if (state.minorItems[index].type === "energyPart") {
          let result = state.minorItems[2].total + amount;
          if (result === 4) {
            index = 3;
            commit("ROTATE_ENERGY");
          } else if (result === -1) {
            if (state.minorItems[3].total > 0) {
              commit("FIX_ENERGY");
              index = 3;
            }
          }
        }
        if (
          state.minorItems[index].total <=
            state.minorItems[index].startAmount &&
          amount < 0
        ) {
          commit("PREVENT_NEGATIVE", index);
          amount = 0;
        }
        commit("SET_ABILITY", { index, amount });
      }
    },
  },
  getters: {
    inLogic(state) {
      return state.items;
    },
    checkX(state) {
      return state.xDefeated.logic;
    },
  },
  namespaced: true,
};
