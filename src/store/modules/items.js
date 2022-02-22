export default {
  state: {
    items: [
      {
        type: "chargeBeam",
        checked: false,
        logic: false,
        icon: "../assets/logo.png",
      },
      { type: "morphBall", checked: false, logic: false },
      { type: "variaSuit", checked: false, logic: false },
      { type: "bomb", checked: false, logic: false },
      { type: "gravitySuit", checked: false, logic: false },
      { type: "spiderMagnet", checked: false, logic: false },
      { type: "grappleBeam", checked: false, logic: false },
      { type: "phantomCloak", checked: false, logic: false },
      { type: "diffusionBeam", checked: false, logic: false },
      { type: "wideBeam", checked: false, logic: false },
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
      { type: "screwAttack", checked: false, logic: false },
      { type: "slide", checked: false, logic: false },
      { type: "powerBomb", checked: false, logic: false },
    ],
  },
  mutations: {
    UPDATE_AREA(state, index) {
      state.items[index].logic = !state.items[index].logic;
    },
  },
  actions: {
    updateArea({ commit, dispatch }, { index, route }) {
      commit("UPDATE_AREA", index);
      dispatch(route + "/checkLogic", index, { root: true });
    },
  },
  getters: {
    inLogic(state) {
      return state.items;
    },
  },
  namespaced: true,
};
