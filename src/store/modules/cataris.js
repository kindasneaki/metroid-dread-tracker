export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:158px",
        left: "left:180px",
        logic: [
          {
            type: [">100damage"],
          },
          {
            type: ["variaSuit", "spiderMagnet"],
          },
          {
            type: ["variaSuit", "spaceJump"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:382px",
        left: "left:226px",
        requiredLogic: [
          {
            type: ["gravitySuit", "morphBall"],
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
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:234px",
        left: "left:216px",
        logic: [
          {
            type: ["gravitySuit", "speedBooster"],
          },
        ],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:210px",
        left: "left:281px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["variaSuit", "grappleBeam"],
          },
          {
            type: ["spiderMagnet"],
          },
          {
            type: ["spaceJump"],
          },
        ],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:298px",
        left: "left:304px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["variaSuit", "diffusionBeam"],
          },
          {
            type: ["variaSuit", "waveBeam"],
          },
          {
            type: ["gravitySuit"],
          },
        ],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:319px",
        left: "left:511px",
        requiredLogic: [
          {
            type: ["morphBall", "variaSuit"],
          },
        ],
        logic: [
          {
            type: ["bomb", "spinBoost"],
          },
          {
            type: ["crossBomb", "spinBoost"],
          },
          {
            type: ["powerBomb", "spinBoost"],
          },
          {
            type: ["bomb", "spaceJump"],
          },
          {
            type: ["crossBomb", "spaceJump"],
          },
          {
            type: ["powerBomb", "spaceJump"],
          },
          {
            type: ["waveBeam"],
          },
          {
            type: ["chargeBeam", "diffusionBeam"],
          },
          //IBJ
          {
            type: ["crossBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:412px",
        left: "left:586px",
        requiredLogic: [
          {
            type: ["screwAttack"],
          },
        ],
        logic: [
          {
            type: ["variaSuit"],
          },
          {
            type: ["chargeBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:210px",
        left: "left:673px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["spinBoost", "chargeBeam"],
          },
          {
            type: ["spaceJump", "chargeBeam"],
          },
          {
            type: ["spiderMagnet", "chargeBeam"],
          },
          {
            type: ["grappleBeam", "chargeBeam"],
          },
          {
            type: ["spinBoost", "wideBeam"],
          },
          {
            type: ["spaceJump", "wideBeam"],
          },
          {
            type: ["spiderMagnet", "wideBeam"],
          },
          {
            type: ["grappleBeam", "wideBeam"],
          },
          {
            type: ["spinBoost", "powerBomb"],
          },
          {
            type: ["spaceJump", "powerBomb"],
          },
          {
            type: ["spiderMagnet", "powerBomb"],
          },
          {
            type: ["grappleBeam", "powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "9",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:334px",
        left: "left:750px",
        logic: [
          {
            type: ["variaSuit", "chargeBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "10",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:31px",
        left: "left:639px",
        requiredLogic: [
          {
            type: ["speedBooster"],
          },
        ],
        logic: [
          {
            type: ["phantomCloak", "spiderMagnet"],
          },
          {
            type: ["variaSuit", "morphBall", "bomb"],
          },
          {
            type: ["variaSuit", "morphBall", "crossBomb"],
          },
          {
            type: ["variaSuit", "morphBall", "powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "11",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:444px",
        left: "left:791px",
        logic: [
          {
            type: ["morphBall", "chargeBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "12",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:98px",
        left: "left:836px",
        requiredLogic: [
          {
            type: ["morphBall", "wideBeam", "variaSuit", "chargeBeam"],
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
        area: "13",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:225px",
        left: "left:951px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
          {
            type: ["slide"],
          },
        ],
        logic: [
          {
            type: ["variaSuit", "chargeBeam"],
          },
          {
            type: ["phantomCloak", "chargeBeam"],
          },
          {
            type: ["phantomCloak", "wideBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "14",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:157px",
        left: "left:1026px",
        requiredLogic: [
          {
            type: ["morphBall", "variaSuit", "spinBoost"],
          },
          {
            type: ["morphBall", "variaSuit", "spaceJump"],
          },
        ],
        logic: [
          {
            type: ["bomb", "wideBeam"],
          },
          {
            type: ["crossBomb", "wideBeam"],
          },
          {
            type: ["powerBomb", "wideBeam"],
          },
          {
            type: ["bomb", "chargeBeam"],
          },
          {
            type: ["crossBomb", "chargeBeam"],
          },
          {
            type: ["powerBomb", "chargeBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:263px",
        left: "left:110px",
        logic: [
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:137px",
        left: "left:700px",
        logic: [
          {
            type: ["phantomCloak"],
          },
          {
            type: ["gravitySuit"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:404px",
        left: "left:482px",
        logic: [
          {
            type: [
              "gravitySuit",
              "morphBall",
              "speedBooster",
              "waveBeam",
              "grappleBeam",
            ],
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
        left: "left:730px",
        requiredLogic: [
          {
            type: ["chargeBeam"],
          },
          {
            type: ["wideBeam"],
          },
        ],
        logic: [
          {
            type: ["phantomCloak", "spiderMagnet"],
          },
          {
            type: ["variaSuit", "slide"],
          },
          {
            type: ["variaSuit", "morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:98px",
        left: "left:914px",
        requiredLogic: [
          {
            type: ["morphBall", "spiderMagnet", "grappleBeam", "variaSuit"],
          },
        ],
        logic: [
          {
            //IBJ
            type: ["bomb", "chargeBeam"],
          },
          {
            type: ["crossBomb", "chargeBeam"],
          },
          {
            type: ["powerBomb", "chargeBeam"],
          },
          {
            type: ["bomb", "chargeBeam", "spaceJump"],
          },
          {
            type: ["bomb", "chargeBeam", "phantomCloak"],
          },
          {
            //IBJ
            type: ["bomb", "wideBeam"],
          },
          {
            type: ["crossBomb", "wideBeam"],
          },
          {
            type: ["powerBomb", "wideBeam"],
          },
          {
            type: ["bomb", "wideBeam", "spaceJump"],
          },
          {
            type: ["bomb", "wideBeam", "phantomCloak"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:229px",
        left: "left:409px",
        logic: [
          {
            type: ["speedBooster", "morphBall", "powerBomb", "wideBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "3pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:424px",
        left: "left:263px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall", "gravitySuit"],
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
        area: "diffusion",
        checked: false,
        type: "diffusionBeam",
        amount: 1,
        top: "margin-top: 418px",
        left: "left: 236px",
        softlock: true,
        logic: [
          {
            type: ["variaSuit", "morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "greenEMMI",
        checked: false,
        type: "flashShift",
        amount: 1,
        top: "margin-top:139px",
        left: "left:322px",
        softlock: true,
        logic: [
          {
            type: ["wideBeam"],
          },
          {
            type: ["plasmaBeam"],
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
    UPDATE_LOGIC(state, payload) {
      state.locations[payload.index].inLogic = payload.logic;
    },
  },
  actions: {
    checkLogic({ commit, state, rootGetters }) {
      let data = rootGetters["items/inLogic"];
      //diffusion beam area
      if (data[6].logic || data[16].logic) {
        state.locations[21].softlock = false;
        state.locations[20].softlock = false;
      } else {
        state.locations[21].softlock = true;
        state.locations[20].softlock = true;
      }
      //greenEMMI
      if (data[0].logic) {
        state.locations[22].softlock = false;
      } else {
        state.locations[22].softlock = true;
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
