import { createStore } from "vuex";
import arteria from "./modules/artaria";

export default createStore({
  state: {
    missiles: 0,
    energyPart: 0,
    energyFull: 0,
    powerBomb: 0,
  },
  mutations: {
    SET_MISSILE(state, amount) {
      state.missiles += amount;
    },
  },
  actions: {
    updateMissiles({ commit }, amount) {
      commit("SET_MISSILE", amount);
    },
  },
  modules: {
    arteria: arteria,
  },
  getters: {},
});
