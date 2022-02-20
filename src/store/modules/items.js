export default {
  state: {
    items: [
      { type: "chargeBeam", checked: false, logic: false },
      { type: "morphBall", checked: false, logic: false },
      { type: "variaSuit", checked: false, logic: false },
      { type: "bomb", checked: false, logic: false },
      { type: "gravitySuit", checked: false, logic: false },
      { type: "spiderMagnet", checked: false, logic: false },
      { type: "grabbleBeam", checked: false, logic: false },
      { type: "phantomCloak", checked: false, logic: false },
      { type: "diffusionBeam", checked: false, logic: false },
      { type: "wideBeam:", checked: false, logic: false },
      { type: "speedBooster", checked: false, logic: false },
      { type: "flashShift", checked: false, logic: false },
      { type: "stormMissiles", checked: false, logic: false },
      { type: "superMissiles", checked: false, logic: false },
      { type: "pulseRadar", checked: false, logic: false },
      { type: "iceMissiles", checked: false, logic: false },
      { type: "crossBomb", checked: false, logic: false },
      { type: "spinBoost", checked: false, logic: false },
      { type: "waveBeam", checked: false, logic: false },
      { type: "plasmaBeam", checked: false, logic: false },
      { type: "spaceJump", checked: false, logic: false },
    ],
  },
  mutations: {
    UPDATE_AREA(state, index) {
      state.items[index].logic = !state.items[index].logic;
    },
  },
  actions: {
    updateArea({ commit }, { index, route }) {
      commit("UPDATE_AREA", index);
      console.log(route);
      // dispatch("artaria/updateArea", { index }, { root: true });
    },
  },
  namespaced: true,
};
