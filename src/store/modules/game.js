export default {
 state: {
  score: 0
 },
 mutations: {
  incrementScore(state) {
    state.score++
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