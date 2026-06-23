import { createStore } from "vuex";
import artaria from "./modules/artaria";
import cataris from "./modules/cataris";
import dairon from "./modules/dairon";
import burenia from "./modules/burenia";
import ferenia from "./modules/ferenia";
import ghavoran from "./modules/ghavoran";
import elun from "./modules/elun";
import hanubia from "./modules/hanubia";
import items from "./modules/items";
import logic from "./modules/logic";

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
    // MIG-02: add dispatch + rootGetters to context so we can fire the flag-guarded
    // logic/recompute when a map pickup (missile/energy/power-bomb/major) is collected.
    // This is the chokepoint for minor-ammo collection (Artaria.vue → addAbility →
    // dispatch("updateAbility")), which mutates the root counters the engine reads.
    // All existing SET_ABILITY/ROTATE_ENERGY/FIX_ENERGY behaviour is untouched.
    updateAbility({ commit, dispatch, rootGetters }, { amount, type }) {
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
      // MIG-02: after counter mutation, trigger the new engine when the flag is ON.
      // When OFF, this branch is skipped — byte-for-byte identical to legacy behaviour.
      if (rootGetters["logic/useRandovaniaLogic"]) {
        dispatch("logic/recompute", null, { root: true });
      }
    },
  },
  modules: {
    artaria,
    cataris,
    dairon,
    burenia,
    ferenia,
    ghavoran,
    elun,
    hanubia,
    items,
    logic,
  },
  getters: {},
});
