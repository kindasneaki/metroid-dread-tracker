export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:73px",
        left: "left:304px",
        requiredLogic: [
          {
            type: ["morphBall", "gravitySuit"],
          },
        ],
        logic: [
          {
            type: ["waveBeam"],
          },
          {
            type: ["powerBomb"],
          },
          {
            type: ["speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:122px",
        left: "left:312px",
        logic: [
          {
            type: ["gravitySuit", "speedBooster", "morphBall", "screwAttack"],
          },
        ],
        inLogic: false,
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:172px",
        left: "left:266px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
          },
          {
            type: ["crossBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:170px",
        left: "left:295px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
          },
          {
            type: ["crossBomb"],
          },
          {
            type: ["powerBomb"],
          },
          {
            type: ["grappleBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:155px",
        left: "left:371px",
        logic: [
          {
            type: ["morphBall", "speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:64px",
        left: "left:461px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
          },
          {
            type: ["crossBomb"],
          },
          {
            type: ["powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:95px",
        left: "left:475px",
        requiredLogic: [
          {
            type: ["morphBall", "crossBomb"],
          },
        ],
        logic: [
          {
            type: ["speedBooster"],
          },
          {
            type: ["wideBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:172px",
        left: "left:691px",
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam", "variaSuit"],
          },
        ],
        logic: [
          {
            type: ["spinBoost", "wideBeam"],
          },
          {
            type: ["spaceJump", "wideBeam"],
          },
          {
            type: ["spinBoost", "speedBooster"],
          },
          {
            type: ["spaceJump", "speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "9",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:91px",
        left: "left:728px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam", "diffusionBeam", "chargeBeam"],
          },
          {
            type: ["spinBoost", "flashShift"],
          },
          {
            type: ["spinBoost", "diffusionBeam", "chargeBeam"],
          },
          {
            type: ["spaceJump"],
          },
          {
            type: ["grappleBeam", "speedBooster"],
          },
          {
            type: ["wideBeam", "chargeBeam", "grappleBeam"],
          },
          {
            type: ["grappleBeam", "flashShift"],
          },
        ],
        inLogic: false,
      },
      {
        area: "10",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:192px",
        left: "left:736px",
        logic: [
          {
            type: ["gravitySuit", "speedBooster", "morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "11",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:32px",
        left: "left:839px",
        softlock: true,
        logic: [
          {
            type: ["speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:210px",
        left: "left:379px",
        logic: [
          {
            type: ["morphBall", "speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:176px",
        left: "left:620px",
        requiredLogic: [
          {
            type: ["morphBall", "variaSuit"],
          },
        ],
        logic: [
          {
            type: ["wideBeam"],
          },
          {
            type: ["speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:254px",
        left: "left:303px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster"],
          },
        ],
        logic: [
          {
            type: ["chargeBeam", "diffusionBeam", "flashShift"],
          },
          {
            type: ["waveBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "3ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:74px",
        left: "left:572px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
          },
          {
            type: ["crossBomb"],
          },
          {
            type: ["powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "4ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:44px",
        left: "left:286px",
        logic: [
          {
            type: ["gravitySuit", "speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:122px",
        left: "left:464px",
        logic: [
          {
            type: ["speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:169px",
        left: "left:755px",
        requiredLogic: [
          {
            type: ["morphBall", "variaSuit"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam", "speedBooster"],
          },
          {
            type: ["spinBoost", "speedBooster"],
          },
          {
            type: ["spaceJump", "speedBooster"],
          },
          {
            type: ["grappleBeam", "wideBeam", "spinBoost"],
          },
          {
            type: ["spinBoost", "wideBeam"],
          },
          {
            type: ["spaceJump", "wideBeam"],
          },
          {
            type: ["grappleBeam", "wideBeam", "spaceJump"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:70px",
        left: "left:521px",
        requiredLogic: [
          {
            type: ["morphBall", "powerBomb"],
          },
        ],
        logic: [
          {
            type: ["speedBooster"],
          },
          {
            type: ["wideBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "3pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:210px",
        left: "left:460px",
        logic: [
          {
            type: [
              "morphBall",
              "stormMissiles",
              "crossBomb",
              "grappleBeam",
              "speedBooster",
            ],
          },
        ],
        inLogic: false,
      },
      {
        area: "wide",
        checked: false,
        type: "wideBeam",
        amount: 1,
        top: "margin-top: 119px",
        left: "left: 628px",
        softlock: true,
        logic: [
          {
            type: ["morphBall"],
          },
          {
            type: ["slide"],
          },
        ],
        inLogic: false,
      },
      {
        area: "bom",
        checked: false,
        type: "bomb",
        amount: 2,
        top: "margin-top:51px",
        left: "left:452px",
        //bomb
        softlock: true,
        logic: [
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "yellowEMMI",
        checked: false,
        type: "speedBooster",
        amount: 1,
        top: "margin-top:245px",
        left: "left:329px",
        //speedBooster
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["chargeBeam", "diffusionBeam", "flashShift"],
          },
          {
            type: ["waveBeam", "flashShift"],
          },
          {
            type: ["chargeBeam", "diffusionBeam", "wideBeam"],
          },
          {
            type: ["waveBeam"],
          },
        ],
        inLogic: false,
      },
    ],
  },
  mutations: {
    /**
     * Set locations[i].checked = true for each index in the indices array.
     * ABSOLUTE-SET semantics for restore (PER-01). Does NOT touch inLogic/softlock.
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
