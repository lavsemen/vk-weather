import { mapGetters } from "vuex"
import axios from "axios"
import { GET_USER } from '@/API/firebaseApi'

export default {
  state: {
    isAuth: false,
    username: 'Гость',
  }, 
  mutations: {
    setUser(state, userName) {
      state.isAuth = true
      state.username = userName
      localStorage.setItem('auth', userName)
    },
    logout(state) {
      state.isAuth = false,
      state.username = 'Гость'
      localStorage.removeItem('auth')
    }
  },
  actions: {
    async userIsAuth({ commit }) {
      if (localStorage.getItem('auth')) {
        try {
          const res = await axios.get(GET_USER + localStorage.getItem('auth') + '.json')
          if (res.status === 200) {
            commit('setUser', localStorage.getItem('auth'))
          }
        } catch(err) {
          console.log(err);
        }
    } else {
      return false
    }
    }
  },
  getters: {
    getUser(state) {
      return state.username
    },
    getAuth(state) {
      return state.isAuth
    }
  }
}