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
        logic: [
          {
            type: ["morphBall", "spaceJump", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "powerBomb"],
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
        logic: [
          {
            type: ["morphBall", "spinBoost", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "spinBoost", "powerBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "powerBomb"],
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
        logic: [
          {
            type: ["morphBall", "powerBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "stormMissiles", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "stormMissiles", "crossBomb"],
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
        logic: [
          {
            type: ["morphBall", "bomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "bomb", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "spaceJump"],
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
        top: "margin-top:155px",
        left: "left:737px",
        logic: [
          {
            type: ["morphBall", "speedBooster", "gravitySuit", "grappleBeam"],
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
        logic: [
          {
            type: ["morphBall", "speedBooster", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "powerBomb"],
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
        logic: [
          {
            type: ["morphBall", "bomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "bomb", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "spaceJump"],
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
        logic: [
          {
            type: ["morphBall", "screwAttack", "crossBomb", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "screwAttack", "powerBomb", "grappleBeam"],
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
        logic: [
          {
            type: ["morphBall", "speedBooster", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "powerBomb"],
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
        logic: [
          {
            type: ["morphBall", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb"],
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
        logic: [
          {
            type: ["morphBall", "powerBomb", "flashShift", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "flashShift", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "flashShift", "grappleBeam"],
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
        logic: [
          {
            type: ["morphBall", "stormMissiles"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "waveBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "gravitySuit", "waveBeam"],
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
        logic: [
          {
            type: [
              "morphBall",
              "gravitySuit",
              "chargeBeam",
              "diffusionBeam",
              "bomb",
              "spaceJump",
              "wideBeam",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "chargeBeam",
              "diffusionBeam",
              "crossBomb",
              "spaceJump",
              "wideBeam",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "chargeBeam",
              "waveBeam",
              "bomb",
              "spaceJump",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "chargeBeam",
              "waveBeam",
              "crossBomb",
              "spaceJump",
            ],
            counter: 0,
          },
        ],
        inLogic: false,
      },
    ],
  },
  mutations: {
    UPDATE_LOGIC(state, payload) {
      state.locations[payload.index].inLogic = payload.logic;
    },
  },
  actions: {
    checkLogic({ commit, state, rootGetters }) {
      let data = rootGetters["items/inLogic"];
      for (let i = 0; i < state.locations.length; i++) {
        // for (let k = 0; k < state.locations[i].logic.length; k++) {
        let originalLength = state.locations[i].logic.length;
        let inLogic = false;
        state.locations[i].logic.forEach((element) => {
          let logicLength = element.type.length;
          for (let k = 0; k < element.type.length; k++) {
            data.find((value) => {
              if (value.type === element.type[k]) {
                if (value.logic) {
                  element.counter++;
                  if (logicLength === element.counter) {
                    inLogic = true;
                    return true;
                  }
                }
              }
            });
          }
          for (let k = 0; k < element.type.length; k++) {
            element.counter = 0;
          }
        });

        if (originalLength === 0) {
          inLogic = true;
        }
        // inLogic = true;
        const payload = { index: i, logic: inLogic };
        commit("UPDATE_LOGIC", payload);
        // }
      }
    },
  },
  namespaced: true,
};
