import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: process.env.VUE_APP_BACKEND_URL,
    loading: false,
    loading_top_authors: false,
    commits: [],
    top_authors: [],
    emails: {},
    commit_data: {},
    author_avatar: "",
    committer_avatar: "",
  },
  getters: {
    loading: state => {
      return state.loading
    },
    loading_top_authors: state => {
      return state.loading_top_authors
    },
    commits: state => {
      return state.commits
    },
    top_authors: state => {
      return state.top_authors
    },
    emails: state => {
      return state.emails
    },
    commit: state => {
      return state.commit_data
    },
    author_avatar: state => {
      return state.author_avatar
    },
    committer_avatar: state => {
      return state.committer_avatar
    },
  },
  mutations: {
    loading_state: (state, value) => {
      state.loading = value
    },
    loading_top_authors_state: (state, value) => {
      state.loading_top_authors = value
    },
    load_commits: (state, value) => {
      state.commits = value
    },
    load_top_authors: (state, value) => {
      state.top_authors = value
    },
    load_emails: (state, value) => {
      state.emails = value
    },
    load_commit: (state, value) => {
      state.commit_data = value
    },
    load_author_avatar: (state, value) => {
      state.author_avatar = value.hash_md5
    },
    load_committer_avatar: (state, value) => {
      state.committer_avatar = value.hash_md5
    },
  },
  actions: {
    // Get all commits from the api backend
    async get_commits({commit}) {
      commit('loading_state', true)
      await fetch(`${this.state.api}/commit/`)
        .then(async response => {
          commit('load_commits', await response.json());
        })
      commit('loading_state', false)
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
    /// Get the ranking of commits authors
    async get_top_authors({commit}) {
      commit('loading_top_authors_state', true)
      await fetch(`${this.state.api}/commit/top/`)
        .then(async response => {
          commit('load_top_authors', await response.json());
        })
      commit('loading_top_authors_state', false)
    },
    // Get commit by hash
    async get_commit({commit}, hash) {
      await fetch(`${this.state.api}/commit/${hash}/`)
        .then(async response => {
          commit('load_commit', await response.json());
        })
    },
    // Get email
    async get_email({commit}, data) {
      await fetch(`${this.state.api}/email/search/?q=${data.email}`)
        .then(async response => {
          if(await response.status == 200) {
            commit(`load_${data.type}_avatar`, await response.json());
          }
        })
    },
    // Set committer avatar
    async set_committer({commit}, avatar) {
      commit('load_committer_avatar', avatar);
    },
    // Set loading state
    async set_loading({commit}, status) {
      commit('loading_state', status);
    }
  },
  modules: {
  }
})
