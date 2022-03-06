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
        logic: [
          {
            type: ["morphBall", "waveBeam", "grappleBeam", "gravitySuit"],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "grappleBeam",
              "chargeBeam",
              "spiderMagnet",
              "gravitySuit",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "grappleBeam",
              "chargeBeam",
              "spaceJump",
              "gravitySuit",
            ],
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
        top: "margin-top:240px",
        left: "left:298px",
        logic: [
          {
            type: ["morphBall"],
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
        top: "margin-top:339px",
        left: "left:273px",
        logic: [
          {
            type: ["morphBall", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "grappleBeam"],
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
        top: "margin-top:457px",
        left: "left:372px",
        logic: [
          {
            type: ["grappleBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["morphBall", "gravitySuit"],
            counter: 0,
          },
        ],
        trick: [{ type: ["movefastbeforewater"] }],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:509px",
        left: "left:388px",
        logic: [
          {
            type: ["morphBall", "spaceJump", "screwAttack"],
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
        top: "margin-top:528px",
        left: "left:226px",
        logic: [
          {
            type: ["morphBall", "gravitySuit", "speedBooster"],
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
        top: "margin-top:591px",
        left: "left:155px",
        logic: [
          {
            type: [
              "morphBall",
              "gravitySuit",
              "spinBoost",
              "plasmaBeam",
              "spiderMagnet",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "spaceJump",
              "plasmaBeam",
              "spiderMagnet",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "spinBoost",
              "waveBeam",
              "spiderMagnet",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "spaceJump",
              "waveBeam",
              "spiderMagnet",
            ],
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
        top: "margin-top:639px",
        left: "left:669px",
        logic: [
          {
            type: ["morphBall", "screwAttack"],
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
        top: "margin-top:196px",
        left: "left:108px",
        logic: [
          {
            type: ["morphBall", "flashShift"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump"],
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
        top: "margin-top:669px",
        left: "left:424px",
        logic: [
          {
            type: ["morphBall", "powerBomb", "speedBooster"],
            counter: 0,
          },
          {
            type: ["morphBall", "iceMissiles", "speedBooster"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "3m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:586px",
        left: "left:195px",
        //flashshift or gravitysuit
        softlock: true,
        logic: [
          {
            type: ["morphBall", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spiderMagnet"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "4m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:643px",
        left: "left:514px",
        logic: [
          {
            type: ["morphBall", "gravitySuit", "screwAttack"],
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
        top: "margin-top:316px",
        left: "left:410px",
        logic: [
          {
            type: ["speedBooster"],
            trick: ["crossBomb"],
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
        top: "margin-top:575px",
        left: "left:426px",
        logic: [
          {
            type: ["morphBall", "powerBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "iceMissiles"],
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
        top: "margin-top:417px",
        left: "left:272px",
        logic: [
          {
            type: ["morphBall", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "flashShift"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "spiderMagnet", "grappleBeam"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "2ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:706px",
        left: "left:303px",
        logic: [
          {
            type: ["morphBall", "gravitySuit", "stormMissiles", "grappleBeam"],
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
        top: "margin-top:778px",
        left: "left:434px",
        logic: [
          {
            type: [
              "morphBall",
              "gravitySuit",
              "speedBooster",
              "grappleBeam",
              "powerBomb",
            ],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "flash",
        checked: false,
        type: "flashShift",
        amount: 2,
        top: "margin-top:476px",
        left: "left:326px",
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
        area: "gravity",
        checked: false,
        type: "gravitySuit",
        amount: 2,
        top: "margin-top:745px",
        left: "left:415px",
        softlock: true,
        logic: [
          {
            type: ["morphBall", "gravitySuit", "grappleBeam"],
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
