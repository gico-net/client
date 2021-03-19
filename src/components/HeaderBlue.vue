<template lang="pug">
  header(:class="{active: loading}")
    #big-loading(v-if="loading")
      b-overlay(:show="true" spinner-large)
    b-container
      h1
        a(href="/" rel="home") Gico
</template>

<script>
export default {
  name: "HeaderBlue",
  computed: {
    loading: function() {
      return this.$store.getters.loading;
    },
  }
}
</script>
