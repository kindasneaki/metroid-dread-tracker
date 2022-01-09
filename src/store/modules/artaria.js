const state = {
  locations: [
    {
      area: "left",
      checked: false,
    },
    {
      area: "right",
      checked: false,
    },
    {
      area: "top",
      checked: false,
    },
    {
      area: "bottom",
      checked: false,
    },
  ],
};
const mutations = {
  UPDATE_AREA(state, location, index) {
    !this.locations[index].checked;
  },
};
const actions = {
  updateArea({ commit }, location, index) {
    console.log(location, index);
    commit("UPDATE_AREA", location, index);
  },
};
export default {
  state,
  mutations,
  actions,
};
