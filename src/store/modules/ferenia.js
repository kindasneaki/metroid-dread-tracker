export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:163px",
        left: "left:307px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:216px",
        left: "left:363px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:221px",
        left: "left:394px",
        logic: [],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:169px",
        left: "left:414px",
        logic: [],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:155px",
        left: "left:737px",
        logic: [],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:248px",
        left: "left:963px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:102px",
        left: "left:365px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:327px",
        left: "left:427px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:344px",
        left: "left:672px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:179px",
        left: "left:688px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:253px",
        left: "left:305px",
        logic: [],
        inLogic: false,
      },
      {
        area: "4ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:270px",
        left: "left:907px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:156px",
        left: "left:547px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:310px",
        left: "left:546px",
        logic: [],
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
        let counter = 0;
        let logicLength = state.locations[i].logic.length;
        let inLogic = false;
        state.locations[i].logic.forEach((element) => {
          data.find((value) => {
            if (value.type === element) {
              if (value.logic) {
                counter++;
                if (logicLength === counter) {
                  return true;
                }
              }
            }
          });
        });
        if (logicLength <= counter) {
          inLogic = true;
        }
        const payload = { index: i, logic: inLogic };
        commit("UPDATE_LOGIC", payload);
      }
    },
  },
  namespaced: true,
};
