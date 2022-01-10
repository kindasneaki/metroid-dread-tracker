export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:331px",
        left: "left:342px",
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:363px",
        left: "left:301px",
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:479px",
        left: "left:273px",
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:597px",
        left: "left:372px",
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:649px",
        left: "left:388px",
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:668px",
        left: "left:226px",
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:731px",
        left: "left:155px",
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "top:779px",
        left: "left:669px",
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "top:21em",
        left: "left:108px",
      },
      {
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "top:809px",
        left: "left:424px",
      },
      {
        area: "3m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "top:726px",
        left: "left:195px",
      },
      {
        area: "4m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "top:783px",
        left: "left:514px",
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "top:456px",
        left: "left:410px",
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "top:715px",
        left: "left:426px",
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "top:557px",
        left: "left:272px",
      },
      {
        area: "2ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "top:846px",
        left: "left:303px",
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "top:918px",
        left: "left:434px",
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
