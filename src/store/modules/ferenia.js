export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:163px",
        left: "left:307px",
        requiredLogic: [
          {
            type: ["morphBall", "spaceJump", "chargeBeam", "diffusionBeam"],
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
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:216px",
        left: "left:363px",
        requiredLogic: [
          {
            type: ["morphBall", "spinBoost"],
          },
          {
            type: ["morphBall", "spaceJump"],
          },
        ],
        logic: [
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
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:221px",
        left: "left:394px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["powerBomb"],
            counter: 0,
          },
          {
            type: ["stormMissiles", "bomb"],
            counter: 0,
          },
          {
            type: ["stormMissiles", "crossBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:169px",
        left: "left:414px",
        requiredLogic: [
          {
            type: ["morphBall", "spinBoost"],
          },
          {
            type: ["morphBall", "spaceJump"],
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
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:164px",
        left: "left:737px",
        logic: [
          {
            type: [
              "morphBall",
              "speedBooster",
              "gravitySuit",
              "grappleBeam",
              "plasmaBeam",
            ],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:248px",
        left: "left:963px",
        softlock: true,
        logic: [
          {
            type: ["morphBall"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:102px",
        left: "left:365px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster"],
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
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:327px",
        left: "left:427px",
        softlock: true,
        logic: [
          {
            type: ["morphBall", "speedBooster"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:344px",
        left: "left:672px",
        trick: "walljump with flashshift",
        requiredLogic: [
          {
            type: ["morphBall", "spinBoost"],
          },
          {
            type: ["morphBall", "spaceJump"],
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
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:179px",
        left: "left:688px",
        requiredLogic: [
          {
            type: ["morphBall", "screwAttack", "grappleBeam"],
          },
        ],
        logic: [
          {
            type: ["crossBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "3ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:253px",
        left: "left:305px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster"],
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
        area: "4ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:280px",
        left: "left:907px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall"],
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
        top: "margin-top:156px",
        left: "left:547px",
        logic: [
          {
            type: ["morphBall", "powerBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "2pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:310px",
        left: "left:546px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall", "powerBomb", "flashShift"],
          },
        ],
        logic: [
          {
            type: ["spaceJump"],
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
        area: "space",
        checked: false,
        type: "spaceJump",
        amount: 2,
        top: "margin-top:160px",
        left: "left:394px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["stormMissiles"],
            counter: 0,
          },
          {
            type: ["spaceJump", "waveBeam"],
            counter: 0,
          },
          {
            type: ["gravitySuit", "waveBeam"],
            counter: 0,
          },
          {
            type: ["crossBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["crossBomb", "spaceJump"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "storm",
        checked: false,
        type: "stormMissiles",
        amount: 2,
        top: "margin-top:303px",
        left: "left:907px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall"],
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
        area: "wave",
        checked: false,
        type: "waveBeam",
        amount: 2,
        top: "margin-top:121px",
        left: "left:1003px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall", "gravitySuit", "chargeBeam", "spaceJump"],
          },
        ],
        logic: [
          {
            type: ["diffusionBeam", "bomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["diffusionBeam", "crossBomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["waveBeam", "bomb"],
            counter: 0,
          },
          {
            type: ["waveBeam", "crossBomb"],
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
