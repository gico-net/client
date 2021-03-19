import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: process.env.VUE_APP_BACKEND_URL,
    commits: [],
    emails: {},
  },
  get: {
    commits: state => {
      return state.commits
    },
    emails: state => {
      return state.emails
    },
  },
  mutations: {
    load_commits: (state, value) => {
      state.commits = value
    },
    load_emails: (state, value) => {
      console.log(JSON.stringify(value))
      state.emails = value
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
    // Get all emails and map them like an hash
    async get_emails({commit}) {
      await fetch(`${this.state.api}/email/`)
        .then(async response => {
          const emails_list = await response.json();
          const emails_obj = emails_list
                                .reduce((dict, elem) => {
                                  dict[elem['email']] = elem['hash_md5']
                                  return dict;
                                }, {})

          commit('load_emails', emails_obj);
        })
    },
  },
  modules: {
  }
})
