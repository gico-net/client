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
          ) Open on GitHub 
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
      error404: false
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
}
</script>
