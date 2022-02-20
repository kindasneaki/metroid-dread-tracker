export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:73px",
        left: "left:304px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:122px",
        left: "left:312px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:160px",
        left: "left:269px",
        logic: [],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:170px",
        left: "left:295px",
        logic: [],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:155px",
        left: "left:371px",
        logic: [],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:53px",
        left: "left:463px",
        logic: [],
        inLogic: false,
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:90px",
        left: "left:475px",
        logic: [],
        inLogic: false,
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:172px",
        left: "left:691px",
        logic: [],
        inLogic: false,
      },
      {
        area: "9",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:91px",
        left: "left:728px",
        logic: [],
        inLogic: false,
      },
      {
        area: "10",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:192px",
        left: "left:736px",
        logic: [],
        inLogic: false,
      },
      {
        area: "11",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:32px",
        left: "left:839px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:210px",
        left: "left:379px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:176px",
        left: "left:620px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:254px",
        left: "left:303px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:74px",
        left: "left:572px",
        logic: [],
        inLogic: false,
      },
      {
        area: "4ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:44px",
        left: "left:286px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:122px",
        left: "left:464px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:169px",
        left: "left:755px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:70px",
        left: "left:521px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:210px",
        left: "left:460px",
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
