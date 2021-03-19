<template lang="pug">
  .commit(:id="data.hash")
    .repo
      a(
        :href="'/repo/'+data.repository_url" :title="data.repository_url"
      ) {{ data.repository_url }}

    .head
      h5
        a(:href="'/commit/'+data.hash") {{ data.hash }}
      div
        span.tree tree:
        h6
          a(:href="'/commit/'+data.tree") {{ data.tree }}

    .author_committer
      div
        img.avatar(
          :src="'https://gravatar.com/avatar/'+author"
          :alt="data.author_email"
        )
        p Author: 
          b(:title="data.author_email") {{ data.author_name }} 
            | <{{data.author_email}}></b>
      div
        img.avatar(
          :src="'https://gravatar.com/avatar/'+committer"
          :alt="data.committer_email"
        )
        p Committer: 
          b(:title="data.committer_email") {{ data.committer_name }} 
            | <{{data.committer_email}}></b>

    .text
      p
        | {{ first_line(data.text) }}
        span.middot ·
        span.date {{ data.date | moment("ddd, D MMM YYYY HH:mm:ss ZZ") }}
</template>

<script>
export default {
  name: 'Commit',
  // `author` is the hash md5 of the author's gravatar
  // `committer` is the hash md5 of the committer's gravatar
  props: ['data', 'author', 'committer'],
  methods: {
    first_line(text) {
      return text.split('\n')[0]
    }
  }
}
</script>
