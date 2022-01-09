export default {
  state: {
    locations: [
      {
        area: "left",
        checked: false,
        type: "missiles",
        amount: 2,
      },
      {
        area: "right",
        checked: false,
        type: "missiles",
        amount: 10,
      },
      {
        area: "top",
        checked: false,
        type: "energyPart",
        amount: 1,
      },
      {
        area: "bottom",
        checked: false,
        type: "powerBomb",
        amount: 1,
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
