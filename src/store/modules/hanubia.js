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
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:269px",
        left: "left:573px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:216px",
        left: "left:667px",
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
