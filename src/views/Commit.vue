<template lang="pug">
  main
    header-blue
    b-container(v-if="loading")
      b-overlay(:show="true" spinner-large)
    b-container(v-else)
      .commit(v-if="error404")
        h2 Commit not found
      commit-card(
        :data="commit"
        :author="author_avatar"
        :committer="committer_avatar"
        :expand="true" v-else
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
  data() {
    return {
      error404: false
    }
  },
  async mounted() {
    this.$store.dispatch('set_loading', true);
    await this.$store.dispatch('get_commit', this.hash);
    if(this.commit.detail) {
      this.error404 = true;
    } else {
      await this.$store.dispatch('get_email',
                          {type: 'author', email: this.commit.author_email});
      if(this.commit.author_email != this.commit.committer_email) {
        await this.$store.dispatch('get_email',
                          {type: 'committer', email: this.commit.committer_email});
      } else {
        await this.$store.dispatch('set_committer', this.author_avatar)
      }
    }
    this.$store.dispatch('set_loading', false);
  },
  computed: {
    loading: function() {
      return this.$store.getters.loading;
    },
    commit: function() {
      return this.$store.getters.commit;
    },
    author_avatar: function() {
      return this.$store.getters.author_avatar;
    },
    committer_avatar: function() {
      return this.$store.getters.committer_avatar;
    },
  },
}
</script>
