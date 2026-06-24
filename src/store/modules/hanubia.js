export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:155px",
        left: "left:647px",
        requiredLogic: [
          {
            type: ["morphBall", "powerBomb", "grappleBeam", "waveBeam"],
          },
        ],
        logic: [
          {
            type: ["speedBooster"],
            counter: 0,
          },
          {
            type: ["spaceJump"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:269px",
        left: "left:573px",
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam", "screwAttack"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
            counter: 0,
          },
          {
            type: ["crossBomb"],
            counter: 0,
          },
          {
            type: ["powerBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:216px",
        left: "left:667px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster", "screwAttack", "waveBeam"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
            counter: 0,
          },
          {
            type: ["crossBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "power",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:282px",
        left: "left:829px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster", "screwAttack"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
            counter: 0,
          },
          {
            type: ["crossBomb"],
            counter: 0,
          },
          {
            type: ["powerBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
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
