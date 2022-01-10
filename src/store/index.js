import { createStore } from "vuex";
import arteria from "./modules/artaria";
import cataris from "./modules/cataris";
import dairon from "./modules/dairon";
import burenia from "./modules/burenia";
import ferenia from "./modules/ferenia";
import ghavoran from "./modules/ghavoran";
import elun from "./modules/elun";
import hanubia from "./modules/hanubia";

export default createStore({
  state: {
    missiles: 0,
    energyPart: 0,
    energyFull: 0,
    powerBomb: 0,
  },
  mutations: {
    SET_ABILITY(state, { amount, type }) {
      state[type] += amount;
    },
    ROTATE_ENERGY(state) {
      state.energyPart = 0;
    },
    FIX_ENERGY(state) {
      state.energyPart += 4;
      state.energyFull -= 1;
    },
  },
  actions: {
    updateAbility({ commit }, { amount, type }) {
      if (type === "energyPart") {
        let result = (this.state.energyPart + amount) / 4;
        if (result === 1) {
          type = "energyFull";
          commit("ROTATE_ENERGY");
        } else if (result < 0) {
          commit("FIX_ENERGY");
        }
      }
      commit("SET_ABILITY", { amount, type });
    },
  },
  modules: {
    arteria,
    cataris,
    dairon,
    burenia,
    ferenia,
    ghavoran,
    elun,
    hanubia,
  },
  getters: {},
});
