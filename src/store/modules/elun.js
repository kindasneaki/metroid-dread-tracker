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
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:216px",
        left: "left:897px",
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:146px",
        left: "left:702px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:147px",
        left: "left:982px",
      },
    ],
  },
  mutations: {
    UPDATE_AREA(state, location, index) {
      !this.locations[index].checked;
    },
  },
  actions: {
    updateArea({ commit }, location, index) {
      console.log(location, index);
      commit("UPDATE_AREA", location, index);
    },
  },
  namespaced: true,
};
