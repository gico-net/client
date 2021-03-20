<template lang="pug">
  .top-author
    .user
      img(:src="'https://gravatar.com/avatar/'+avatar" :alt="data.author_email")
      strong(:title="data.author_email")
        | {{ data.author_name }} <{{ data.author_email }}>
    .number
      h2 {{ data.num }}
</template>

<script>
export default {
  name: "TopAuthor",
  props: ['data', 'avatar'],
}
</script>
