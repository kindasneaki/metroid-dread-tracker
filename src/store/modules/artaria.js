export default {
  state: {
    locations: [
      {
        area: "1",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:246px",
        left: "left:28px",
        logic: [
          {
            type: ["chargeBeam", "morphBall"],
            counter: 0,
          },
          {
            type: ["spinBoost", "screwAttack"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "2",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:246px",
        left: "left:139px",
        logic: [],
        inLogic: false,
      },
      {
        area: "3",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:290px",
        left: "left:132px",
        logic: [],
        inLogic: false,
      },
      {
        area: "4",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:270px",
        left: "left:187px",
        logic: [],
        inLogic: false,
      },
      {
        area: "5",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:220px",
        left: "left:242px",
        logic: [],
        inLogic: false,
      },
      {
        area: "6",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:147px",
        left: "left:298px",
        logic: [],
        inLogic: false,
      },
      {
        area: "7",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:354px",
        left: "left:378px",
        logic: [
          {
            type: ["morphBall"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "8",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:320px",
        left: "left:407px",
        logic: [
          {
            type: ["grappleBeam"],
            counter: 0,
          },
          {
            type: ["spiderMagnet"],
            counter: 0,
          },
          {
            type: ["spaceJump"],
            counter: 0,
          },
          {
            type: ["spinBoost"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "9",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:197px",
        left: "left:395px",
        logic: [],
        inLogic: false,
      },
      {
        area: "10",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:252px",
        left: "left:511px",
        logic: [],
        inLogic: false,
      },
      {
        area: "11",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:163px",
        left: "left:518px",
        logic: [],
        inLogic: false,
      },
      {
        area: "12",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:224px",
        left: "left:604px",
        logic: [],
        inLogic: false,
      },
      {
        area: "13",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:159px",
        left: "left:648px",
        logic: [],
        inLogic: false,
      },
      {
        area: "14",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:269px",
        left: "left:682px",
        logic: [],
        inLogic: false,
      },
      {
        area: "15",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:172px",
        left: "left:726px",
        logic: [],
        inLogic: false,
      },
      {
        area: "16",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:245px",
        left: "left:728px",
        logic: [],
        inLogic: false,
      },
      {
        area: "17",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:181px",
        left: "left:748px",
        logic: [],
        inLogic: false,
      },
      {
        area: "18",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:240px",
        left: "left:769px",
        logic: [],
        inLogic: false,
      },
      {
        area: "19",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:191px",
        left: "left:810px",
        logic: [],
        inLogic: false,
      },
      {
        area: "20",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:172px",
        left: "left:828px",
        logic: [],
        inLogic: false,
      },
      {
        area: "21",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:155px",
        left: "left:966px",
        logic: [],
        inLogic: false,
      },
      {
        area: "22",
        checked: false,
        type: "missiles",
        amount: 2,
        top: "margin-top:209px",
        left: "left:319px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:323px",
        left: "left:324px",
        logic: [
          {
            type: ["speedBoost", "morphBall"],
            counter: 0,
          },
          {
            type: ["speedBoost", "slide"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "2m",
        checked: false,
        type: "missiles",
        amount: 10,
        top: "margin-top:95px",
        left: "left:365px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:326px",
        left: "left:266px",
        logic: [
          {
            type: ["slide"],
            counter: 0,
          },
          {
            type: ["morphBall"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "2ep",
        checked: false,
        type: "energyPart",
        amount: 1,
        top: "margin-top:195px",
        left: "left:230px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:367px",
        left: "left:624px",
        logic: [
          {
            type: ["slide"],
            counter: 0,
          },
          {
            type: ["morphBall"],
            counter: 0,
          },
        ],
        inLogic: false,
      },
      {
        area: "2ef",
        checked: false,
        type: "energyFull",
        amount: 1,
        top: "margin-top:69px",
        left: "left:215px",
        logic: [],
        inLogic: false,
      },
      {
        area: "1pb",
        checked: false,
        type: "powerBomb",
        amount: 1,
        top: "margin-top:193px",
        left: "left:436px",
        logic: [],
        inLogic: false,
      },
      {
        area: "charge",
        checked: false,
        type: "chargeBeam",
        amount: 1,
        top: "margin-top: 373px",
        left: "left: 341px",
        logic: [],
        inLogic: false,
      },
      {
        area: "whiteEMMI",
        checked: false,
        type: "whiteEMMI",
        amount: 1,
        top: "margin-top: 293px",
        left: "left: 643px",
        logic: [],
        inLogic: false,
      },
      {
        area: "corpius",
        checked: false,
        type: "phantomCloak",
        amount: 1,
        top: "margin-top: 225px",
        left: "left: 817px",
        logic: [],
        inLogic: false,
      },
      {
        area: "majorScrewAttack",
        checked: false,
        type: "majorScrewAttack",
        amount: 1,
        top: "margin-top: 272px",
        left: "left: 140px",
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
        // for (let k = 0; k < state.locations[i].logic.length; k++) {
        let originalLength = state.locations[i].logic.length;
        let inLogic = false;
        state.locations[i].logic.forEach((element) => {
          let logicLength = element.type.length;
          for (let k = 0; k < element.type.length; k++) {
            data.find((value) => {
              console.log(element.counter);

              if (value.type === element.type[k]) {
                console.log(value.type, element.type[k]);
                console.log("true");
                if (value.logic) {
                  element.counter++;
                  if (logicLength === element.counter) {
                    inLogic = true;
                    return true;
                  }
                }
              }
            });
          }
          for (let k = 0; k < element.type.length; k++) {
            element.counter = 0;
          }
        });

        if (originalLength === 0) {
          inLogic = true;
        }
        const payload = { index: i, logic: inLogic };
        commit("UPDATE_LOGIC", payload);
        // }
      }
    },
  },
  namespaced: true,
};
