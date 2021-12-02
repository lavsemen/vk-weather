import { mapGetters } from "vuex"
import axios from "axios"
import { GET_USER } from '@/API/firebaseApi'

export default {
  state: {
    isAuth: false,
    username: 'Гость',
    login: '',
  }, 
  mutations: {
    setUser(state, user) {
      state.isAuth = true
      state.username = user.username
      state.login = user.login
      localStorage.setItem('auth', user.login)
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
          const user = res.data
          if (res.status === 200) {
            commit('setUser', user)
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
    },
    getLogin(state) {
      return state.login
    }
  }
}