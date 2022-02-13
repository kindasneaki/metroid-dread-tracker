export default {
  state: {
    items: [
      { type: "chargeBeam", checked: false },
      { type: "morphBall", checked: false },
      { type: "variaSuit", checked: false },
      { type: "bomb", checked: false },
      { type: "gravitySuit", checked: false },
      { type: "spiderMagnet", checked: false },
      { type: "grabbleBeam", checked: false },
      { type: "phantomCloak", checked: false },
      { type: "diffusionBeam", checked: false },
      { type: "wideBeam:", checked: false },
      { type: "speedBooster", checked: false },
      { type: "flashShift", checked: false },
      { type: "stormMissiles", checked: false },
      { type: "superMissiles", checked: false },
      { type: "pulseRadar", checked: false },
      { type: "iceMissiles", checked: false },
      { type: "crossBomb", checked: false },
      { type: "spinBoost", checked: false },
      { type: "waveBeam", checked: false },
      { type: "plasmaBeam", checked: false },
      { type: "spaceJump", checked: false },
    ],
  },
  mutations: {
    UPDATE_AREA(state, location, index) {
      !this.locations[index].checked;
    },
  },
  actions: {
    updateArea({ commit }, location, index) {
      console.log(location, index);
      commit("UPDATE_AREA", location, index);
    },
  },
  namespaced: true,
};
