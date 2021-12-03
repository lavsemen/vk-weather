export default {
  state: {
    score: 0
  },
  mutations: {
    incrementScore(state) {
      state.score += 2;
    },
    dicrementScore(state) {
      state.score--
    },
    setScore(state, score) {
      state.score = score
    }
  },
  actions: {
  
  },
  getters: {
    getScore(state) {
      return state.score
    }
  }
}