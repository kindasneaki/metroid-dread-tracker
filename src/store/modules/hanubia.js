export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:155px",
        left: "left:647px",
        requiredLogic: [
          {
            type: ["morphBall", "powerBomb", "grappleBeam", "waveBeam"],
          },
        ],
        logic: [
          {
            type: ["speedBooster"],
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
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:269px",
        left: "left:573px",
        requiredLogic: [
          {
            type: ["morphBall", "grappleBeam", "screwAttack"],
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
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:216px",
        left: "left:667px",
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster", "screwAttack", "waveBeam"],
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
        area: "power",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:282px",
        left: "left:829px",
        softlock: true,
        requiredLogic: [
          {
            type: ["morphBall", "speedBooster", "screwAttack"],
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
