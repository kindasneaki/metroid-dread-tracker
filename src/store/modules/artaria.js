export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:246px",
        left: "left:28px",
        requiredLogic: [
          {
            type: ["morphBall", "gravitySuit", "screwAttack"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam", "chargeBeam", "diffusionBeam"],
          },
          {
            type: ["waveBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:246px",
        left: "left:139px",
        requiredLogic: [
          {
            type: ["morphBall", "gravitySuit"],
          },
        ],
        logic: [
          {
            type: ["waveBeam", "spaceJump"],
          },
          {
            type: ["waveBeam", "spinBoost"],
          },
          {
            type: ["grappleBeam", "chargeBeam", "diffusionBeam", "spaceJump"],
          },
          {
            type: ["grappleBeam", "chargeBeam", "diffusionBeam", "spinBoost"],
          },
        ],
        inLogic: false,
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:290px",
        left: "left:132px",
        requiredLogic: [
          {
            type: ["morphBall", "gravitySuit"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam", "waveBeam", "bomb"],
          },
          {
            type: ["grappleBeam", "waveBeam", "crossBomb"],
          },
          {
            type: ["screwAttack", "waveBeam"],
          },
          {
            type: ["screwAttack", "waveBeam"],
          },
          {
            type: ["grappleBeam", "waveBeam", "powerBomb"],
          },
          {
            type: ["grappleBeam", "diffusionBeam", "bomb"],
          },
          {
            type: ["grappleBeam", "diffusionBeam", "crossBomb"],
          },
          {
            type: ["grappleBeam", "diffusionBeam", "powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:270px",
        left: "left:187px",
        requiredLogic: [
          {
            type: ["gravitySuit"],
          },
        ],
        //testing
        logic: [
          {
            type: ["slide"],
          },
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:223px",
        left: "left:242px",
        logic: [
          {
            type: ["slide"],
          },
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:147px",
        left: "left:298px",
        requiredLogic: [
          {
            type: ["morphBall", "superMissiles"],
          },
        ],
        logic: [
          {
            type: ["chargeBeam", "bomb"],
          },
          {
            type: ["chargeBeam", "superMissiles", "crossBomb"],
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
        top: "margin-top:359px",
        left: "left:378px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["speedBooster", "bomb"],
          },
          {
            type: ["speedBooster", "crossBomb"],
          },
          {
            type: ["powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:320px",
        left: "left:407px",
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
            type: ["grappleBeam"],
          },
          {
            type: ["spiderMagnet"],
          },
          {
            type: ["spaceJump"],
          },
          {
            type: ["spinBoost"],
          },
        ],
        inLogic: false,
      },
      {
        area: "9",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:197px",
        left: "left:395px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster"],
          },
        ],
        logic: [
          {
            type: ["spinBoost"],
          },
          {
            type: ["spaceJump"],
          },
          {
            type: ["spiderMagnet"],
          },
          {
            type: ["grappleBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "10",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:252px",
        left: "left:511px",
        requiredLogic: [
          {
            type: ["chargeBeam", "grappleBeam"],
          },
        ],
        logic: [
          {
            type: ["slide"],
          },
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "11",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:163px",
        left: "left:518px",
        requiredLogic: [
          {
            type: ["speedBooster"],
          },
        ],
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
        area: "12",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:224px",
        left: "left:604px",
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
            type: ["spinBoost"],
          },
          {
            type: ["spaceJump"],
          },
          {
            type: ["grappleBeam"],
          },
          {
            type: ["spiderMagnet"],
          },
        ],
        inLogic: false,
      },
      {
        area: "13",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:159px",
        left: "left:648px",
        logic: [
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "14",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:269px",
        left: "left:682px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["spaceJump"],
          },
          {
            type: ["bomb", "chargeBeam"],
          },
          {
            type: ["crossBomb", "chargeBeam"],
          },
          {
            type: ["powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "15",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:172px",
        left: "left:726px",
        // softlock: true,
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
            type: ["chargeBeam"],
          },
          // {
          //   type: ["phantomCloak"],
          // },
        ],
        inLogic: false,
      },
      {
        area: "16",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:245px",
        left: "left:728px",
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
        area: "17",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:181px",
        left: "left:748px",
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
        area: "18",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:240px",
        left: "left:769px",
        requiredLogic: [
          {
            type: ["morphBall", "bomb"],
          },
          {
            type: ["morphBall", "crossBomb"],
          },
          {
            type: ["morphBall", "powerBomb"],
          },
        ],
        logic: [
          {
            type: ["flashShift"],
          },
          {
            type: ["spaceJump"],
          },
          {
            type: ["spinBoost"],
          },
        ],
        inLogic: false,
      },
      {
        area: "19",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:191px",
        left: "left:810px",
        requiredLogic: [
          {
            type: ["chargeBeam"],
          },
        ],
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
        area: "20",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:176px",
        left: "left:828px",
        requiredLogic: [
          {
            type: ["chargeBeam", "variaSuit"],
          },
        ],
        logic: [
          {
            type: ["morphBall", "spiderMagnet"],
          },
          {
            type: ["slide", "spiderMagnet"],
          },
          {
            type: ["morphBall", "spaceJump"],
          },
          {
            type: ["slide", "spaceJump"],
          },
        ],
        inLogic: false,
      },
      {
        area: "21",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:155px",
        left: "left:966px",
        requiredLogic: [
          {
            type: ["chargeBeam", "morphBall"],
          },
          {
            type: ["chargeBeam", "slide"],
          },
        ],
        logic: [
          {
            type: ["spinBoost", "damage>100"],
          },
          {
            type: ["spinBoost", "damage>100"],
          },
          {
            type: ["spaceJump", "damage>100"],
          },
          {
            type: ["spaceJump", "damage>100"],
          },
          {
            type: ["flashShift", "damage>100"],
          },
          {
            type: ["flashShift", "damage>100"],
          },
          {
            type: ["spiderMagnet", "damage>100"],
          },
          {
            type: ["spiderMagnet", "damage>100"],
          },
          {
            type: ["spinBoost", "variaSuit"],
          },
          {
            type: ["spinBoost", "variaSuit"],
          },
          {
            type: ["spaceJump", "variaSuit"],
          },
          {
            type: ["spaceJump", "variaSuit"],
          },
          {
            type: ["flashShift", "variaSuit"],
          },
          {
            type: ["flashShift", "variaSuit"],
          },
          {
            type: ["spiderMagnet", "variaSuit"],
          },
          {
            type: ["spiderMagnet", "variaSuit"],
          },
        ],
        inLogic: false,
      },
      {
        area: "22",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:209px",
        left: "left:319px",
        logic: [
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:323px",
        left: "left:324px",
        requiredLogic: [
          {
            type: ["speedBooster"],
          },
        ],
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
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:95px",
        left: "left:365px",
        requiredLogic: [
          {
            type: ["chargeBeam", "morphBall"],
          },
        ],
        logic: [
          {
            type: ["variaSuit", "damage>100"],
          },
          {
            type: ["gravitySuit"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:326px",
        left: "left:266px",
        logic: [
          {
            type: ["slide"],
          },
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:197px",
        left: "left:230px",
        logic: [
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:367px",
        left: "left:624px",
        requiredLogic: [
          {
            type: ["chargeBeam"],
          },
        ],
        logic: [
          {
            type: ["slide"],
          },
          {
            type: ["morphBall"],
          },
        ],
        inLogic: false,
      },
      {
        area: "2ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:69px",
        left: "left:215px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam", "speedBooster"],
          },
        ],
        logic: [
          {
            type: ["bomb", "chargeBeam"],
          },
          {
            type: ["crossBomb", "chargeBeam"],
          },
          {
            type: ["powerBomb"],
          },
        ],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:193px",
        left: "left:436px",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["spaceJump"],
          },
          {
            type: ["grappleBeam", "flashShift"],
          },
          {
            type: ["spiderMagnet", "spinBoost"],
          },
          {
            type: ["speedBooster"],
          },
          {
            type: ["flashShift", "grappleBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "charge",
        checked: false,
        type: "chargeBeam",
        amount: 1,
        top: "margin-top: 373px",
        left: "left: 341px",
        softlock: true,
        logic: [
          {
            type: ["morphBall"],
          },
          {
            type: ["slide"],
          },
          {
            type: ["chargeBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "whiteEMMI",
        checked: false,
        type: "spiderMagnet",
        amount: 1,
        top: "margin-top: 293px",
        left: "left: 643px",
        softlock: true,
        requiredLogic: [
          {
            type: ["chargeBeam"],
          },
        ],
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
        area: "corpius",
        checked: false,
        type: "phantomCloak",
        amount: 1,
        top: "margin-top: 225px",
        left: "left: 817px",
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
        area: "screw",
        checked: false,
        type: "screwAttack",
        amount: 1,
        top: "margin-top: 272px",
        left: "left: 140px",
        softlock: true,
        requiredLogic: [
          {
            type: ["gravitySuit", "morphBall"],
          },
          {
            type: ["gravitySuit", "morphBall"],
          },
        ],
        logic: [
          {
            type: [
              "grappleBeam",
              "spinBoost",
              "bomb",
              "chargeBeam",
              "diffusionBeam",
            ],
          },
          {
            type: [
              "grappleBeam",
              "spinBoost",
              "crossBomb",
              "chargeBeam",
              "diffusionBeam",
            ],
          },
          {
            type: [
              "grappleBeam",
              "spinBoost",
              "powerBomb",
              "chargeBeam",
              "diffusionBeam",
            ],
          },
          {
            type: ["screwAttack", "waveBeam"],
          },
        ],
        inLogic: false,
      },
      {
        area: "grapple",
        checked: false,
        type: "grappleBeam",
        amount: 1,
        top: "margin-top: 138px",
        left: "left: 646px",
        softlock: true,
        logic: [
          {
            type: ["morphBall", "speedBooster"],
          },
          {
            type: ["slide", "speedBooster"],
          },
          {
            type: ["wideBeam", "morphBall", "variaSuit", "spinBoost"],
          },
          {
            type: ["wideBeam", "morphBall", "variaSuit", "spaceJump"],
          },
        ],
        inLogic: false,
      },
      {
        area: "varia",
        checked: false,
        type: "variaSuit",
        amount: 1,
        top: "margin-top: 65px",
        left: "left: 314px",
        softlock: true,
        logic: [
          {
            type: ["morphBall", "chargeBeam"],
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
      //phantomCloak
      if (data[11].logic) {
        state.locations[31].softlock = false;
      } else {
        state.locations[31].softlock = true;
      }
      //chargeBeam or morphBall
      if (data[0].logic || data[5].logic) {
        state.locations[29].softlock = false;
        state.locations[14].softlock = false;
      } else {
        state.locations[29].softlock = true;
        state.locations[14].softlock = true;
      }
      // //David Jaffe Room
      // if (data[5].logic) {
      //   state.locations[14].softlock = false;
      // } else {
      //   state.locations[14].softlock = true;
      // }
      //grappleBeam
      if (data[10].logic) {
        state.locations[33].softlock = false;
      } else {
        state.locations[33].softlock = true;
      }
      //variaSuit
      if (data[7].logic) {
        state.locations[34].softlock = false;
        state.locations[27].softlock = false;
        // state.locations[23].softlock = false;
      } else {
        state.locations[34].softlock = true;
        state.locations[27].softlock = true;
        // state.locations[23].softlock = true;
      }
      //spiderMagnet or spaceJump
      if (data[9].logic || data[22].logic) {
        state.locations[30].softlock = false;
      } else {
        state.locations[30].softlock = true;
      }
      //screwAttack
      if (
        (data[23].logic && data[21].logic) ||
        (data[23].logic && data[22].logic)
      ) {
        state.locations[32].softlock = false;
      } else {
        state.locations[32].softlock = true;
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
          // for (let k = 0; k < element.type.length; k++) {
          //   element.counter = 0;
          // }
        });

        if (originalLength === 0) {
          inLogic = true;
        }
        const payload = { index: i, logic: inLogic };
        commit("UPDATE_LOGIC", payload);
        // }
      }
    },
  },
  namespaced: true,
};
