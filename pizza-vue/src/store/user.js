import fb from 'firebase/app'
import "firebase/auth"

export default {
  state: {
    user: null,
  },
  actions: {
    registerUser ({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true)
      fb.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
          commit('setUser', {
            email,
            id: user.uid
          })
        })
        .catch((error) => {
          commit('setError', error.message)
        })
        .finally(() => commit('setLoading', false))
    },
    loginUser ({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true)
      fb.auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          commit('setError', error.message)
        })
        .finally(() => commit('setLoading', false))
    },
    autoLogin ({commit}) {
      fb.auth()
        .onAuthStateChanged(user => {
          if(user) {
            commit('setUser', {
              id: user.uid,
              email: user.email
            })
          }
        })
    },
    logoutUser ({commit, state}) {
      if(!state.user) return
      fb.auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
        })
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  }
}