import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: process.env.VUE_APP_BACKEND_URL,
    commits: [],
  },
  get: {
    commits: state => {
      return state.commits
    },
  },
  mutations: {
    load_commits: (state, value) => {
      state.commits = value
    },
  },
  actions: {
    // Get all commits from the api backend
    async get_commits({commit}) {
      await fetch(`${this.state.api}/commit/`)
        .then(async response => {
          commit('load_commits', await response.json());
        })
    },
  },
  modules: {
  }
})
