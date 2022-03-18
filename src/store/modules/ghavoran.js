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
            type: ["bomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["crossBomb", "iceMissiles"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
            counter: 0,
          },
          {
            type: ["crossBomb"],
            counter: 0,
          },
          {
            type: ["powerBomb"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["speedBooster", "bomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["crossBomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["crossBomb", "variaSuit", "chargeBeam"],
            counter: 0,
          },
          {
            type: ["speedBooster", "powerBomb"],
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
        requiredLogic: [
          {
            type: ["morphBall", "crossBomb"],
          },
        ],
        logic: [
          {
            type: ["gravitySuit"],
            counter: 0,
          },
          {
            type: ["spinBoost"],
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
        //TODO
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:153px",
        left: "left:599px",
        requiredLogic: [
          {
            type: ["morphBall", "stormMissiles"],
          },
        ],
        logic: [
          {
            type: ["spinBoost", "bomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "bomb"],
            counter: 0,
          },
          {
            type: ["spinBoost", "crossBomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "crossBomb"],
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
        trick: "IBJ + flashShift",
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam", "plasmaBeam"],
            counter: 0,
          },
          {
            type: ["spaceJump", "plasmaBeam"],
            counter: 0,
          },
          {
            type: ["spinBoost", "plasmaBeam", "flashShift"],
            counter: 0,
          },
          {
            type: ["spaceJump", "grappleBeam", "bomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "grappleBeam", "crossBomb"],
            counter: 0,
          },
          {
            type: ["spaceJump", "grappleBeam", "powerBomb"],
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
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam"],
          },
        ],
        logic: [
          {
            type: ["gravitySuit"],
            counter: 0,
          },
          {
            type: ["spaceJump"],
            counter: 0,
          },
          {
            type: ["spinBoost"],
            counter: 0,
          },
          {
            type: ["speedBooster"],
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
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster", "grappleBeam", "spiderMagnet"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
            counter: 0,
          },
          {
            type: ["crossBomb"],
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
            type: ["spaceJump"],
            counter: 0,
          },
          {
            type: ["speedBooster"],
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
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster"],
          },
        ],
        logic: [
          {
            type: ["bomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["crossBomb", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["powerBomb"],
            counter: 0,
          },
          {
            type: ["screwAttack", "grappleBeam"],
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
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam"],
          },
        ],
        logic: [
          {
            type: ["iceMissiles", "spinBoost"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["grappleBeam", "iceMissiles"],
            counter: 0,
          },
          {
            type: ["speedBooster", "bomb"],
            counter: 0,
          },
          {
            type: ["speedBooster", "crossBomb"],
            counter: 0,
          },
          {
            type: ["speedBooster", "powerBomb"],
            counter: 0,
          },
          {
            type: ["screwAttack", "grappleBeam", "bomb"],
            counter: 0,
          },
          {
            type: ["screwAttack", "grappleBeam", "crossBomb"],
            counter: 0,
          },
          {
            type: ["screwAttack", "grappleBeam", "powerBomb"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
            counter: 0,
          },
          {
            type: ["crossBomb"],
            counter: 0,
          },
          {
            type: ["powerBomb"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["bomb"],
            counter: 0,
          },
          {
            type: ["crossBomb"],
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
        requiredLogic: [
          {
            type: ["morphBall"],
          },
        ],
        logic: [
          {
            type: ["speedBooster", "bomb"],
            counter: 0,
          },
          {
            type: ["speedBooster", "crossBomb"],
            counter: 0,
          },
          {
            type: ["speedBooster", "powerBomb"],
            counter: 0,
          },
          {
            type: ["screwAttack", "grappleBeam", "spaceJump", "powerBomb"],
            counter: 0,
          },
          {
            type: ["screwAttack", "grappleBeam", "spaceJump", "iceMissiles"],
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
      //spinBoost
      if (data[21].logic || data[22].logic) {
        state.locations[18].softlock = false;
      } else {
        state.locations[18].softlock = true;
      }
      //crossBomb area
      if (data[3].logic) {
        let x = rootGetters["items/checkX"];
        if (x) {
          state.locations[0].softlock = false;
          state.locations[19].softlock = false;
        } else {
          state.locations[0].softlock = true;
          state.locations[19].softlock = true;
        }
      } else {
        state.locations[0].softlock = true;
        state.locations[19].softlock = true;
      }
      //iceMissiles
      if (data[19].logic || data[4].logic) {
        state.locations[15].softlock = false;
      } else {
        state.locations[15].softlock = true;
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
