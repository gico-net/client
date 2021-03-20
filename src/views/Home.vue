<template lang="pug">
  main
    header-blue
    b-container
      b-row#home
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
        b-col(md="4" sm="12")
          h2 Top authors
          b-list-group
            b-list-group-item(v-if="loading_top_authors")
              b-overlay(:show="true" spinner-large)
            b-list-group-item(
              v-else v-for="author in top_authors.slice(0, 7)" :key="author.email"
              button
            )
              author(
                :data="author"
                :avatar="emails[author.author_email]"
              )
</template>

<script>
import HeaderBlue from '@/components/HeaderBlue';
import Commit from '@/components/Commit';
import TopAuthor from '@/components/TopAuthor';

export default {
  name: "Home",
  components: {
    'header-blue': HeaderBlue,
    'commit-card': Commit,
    'author': TopAuthor,
  },
  mounted() {
    this.$store.dispatch('get_commits');
    this.$store.dispatch('get_emails');
    this.$store.dispatch('get_top_authors');
  },
  computed: {
    commits: function() {
      return this.$store.getters.commits;
    },
    emails: function() {
      return this.$store.getters.emails;
    },
    top_authors: function() {
      return this.$store.getters.top_authors;
    },
    loading: function() {
      return this.$store.getters.loading;
    },
    loading_top_authors: function() {
      return this.$store.getters.loading_top_authors;
    }
  }
}
</script>
