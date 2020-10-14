import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: '',
      email: '',
      token: '',
    },
    friends: []
  },
  mutations: {
    addFriend (state, name, id) {
      state.friends.push(
          {
            name: name,
            id: id
          }
      )
    }
  },
  actions: {
    addFriend ({commit}, name, id) {
      commit("addFriend", name, id)
    }
  },
  modules: {
  }
})
