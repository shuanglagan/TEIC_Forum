<template lang="pug">
  .q-pa-md.q-gutter-sm(style='max-width: 350px')
    q-list(bordered separator)
      q-item(clickable v-ripple)
        q-item-section AdminComments

    q-editor(v-model='editor' min-height='5rem')
      q-card(flat bordered)
        q-card-section
          pre(style='white-space: pre-line') {{ editor }}
      q-card(flat bordered)
        q-card-section(v-html='editor').

</template>

<script>

export default {
  setup () {
    return {
      editor: ''
    }
  }
}
</script>
