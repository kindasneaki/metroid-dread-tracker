export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:191px",
        left: "left:342px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:223px",
        left: "left:301px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:339px",
        left: "left:273px",
        logic: [],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:457px",
        left: "left:372px",
        logic: [],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:509px",
        left: "left:388px",
        logic: [],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:528px",
        left: "left:226px",
        logic: [],
        inLogic: false,
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:591px",
        left: "left:155px",
        logic: [],
        inLogic: false,
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:639px",
        left: "left:669px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:196px",
        left: "left:108px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:669px",
        left: "left:424px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:586px",
        left: "left:195px",
        logic: [],
        inLogic: false,
      },
      {
        area: "4m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:643px",
        left: "left:514px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:316px",
        left: "left:410px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:575px",
        left: "left:426px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:417px",
        left: "left:272px",
        logic: [],
        inLogic: false,
      },
      {
        area: "2ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:706px",
        left: "left:303px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:778px",
        left: "left:434px",
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
