export default {
  state: {
    locations: [
      {
        area: "left",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:406px",
        left: "left:28px",
      },
      {
        area: "right",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "top:488px",
        left: "left:324px",
      },
      {
        area: "top",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "top:229px",
        left: "left:215px",
      },
      {
        area: "bottom",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "top:350px",
        left: "left:436px",
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
