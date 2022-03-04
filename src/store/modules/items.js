export default {
  state: {
    minorItems: [
      {
        type: "smallMissiles",
        amount: 2,
        total: 15,
        startAmount: 15,
      },
      {
        type: "bigMissiles",
        amount: 10,
        startAmount: 15,
      },
      {
        type: "energyPart",
        total: 0,
        amount: 1,
        startAmount: 0,
      },
      {
        type: "energyFull",
        total: 0,
        amount: 1,
        startAmount: 0,
      },
      {
        type: "smallPowerBomb",
        total: 0,
        amount: 1,
        startAmount: 0,
      },
    ],
    items: [
      {
        type: "morphBall",
        checked: false,
        logic: false,
      },
      {
        type: "slide",
        checked: false,
        logic: false,
      },

      {
        type: "bomb",
        checked: false,
        logic: false,
      },
      {
        type: "crossBomb",
        checked: false,
        logic: false,
      },
      {
        type: "powerBomb",
        checked: false,
        logic: false,
      },
      {
        type: "chargeBeam",
        checked: false,
        logic: false,
      },
      {
        type: "diffusionBeam",
        checked: false,
        logic: false,
      },
      {
        type: "variaSuit",
        checked: false,
        logic: false,
      },
      {
        type: "gravitySuit",
        checked: false,
        logic: false,
      },
      {
        type: "spiderMagnet",
        checked: false,
        logic: false,
      },
      {
        type: "grappleBeam",
        checked: false,
        logic: false,
      },
      {
        type: "phantomCloak",
        checked: false,
        logic: false,
      },
      {
        type: "flashShift",
        checked: false,
        logic: false,
      },
      {
        type: "pulseRadar",
        checked: false,
        logic: false,
      },
      {
        type: "wideBeam",
        checked: false,
        logic: false,
      },
      {
        type: "plasmaBeam",
        checked: false,
        logic: false,
      },
      {
        type: "waveBeam",
        checked: false,
        logic: false,
      },
      {
        type: "speedBooster",
        checked: false,
        logic: false,
      },

      {
        type: "superMissiles",
        checked: false,
        logic: false,
      },

      {
        type: "iceMissiles",
        checked: false,
        logic: false,
      },
      {
        type: "stormMissiles",
        checked: false,
        logic: false,
      },

      {
        type: "spinBoost",
        checked: false,
        logic: false,
      },

      {
        type: "spaceJump",
        checked: false,
        logic: false,
      },
      {
        type: "screwAttack",
        checked: false,
        logic: false,
      },
    ],
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
    ROTATE_ENERGY(state) {
      state.minorItems[2].total = 0;
    },
    FIX_ENERGY(state) {
      console.log("adf");
      state.minorItems[2].total += 3;
      // state.minorItems[3].total -= 1;
    },
    PREVENT_NEGATIVE(state, index) {
      console.log(index);
      state.minorItems[index].total = state.minorItems[index].startAmount;
    },
  },
  actions: {
    updateArea({ commit, dispatch }, { index, route }) {
      commit("UPDATE_AREA", index);
      dispatch(route + "/checkLogic", index, { root: true });
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
  },
  namespaced: true,
};
