import store from "@/store"
import axios from "axios";
import { GET_USER } from "../API/firebaseApi";
async function saveScoreResult() {
  const login = store.getters.getLogin
  const score = store.getters.getScore

  const updateScore = await axios.put(GET_USER + login + '/score' + '.json', score);

  console.log(updateScore);
}

export {saveScoreResult};