<template lang="pug">
  main
    header-blue
    b-container(v-if="loading")
      b-overlay(:show="true" spinner-large)
    b-container(v-else)
      .commit.no-hover
        h2 Commits found {{ commits.length }}
      .commit.no-hover(style="padding: 50px" v-if="loading")
        b-overlay(:show="true" spinner-large)
      commit-card(
        v-else
        v-for="i in commits" :key="i.hash" :data="i"
        :author="emails[i.author_email]"
        :committer="emails[i.committer_email]"
      )
</template>

<script>
import HeaderBlue from '@/components/HeaderBlue';
import Commit from '@/components/Commit';

export default {
  name: "Commit",
  props: ["hash"],
  components: {
    'header-blue': HeaderBlue,
    'commit-card': Commit,
  },
  mounted() {
    this.$store.dispatch('get_commits', this.$route.query.q);
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
