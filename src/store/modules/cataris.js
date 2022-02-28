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
            counter: 0,
          },
          {
            type: ["variaSuit", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["variaSuit", "spaceJump"],
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
        top: "margin-top:382px",
        left: "left:226px",
        logic: [
          {
            type: ["gravitySuit", "bomb", "morphBall"],
            counter: 0,
          },
          {
            type: ["gravitySuit", "crossBomb", "morphBall"],
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
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:234px",
        left: "left:216px",
        logic: [
          {
            type: ["gravitySuit", "speedBooster"],
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
        top: "margin-top:210px",
        left: "left:281px",
        logic: [
          {
            type: ["morphBall"],
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
        top: "margin-top:298px",
        left: "left:304px",
        logic: [
          {
            type: ["variaSuit", "diffusionBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["variaSuit", "waveBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["gravitySuit", "morphBall"],
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
        top: "margin-top:319px",
        left: "left:511px",
        logic: [
          {
            type: ["morphBall", "bomb", "spinBoost", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spinBoost", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "spinBoost", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "bomb", "spaceJump", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spaceJump", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "spaceJump", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "waveBeam", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "diffusionBeam", "variaSuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "variaSuit"],
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
        top: "margin-top:412px",
        left: "left:586px",
        logic: [
          {
            type: ["screwAttack"],
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
        top: "margin-top:210px",
        left: "left:673px",
        logic: [
          {
            type: ["morphBall", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump"],
            counter: 0,
          },
          {
            type: ["morphBall", "spiderMagnet"],
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
        area: "9",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:334px",
        left: "left:750px",
        logic: [
          {
            type: ["variaSuit", "chargeBeam"],
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
        top: "margin-top:31px",
        left: "left:639px",
        logic: [
          {
            type: ["phantomCloak", "spiderMagnet", "speedBooster"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "speedBooster", "bomb"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "speedBooster", "crossBomb"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "speedBooster", "powerBomb"],
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
        top: "margin-top:444px",
        left: "left:791px",
        logic: [
          {
            type: ["morphBall", "chargeBeam"],
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
        top: "margin-top:98px",
        left: "left:836px",
        logic: [
          {
            type: ["wideBeam", "morphBall", "bomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["wideBeam", "morphBall", "crossBomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["wideBeam", "morphBall", "powerBomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["plasmaBeam", "morphBall", "bomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["plasmaBeam", "morphBall", "crossBomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["plasmaBeam", "morphBall", "powerBomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["waveBeam", "morphBall", "bomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["waveBeam", "morphBall", "crossBomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["waveBeam", "morphBall", "powerBomb", "variaSuit"],
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
        top: "margin-top:225px",
        left: "left:951px",
        logic: [
          {
            type: ["variaSuit", "morphBall", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "phantomCloak", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["variaSuit", "slide", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["slide", "phantomCloak", "chargeBeam"],
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
        top: "margin-top:157px",
        left: "left:1026px",
        logic: [
          {
            type: ["variaSuit", "morphBall", "bomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "crossBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "powerBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "bomb", "spaceJump"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "crossBomb", "spaceJump"],
            counter: 0,
          },
          {
            type: ["variaSuit", "morphBall", "powerBomb", "spaceJump"],
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
        top: "margin-top:263px",
        left: "left:110px",
        logic: [
          {
            type: ["morphBall"],
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
        top: "margin-top:137px",
        left: "left:700px",
        logic: [
          {
            type: ["phantomCloak"],
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
        left: "left:730px",
        logic: [
          {
            type: ["phantomCloak", "spiderMagnet"],
            counter: 0,
          },
          {
            type: ["variaSuit", "spinBoost", "slide"],
            counter: 0,
          },
          {
            type: ["variaSuit", "spinBoost", "morphBall"],
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
        top: "margin-top:98px",
        left: "left:914px",
        logic: [
          {
            type: ["grappleBeam", "morphBall", "bomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["grappleBeam", "morphBall", "crossBomb", "variaSuit"],
            counter: 0,
          },
          {
            type: ["grappleBeam", "morphBall", "powerBomb", "variaSuit"],
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
        top: "margin-top:229px",
        left: "left:409px",
        logic: [
          {
            type: ["speedBooster", "morphBall", "powerBomb"],
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
        top: "margin-top:424px",
        left: "left:263px",
        softlock: true,
        logic: [
          {
            type: ["gravitySuit", "morphBall", "bomb"],
            counter: 0,
          },
          {
            type: ["gravitySuit", "morphBall", "crossBomb"],
            counter: 0,
          },
          {
            type: ["gravitySuit", "morphBall", "powerBomb"],
            counter: 0,
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
            counter: 0,
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
        logic: [
          {
            type: ["chargeBeam", "wideBeam"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "plasmaBeam"],
            counter: 0,
          },
          {
            type: ["chargeBeam", "waveBeam"],
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
      if (data[6].logic) {
        state.locations[21].softlock = false;
        state.locations[20].softlock = false;
      } else {
        state.locations[21].softlock = true;
        state.locations[20].softlock = true;
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
        // inLogic = true;
        const payload = { index: i, logic: inLogic };
        commit("UPDATE_LOGIC", payload);
        // }
      }
    },
  },
  namespaced: true,
};
