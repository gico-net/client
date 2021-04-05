<template lang="pug">
  main
    header-blue
    b-container(v-if="loading")
      b-overlay(:show="true" spinner-large)
    b-container(v-else)
      .commit.no-hover
        h1 {{ user }}/
          span.secondary {{ name }}
          b-button.open-github(
            :href="'https://github.com/'+user+'/'+name"
            variant="outline-dark" target="_new"
          ) Open in GitHub 
            i.fab.fa-github
      section(v-if="commits.length > 0")
        .commit.no-hover
          h2 Commits found: {{ (commits.length == 1000)?"1000+":commits.length }}
        commit-card(
          v-for="i in commits" :key="i.hash" :data="i"
          :author="emails[i.author_email]"
          :committer="emails[i.committer_email]"
          :expand="true"
        )
      section(v-else)
        b-modal#new-repo(
          @ok="add_new_repo()"
          ok-title="Add"
          ok-variant="outline-success"
          cancel-variant="outline-dark"
        )
          <template #modal-title>Add {{ user }}/{{ name }} on Gico!</template>
          b-form-group(label="Insert the branch name")
            b-form-input(v-model="form.branch" placeholder="main")
        .commit.no-hover
          b-button(variant="outline-success" v-b-modal.new-repo)
            | Add this repository on Gico 
            i.fas.fa-plus
</template>

<script>
import HeaderBlue from '@/components/HeaderBlue';
import Commit from '@/components/Commit';

export default {
  name: "Repository",
  props: ["user", "name"],
  components: {
    'header-blue': HeaderBlue,
    'commit-card': Commit,
  },
  data() {
    return {
      form: {
        branch: undefined
      }
    }
  },
  async mounted() {
    this.$store.dispatch('set_loading', true);
    this.$store.dispatch('get_repo_commits', {user: this.user, name: this.name});
    this.$store.dispatch('get_emails');
  },
  computed: {
    loading: function() {
      return this.$store.getters.loading;
    },
    commits: function() {
      return this.$store.getters.commits;
    },
    emails: function() {
      return this.$store.getters.emails;
    },
  },
  methods: {
    add_new_repo() {
      this.$store.dispatch('add_repo', {
        url: `github.com/${this.user}/${this.name}`,
        branch: this.form.branch || "main"
      }).then(response => {
        if(response.detail) {
          this.$bvToast.toast(response.detail, {
            title: 'Error!',
            autoHideDelay: 5000,
            variant: 'danger',
            appendToast: true
          })
        } else if(response.id) {
          this.$bvToast.toast(response.url, {
            title: 'Repository created!',
            autoHideDelay: 5000,
            variant: 'success',
            appendToast: true
          })
          window.setTimeout(() => {
            window.location.href="/repo/"+response.url
          }, 1000)
        } else {
          this.$bvToast.toast("", {
            title: 'Error!',
            autoHideDelay: 5000,
            variant: 'danger',
            appendToast: true
          })
        }
      })

    }
  }
}
</script>
