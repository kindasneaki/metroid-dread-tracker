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
        logic: [
          {
            type: [
              "morphBall",
              "powerBomb",
              "speedBooster",
              "grappleBeam",
              "waveBeam",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "powerBomb",
              "spaceJump",
              "grappleBeam",
              "waveBeam",
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
        top: "margin-top:269px",
        left: "left:573px",
        logic: [
          {
            type: ["morphBall", "bomb", "grappleBeam", "screwAttack"],
            counter: 0,
          },
          {
            type: ["morphBall", "crossBomb", "grappleBeam", "screwAttack"],
            counter: 0,
          },
          {
            type: ["morphBall", "powerBomb", "grappleBeam", "screwAttack"],
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
        logic: [
          {
            type: [
              "morphBall",
              "bomb",
              "speedBooster",
              "screwAttack",
              "waveBeam",
            ],
            counter: 0,
          },
          {
            type: [
              "morphBall",
              "crossBomb",
              "speedBooster",
              "screwAttack",
              "waveBeam",
            ],
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
        logic: [
          {
            type: ["morphBall", "speedBooster", "bomb", "screwAttack"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "crossBomb", "screwAttack"],
            counter: 0,
          },
          {
            type: ["morphBall", "speedBooster", "powerBomb", "screwAttack"],
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
