export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:73px",
        left: "left:921px",
        logic: [
          {
            type: [
              "morphBall",
              "speedBooster",
              "grappleBeam",
              "powerBomb",
              "spiderMagnet",
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
        top: "margin-top:216px",
        left: "left:897px",
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
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:126px",
        left: "left:773px",
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
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:147px",
        left: "left:982px",
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
        area: "plasma",
        checked: false,
        type: "plasmaBeam",
        amount: 1,
        top: "margin-top:229px",
        left: "left:863px",
        softlock: true,
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
      //plasmaBeam
      if (data[15].logic || data[16].logic) {
        state.locations[4].softlock = false;
      } else {
        state.locations[4].softlock = true;
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
