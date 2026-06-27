export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:219px",
        left: "left:360px",
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:225px",
        left: "left:391px",
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:168px",
        left: "left:304px",
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:169px",
        left: "left:414px",
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:164px",
        left: "left:737px",
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:248px",
        left: "left:963px",
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:102px",
        left: "left:365px",
      },
      {
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:327px",
        left: "left:427px",
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:344px",
        left: "left:672px",
        trick: "walljump with flashshift",
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:179px",
        left: "left:688px",
      },
      {
        area: "3ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:253px",
        left: "left:305px",
      },
      {
        area: "4ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:280px",
        left: "left:907px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:156px",
        left: "left:547px",
      },
      {
        area: "2pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:310px",
        left: "left:546px",
      },
      {
        area: "space",
        checked: false,
        type: "spaceJump",
        amount: 2,
        top: "margin-top:160px",
        left: "left:394px",
      },
      {
        area: "storm",
        checked: false,
        type: "stormMissiles",
        amount: 2,
        top: "margin-top:303px",
        left: "left:907px",
      },
      {
        area: "wave",
        checked: false,
        type: "waveBeam",
        amount: 2,
        top: "margin-top:121px",
        left: "left:1003px",
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
