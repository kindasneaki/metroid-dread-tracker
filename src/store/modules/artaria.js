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
        logic: [
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "waveBeam",
              "screwAttack",
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
        top: "margin-top:246px",
        left: "left:139px",
        logic: [
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "waveBeam",
              "spaceJump",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "waveBeam",
              "spinBoost",
            ],
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
        top: "margin-top:290px",
        left: "left:132px",
        logic: [
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "waveBeam",
              "bomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "waveBeam",
              "crossBomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "waveBeam",
              "powerBomb",
            ],
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
        top: "margin-top:270px",
        left: "left:187px",
        logic: [
          {
            type: ["slide", "gravitySuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "gravitySuit"],
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
        top: "margin-top:223px",
        left: "left:242px",
        logic: [
          {
            type: ["slide"],
            counter: 0,
          },
          {
            type: ["morphBall"],
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
        top: "margin-top:147px",
        left: "left:298px",
        logic: [
          {
            type: ["morphBall", "chargeBeam", "superMissiles"],
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
        top: "margin-top:359px",
        left: "left:378px",
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
            type: ["morphBall", "powerBomb"],
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
        top: "margin-top:320px",
        left: "left:407px",
        logic: [
          {
            type: ["grappleBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["spiderMagnet", "morphBall"],
            counter: 0,
          },
          {
            type: ["spaceJump", "morphBall"],
            counter: 0,
          },
          {
            type: ["spinBoost", "morphBall"],
            counter: 0,
          },
          {
            type: ["grappleBeam", "slide"],
            counter: 0,
          },
          {
            type: ["spiderMagnet", "slide"],
            counter: 0,
          },
          {
            type: ["spaceJump", "slide"],
            counter: 0,
          },
          {
            type: ["spinBoost", "slide"],
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
        top: "margin-top:197px",
        left: "left:395px",
        logic: [
          {
            type: ["morphBall", "spinBoost", "speedBooster"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "speedBooster"],
            counter: 0,
          },
          {
            type: ["morphBall", "spiderMagnet", "speedBooster"],
            counter: 0,
          },
          {
            type: ["morphBall", "grappleBeam", "speedBooster"],
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
        top: "margin-top:252px",
        left: "left:511px",
        logic: [
          {
            type: ["slide", "chargeBeam", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "chargeBeam", "grappleBeam"],
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
        top: "margin-top:163px",
        left: "left:518px",
        logic: [
          {
            type: ["morphBall", "speedBooster"],
            counter: 0,
          },
          {
            type: ["slide", "speedBooster"],
            counter: 0,
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
        logic: [
          {
            type: ["morphBall", "spinBoost"],
            counter: 0,
          },
          {
            type: ["slide", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump"],
            counter: 0,
          },
          {
            type: ["slide", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["slide", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["slide", "spiderMagnet"],
            counter: 0,
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
            counter: 0,
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
        logic: [
          {
            type: ["morphBall", "spaceJump"],
            counter: 0,
          },
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
        area: "15",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:172px",
        left: "left:726px",
        logic: [
          {
            type: ["chargeBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide"],
            counter: 0,
          },
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
        area: "17",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:181px",
        left: "left:748px",
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
        area: "18",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:240px",
        left: "left:769px",
        logic: [
          {
            type: ["flashShift", "morphBall", "bomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "morphBall", "bomb"],
            counter: 0,
          },
          {
            type: ["spinBoost", "morphBall", "bomb"],
            counter: 0,
          },
          {
            type: ["flashShift", "morphBall", "crossBomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "morphBall", "crossBomb"],
            counter: 0,
          },
          {
            type: ["spinBoost", "morphBall", "crossBomb"],
            counter: 0,
          },
          {
            type: ["flashShift", "morphBall", "powerBomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "morphBall", "powerBomb"],
            counter: 0,
          },
          {
            type: ["spinBoost", "morphBall", "powerBomb"],
            counter: 0,
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
        logic: [
          {
            type: ["chargeBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide"],
            counter: 0,
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
        logic: [
          {
            type: ["chargeBeam", "morphBall", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "variaSuit"],
            counter: 0,
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
        logic: [
          {
            type: ["chargeBeam", "morphBall", "spinBoost", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "spinBoost", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "morphBall", "spaceJump", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "spaceJump", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "morphBall", "flashShift", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "flashShift", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "morphBall", "spiderMagnet", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "spiderMagnet", "damage>100"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "morphBall", "spinBoost", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "spinBoost", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "morphBall", "spaceJump", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "spaceJump", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "morphBall", "flashShift", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "flashShift", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "morphBall", "spiderMagnet", "variaSuit"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "slide", "spiderMagnet", "variaSuit"],
            counter: 0,
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
        top: "margin-top:323px",
        left: "left:324px",
        logic: [
          {
            type: ["speedBooster", "morphBall"],
            counter: 0,
          },
          {
            type: ["speedBooster", "slide"],
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
        top: "margin-top:95px",
        left: "left:365px",
        logic: [
          {
            type: ["morphBall", "variaSuit", "chargeBeam", "damage>100"],
            counter: 0,
          },
          {
            type: ["morphBall", "gravitySuit", "chargeBeam"],
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
        top: "margin-top:326px",
        left: "left:266px",
        logic: [
          {
            type: ["slide"],
            counter: 0,
          },
          {
            type: ["morphBall"],
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
        top: "margin-top:197px",
        left: "left:230px",
        logic: [
          {
            type: ["morphBall"],
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
        top: "margin-top:367px",
        left: "left:624px",
        logic: [
          {
            type: ["slide", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "chargeBeam"],
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
        top: "margin-top:69px",
        left: "left:215px",
        softlock: true,
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
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:193px",
        left: "left:436px",
        logic: [
          {
            type: ["morphBall", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spiderMagnet", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster"],
            counter: 0,
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
            counter: 0,
          },
          {
            type: ["slide"],
            counter: 0,
          },
          {
            type: ["chargeBeam"],
            counter: 0,
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
        logic: [
          {
            type: ["morphBall", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["slide", "chargeBeam"],
            counter: 0,
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
            type: ["morphBall", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["slide", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "phantomCloak"],
            counter: 0,
          },
          {
            type: ["slide", "phantomCloak"],
            counter: 0,
          },
          {
            type: ["morphBall", "waveBeam"],
            counter: 0,
          },
          {
            type: ["slide", "waveBeam"],
            counter: 0,
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
        logic: [
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "spinBoost",
              "bomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "spinBoost",
              "crossBomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "spinBoost",
              "powerBomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "spaceJump",
              "bomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "spaceJump",
              "crossBomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "gravitySuit",
              "grappleBeam",
              "spaceJump",
              "powerBomb",
            ],
            counter: 0,
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
            counter: 0,
          },
          {
            type: ["slide", "speedBooster"],
            counter: 0,
          },
          {
            type: ["wideBeam", "morphBall", "variaSuit", "spinBoost"],
            counter: 0,
          },
          {
            type: ["wideBeam", "morphBall", "variaSuit", "spaceJump"],
            counter: 0,
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
    softLock({ state, rootGetters }, index) {
      let data = rootGetters["items/inLogic"];
      switch (index) {
        case 7:
          console.log(index, data[index].logic);
          state.locations[31].softlock = data[index].logic;

          break;
      }
    },
    checkLogic({ commit, state, rootGetters }) {
      let data = rootGetters["items/inLogic"];
      // if (data[7].logic) {
      //   state.locations[31].softlock = false;
      // } else {
      //   state.locations[31].softlock = true;
      // }
      //chargeBeam or morphBall
      console.log(data[0]);
      if (data[0].logic || data[1].logic) {
        console.log("entered");
        state.locations[29].softlock = false;
      } else {
        state.locations[29].softlock = true;
      }
      //grappleBeam
      if (data[6].logic) {
        state.locations[33].softlock = false;
      } else {
        state.locations[33].softlock = true;
      }
      if (data[2].logic) {
        state.locations[34].softlock = false;
        state.locations[27].softlock = false;
        // state.locations[23].softlock = false;
      } else {
        state.locations[34].softlock = true;
        state.locations[27].softlock = true;
        // state.locations[23].softlock = true;
      }
      //spiderMagnet or spaceJump
      if (data[5].logic || data[20].logic) {
        state.locations[30].softlock = false;
      } else {
        state.locations[30].softlock = true;
      }

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
        const payload = { index: i, logic: inLogic };
        commit("UPDATE_LOGIC", payload);
        // }
      }
    },
  },
  namespaced: true,
};
