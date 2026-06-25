export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:191px",
        left: "left:342px",
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:240px",
        left: "left:298px",
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:339px",
        left: "left:273px",
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:457px",
        left: "left:372px",
        trick: [{ type: ["movefastbeforewater"] }],
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:509px",
        left: "left:388px",
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:528px",
        left: "left:226px",
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:586px",
        left: "left:195px",
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:639px",
        left: "left:669px",
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:196px",
        left: "left:108px",
      },
      {
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:669px",
        left: "left:424px",
      },
      {
        area: "3m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:591px",
        left: "left:155px",
        //flashshift or gravitysuit
      },
      {
        area: "4m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:643px",
        left: "left:514px",
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:316px",
        left: "left:410px",
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:575px",
        left: "left:426px",
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:417px",
        left: "left:272px",
      },
      {
        area: "2ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:706px",
        left: "left:303px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:778px",
        left: "left:434px",
      },
      {
        area: "flash",
        checked: false,
        type: "flashShift",
        amount: 2,
        top: "margin-top:476px",
        left: "left:326px",
        //flashshift or bombtrick
      },
      {
        area: "gravity",
        checked: false,
        type: "gravitySuit",
        amount: 2,
        top: "margin-top:745px",
        left: "left:415px",
        //gravitySuit
      },
      {
        area: "drogyga",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:140px",
        left: "left:302px",
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
