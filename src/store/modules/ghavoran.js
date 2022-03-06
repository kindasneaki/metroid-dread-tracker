export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:69px",
        left: "left:737px",
        //crossBomb needed
        softlock: true,
        logic: [
          {
            type: ["morphBall", "speedBooster", "powerBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "bomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "crossBomb", "iceMissiles"],
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
        top: "margin-top:29px",
        left: "left:521px",
        logic: [
          {
            type: ["bomb", "morphBall"],
            counter: 0,
          },
          {
            type: ["crossBomb", "morphBall"],
            counter: 0,
          },
          {
            type: ["powerBomb", "morphBall"],
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
        top: "margin-top:89px",
        left: "left:551px",
        logic: [
          {
            type: ["morphBall", "speedBooster", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb"],
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
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:134px",
        left: "left:589px",
        logic: [
          {
            type: ["morphBall", "crossBomb", "gravitySuit"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spinBoost"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "spaceJump"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        //TODO
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:153px",
        left: "left:599px",
        logic: [
          {
            type: ["morphBall", "stormMissiles", "spinBoost", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "stormMissiles", "spaceJump", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "stormMissiles", "spinBoost", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "stormMissiles", "spaceJump", "crossBomb"],
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
        top: "margin-top:216px",
        left: "left:374px",
        logic: [
          {
            type: ["morphBall", "gravitySuit", "crossBomb"],
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
        top: "margin-top:321px",
        left: "left:115px",
        logic: [
          {
            type: ["morphBall", "grappleBeam", "plasmaBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "grappleBeam", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "grappleBeam", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "grappleBeam", "powerBomb"],
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
        top: "margin-top:350px",
        left: "left:211px",
        logic: [
          {
            type: ["morphBall", "gravitySuit", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spinBoost", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "grappleBeam"],
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
        top: "margin-top:260px",
        left: "left:395px",
        logic: [
          {
            type: [
              "morphBall",
              "speedBooster",
              "grappleBeam",
              "bomb",
              "spiderMagnet",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "speedBooster",
              "grappleBeam",
              "crossBomb",
              "spiderMagnet",
            ],
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
        top: "margin-top:339px",
        left: "left:439px",
        logic: [
          {
            type: ["morphBall", "grappleBeam"],
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
        top: "margin-top:302px",
        left: "left:345px",
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
        top: "margin-top:12px",
        left: "left:560px",
        logic: [
          {
            type: ["morphBall", "speedBooster", "bomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "crossBomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "powerBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "screwAttack", "grappleBeam"],
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
        top: "margin-top:173px",
        left: "left:403px",
        logic: [
          {
            type: ["morphBall", "iceMissiles", "spinBoost", "grappleBeam"],
            counter: 0,
          },
          {
            type: ["morphBall", "spaceJump", "grappleBeam"],
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
        top: "margin-top:78px",
        left: "left:453px",
        logic: [
          {
            type: ["powerBomb", "morphBall"],
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
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:12px",
        left: "left:432px",
        logic: [
          {
            type: ["spinBoost", "flashShift", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["spaceJump", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["spinBoost", "flashShift", "powerBomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "powerBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "blueEMMI",
        checked: false,
        type: "iceMissiles",
        amount: 1,
        top: "margin-top:100px",
        left: "left:200px",
        softlock: true,
        logic: [
          {
            type: ["spinBoost", "morphBall", "chargeBeam"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "pulse",
        checked: false,
        type: "pulseRadar",
        amount: 1,
        top: "margin-top:74px",
        left: "left:495px",
        softlock: true,
        logic: [
          {
            type: ["morphBall", "grappleBeam", "iceMissiles"],
            counter: 0,
          },
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
          {
            type: ["morphBall", "screwAttack", "grappleBeam", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "screwAttack", "grappleBeam", "crossBomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "screwAttack", "grappleBeam", "powerBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "super",
        checked: false,
        type: "superMissiles",
        amount: 1,
        top: "margin-top:357px",
        left: "left:297px",
        softlock: true,
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
        area: "spin",
        checked: false,
        type: "spinBoost",
        amount: 1,
        top: "margin-top:188px",
        left: "left:481px",
        softlock: true,
        logic: [
          {
            type: ["morphBall", "bomb"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "cross",
        checked: false,
        type: "crossBomb",
        amount: 1,
        top: "margin-top:78px",
        left: "left:644px",
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
          {
            type: [
              "morphBall",
              "screwAttack",
              "grappleBeam",
              "spaceJump",
              "powerBomb",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "screwAttack",
              "grappleBeam",
              "spaceJump",
              "iceMissiles",
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
