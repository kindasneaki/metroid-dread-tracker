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
        logic: [
          {
            type: ["gravitySuit", "waveBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["gravitySuit", "powerBomb", "morphBall"],
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
        top: "margin-top:122px",
        left: "left:312px",
        logic: [
          {
            type: ["gravitySuit", "speedBooster", "morphBall", "screwAttack"],
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
        top: "margin-top:172px",
        left: "left:266px",
        logic: [
          {
            type: ["morphBall", "bomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "wideBeam"],
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
        top: "margin-top:170px",
        left: "left:295px",
        logic: [
          {
            type: ["morphBall", "bomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "grappleBeam", "wideBeam"],
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
        left: "left:371px",
        logic: [
          {
            type: ["morphBall", "speedBooster", "wideBeam"],
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
        top: "margin-top:64px",
        left: "left:461px",
        logic: [
          {
            type: ["morphBall", "bomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "wideBeam"],
            counter: 0,
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
        logic: [
          {
            type: ["morphBall", "crossBomb", "wideBeam"],
            counter: 0,
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
        logic: [
          {
            type: [
              "spinBoost",
              "morphBall",
              "grappleBeam",
              "variaSuit",
              "wideBeam",
            ],
            counter: 0,
          },
          {
            type: [
              "spaceJump",
              "morphBall",
              "grappleBeam",
              "variaSuit",
              "wideBeam",
            ],
            counter: 0,
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
        logic: [
          {
            type: ["morphBall", "grappleBeam", "diffusionBeam", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spinBoost", "flashShift"],
            counter: 0,
          },
          {
            type: ["morphBall", "spinBoost", "diffusionBeam", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "wideBeam", "chargeBeam", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "grappleBeam", "flashShift"],
            counter: 0,
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
            type: ["wideBeam", "gravitySuit", "speedBooster", "morphBall"],
            counter: 0,
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
        logic: [
          {
            type: ["speedBooster"],
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
        top: "margin-top:210px",
        left: "left:379px",
        logic: [
          {
            type: ["wideBeam", "morphBall", "speedBooster"],
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
        top: "margin-top:176px",
        left: "left:620px",
        logic: [
          {
            type: ["wideBeam", "morphBall", "variaSuit"],
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
        top: "margin-top:254px",
        left: "left:303px",
        logic: [
          {
            type: ["morphBall", "speedBooster", "wideBeam"],
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
        top: "margin-top:74px",
        left: "left:572px",
        logic: [
          {
            type: ["morphBall", "bomb", "speedBooster", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "speedBooster", "wideBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "speedBooster", "wideBeam"],
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
        top: "margin-top:44px",
        left: "left:286px",
        logic: [
          {
            type: ["gravitySuit", "speedBooster"],
            counter: 0,
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
            type: ["speedBooster", "wideBeam"],
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
        top: "margin-top:169px",
        left: "left:755px",
        logic: [
          {
            type: ["grappleBeam", "morphBall", "speedBooster"],
            counter: 0,
          },
          {
            type: ["spinBoost", "morphBall", "speedBooster"],
            counter: 0,
          },
          {
            type: ["spaceJump", "morphBall", "speedBooster"],
            counter: 0,
          },
          {
            type: [
              "grappleBeam",
              "morphBall",
              "wideBeam",
              "spinBoost",
              "variaSuit",
            ],
            counter: 0,
          },
          {
            type: [
              "spinBoost",
              "morphBall",
              "wideBeam",
              "spinBoost",
              "variaSuit",
            ],
            counter: 0,
          },
          {
            type: [
              "spaceJump",
              "morphBall",
              "wideBeam",
              "spinBoost",
              "variaSuit",
            ],
            counter: 0,
          },
          {
            type: [
              "grappleBeam",
              "morphBall",
              "wideBeam",
              "spaceJump",
              "variaSuit",
            ],
            counter: 0,
          },
          {
            type: [
              "spinBoost",
              "morphBall",
              "wideBeam",
              "spaceJump",
              "variaSuit",
            ],
            counter: 0,
          },
          {
            type: [
              "spaceJump",
              "morphBall",
              "wideBeam",
              "spaceJump",
              "variaSuit",
            ],
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
        top: "margin-top:70px",
        left: "left:521px",
        logic: [
          {
            type: ["morphBall", "powerBomb"],
            counter: 0,
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
            type: ["morphBall", "stormMissiles", "crossBomb", "grappleBeam"],
            counter: 0,
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
            counter: 0,
          },
          {
            type: ["slide"],
            counter: 0,
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
        softlock: true,
        logic: [
          {
            type: ["morphBall", "wideBeam"],
            counter: 0,
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
        softlock: true,
        logic: [
          {
            type: ["wideBeam", "morphBall"],
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
