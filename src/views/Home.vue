<template lang="pug">
  main
    header-blue
    b-container
      b-row
        b-col(md="8" sm="12")
          h2 List of commits
          section#commits
            .commit(style="padding: 50px" v-if="loading")
              b-overlay(:show="true" spinner-large)
            commit-card(
              v-else
              v-for="i in commits" :key="i.hash" :data="i"
              :author="emails[i.author_email]"
              :committer="emails[i.committer_email]"
            )
        b-col
</template>

<script>
import HeaderBlue from '@/components/HeaderBlue';
import Commit from '@/components/Commit';

export default {
  name: "Home",
  components: {
    'header-blue': HeaderBlue,
    'commit-card': Commit,
  },
  mounted() {
    this.$store.dispatch('get_commits');
    this.$store.dispatch('get_emails');
  },
  computed: {
    commits: function() {
      return this.$store.getters.commits;
    },
    emails: function() {
      return this.$store.getters.emails;
    },
    loading: function() {
      return this.$store.getters.loading;
    }
  }
}
</script>
