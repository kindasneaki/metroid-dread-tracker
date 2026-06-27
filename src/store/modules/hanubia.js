export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:280px",
        left: "left:569px",
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:165px",
        left: "left:648px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:226px",
        left: "left:668px",
      },
      {
        area: "power",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:282px",
        left: "left:829px",
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
