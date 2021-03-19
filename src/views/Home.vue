<template lang="pug">
  main
    header-blue
    b-container
      h2 List of commits
</template>

<script>
import HeaderBlue from '@/components/HeaderBlue';

export default {
  name: "Home",
  components: {
    'header-blue': HeaderBlue,
  },
  mounted() {
    this.$store.dispatch('get_commits');
    this.$store.dispatch('get_emails');
  },
  computed: {
    commits: () => {
      return this.$store.getters.commits;
    },
    emails: () => {
      return this.$store.getters.emails;
    },
  }
}
</script>
