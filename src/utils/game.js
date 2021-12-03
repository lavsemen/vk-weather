import store from "@/store"
import axios from "axios";
import { GET_USER } from "../API/firebaseApi";
async function saveScoreResult() {
  const login = store.getters.getLogin
  const score = store.getters.getScore
  await axios.put(GET_USER + login + '/score' + '.json', score);
}

async function getSocreResult() {
  const login = store.getters.getLogin
  const score = await axios.get(GET_USER + login + '/score' + '.json');

  store.commit('setScore', score.data);
}

export {saveScoreResult, getSocreResult};