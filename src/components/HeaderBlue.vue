<template lang="pug">
  header
    b-container
      h1
        a(href="/" rel="home") Gico
      b-form(action="/search")
        b-form-group
          b-input(placeholder="Search a commit" name="q")
        b-form-group
          b-button(variant="primary" type="submit") Go
</template>

<script>
export default {
  name: "HeaderBlue",
}
</script>
