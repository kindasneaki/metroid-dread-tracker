export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:69px",
        left: "left:737px",
        //crossBomb needed
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:29px",
        left: "left:521px",
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:89px",
        left: "left:551px",
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:134px",
        left: "left:589px",
      },
      {
        //TODO
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:153px",
        left: "left:599px",
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:216px",
        left: "left:374px",
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:321px",
        left: "left:115px",
        trick: "IBJ + flashShift",
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:350px",
        left: "left:211px",
      },
      {
        area: "9",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:260px",
        left: "left:395px",
      },
      {
        area: "10",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:339px",
        left: "left:439px",
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:302px",
        left: "left:345px",
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:12px",
        left: "left:560px",
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:173px",
        left: "left:403px",
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:78px",
        left: "left:453px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:12px",
        left: "left:432px",
      },
      {
        area: "blueEMMI",
        checked: false,
        type: "iceMissiles",
        amount: 1,
        top: "margin-top:100px",
        left: "left:200px",
      },
      {
        area: "pulse",
        checked: false,
        type: "pulseRadar",
        amount: 1,
        top: "margin-top:74px",
        left: "left:495px",
      },
      {
        area: "super",
        checked: false,
        type: "superMissiles",
        amount: 1,
        top: "margin-top:357px",
        left: "left:297px",
      },
      {
        area: "spin",
        checked: false,
        type: "spinBoost",
        amount: 1,
        top: "margin-top:188px",
        left: "left:481px",
      },
      {
        area: "cross",
        checked: false,
        type: "crossBomb",
        amount: 1,
        top: "margin-top:78px",
        left: "left:644px",
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
