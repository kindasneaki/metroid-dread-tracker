export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:73px",
        left: "left:921px",
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:216px",
        left: "left:897px",
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:126px",
        left: "left:773px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:147px",
        left: "left:982px",
      },
      {
        area: "plasma",
        checked: false,
        type: "plasmaBeam",
        amount: 1,
        top: "margin-top:229px",
        left: "left:863px",
      },
    ],
  },
  mutations: {
    /**
     * Set locations[i].checked = true for each index in the indices array.
     * ABSOLUTE-SET semantics for restore (PER-01).
     */
    SET_LOCATIONS(state, indices) {
      for (let i = 0; i < state.locations.length; i++) {
        state.locations[i].checked =
          Array.isArray(indices) && indices.includes(i);
      }
    },
    /**
     * Reset all locations to unchecked (for resetProgress).
     */
    RESET_LOCATIONS(state) {
      for (const loc of state.locations) {
        loc.checked = false;
      }
    },
  },
  namespaced: true,
};
