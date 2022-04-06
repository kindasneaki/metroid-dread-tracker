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
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam", "gravitySuit"],
          },
        ],
        logic: [
          {
            type: ["waveBeam"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "spaceJump"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["spinBoost"],
            counter: 0,
          },
          {
            type: ["spiderMagnet"],
            counter: 0,
          },
          {
            type: ["spaceJump"],
            counter: 0,
          },
          {
            type: ["grappleBeam"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam"],
            counter: 0,
          },
          {
            type: ["gravitySuit"],
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
        requiredLogic: [
          {
            type: ["morphBall", "gravitySuit"],
          },
        ],
        logic: [
          {
            type: ["spinBoost", "plasmaBeam", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["spaceJump", "plasmaBeam", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["spinBoost", "waveBeam", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["spaceJump", "waveBeam", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["spaceJump", "speedBooster", "phantomCloak", "screwAttack"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["flashShift"],
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
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:669px",
        left: "left:424px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster"],
          },
        ],
        logic: [
          {
            type: ["powerBomb"],
            counter: 0,
          },
          {
            type: ["iceMissiles"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam"],
            counter: 0,
          },
          {
            type: ["spiderMagnet"],
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
            type: ["iceMissiles"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["spinBoost"],
            counter: 0,
          },
          {
            type: ["flashShift"],
            counter: 0,
          },
          {
            type: ["spaceJump"],
            counter: 0,
          },
          {
            type: ["spiderMagnet", "grappleBeam"],
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
            type: ["morphBall", "gravitySuit", "grappleBeam"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerbomb",
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
        //flashshift or bombtrick
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
        //gravitySuit
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam"],
          },
        ],
        logic: [
          {
            type: ["waveBeam"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "diffusionBeam"],
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
      //3m location
      if (
        data[8].logic ||
        (data[12].logic && data[9].logic) ||
        (data[12].logic && data[10].logic)
      ) {
        state.locations[10].softlock = false;
      } else {
        state.locations[10].softlock = true;
      }
      //flashshift
      if (data[12].logic) {
        state.locations[17].softlock = false;
      } else {
        state.locations[17].softlock = true;
      }
      //gravity
      if (data[8].logic) {
        state.locations[18].softlock = false;
      } else {
        state.locations[18].softlock = true;
      }
      for (let i = 0; i < state.locations.length; i++) {
        // for (let k = 0; k < state.locations[i].logic.length; k++) {
        let originalLength = state.locations[i].logic.length;
        let inLogic = false;
        let requiredLogic = false;
        if (state.locations[i].requiredLogic) {
          state.locations[i].requiredLogic.forEach((element) => {
            let counter = 0;
            let logicLength = element.type.length;
            for (let k = 0; k < element.type.length; k++) {
              data.find((value) => {
                if (value.type === element.type[k]) {
                  if (value.logic) {
                    counter++;
                    if (logicLength === counter) {
                      requiredLogic = true;
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
        } else {
          requiredLogic = true;
        }
        state.locations[i].logic.forEach((element) => {
          let counter = 0;
          let logicLength = element.type.length;
          for (let k = 0; k < element.type.length; k++) {
            data.find((value) => {
              if (value.type === element.type[k]) {
                if (value.logic) {
                  counter++;
                  if (logicLength === counter && requiredLogic) {
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
