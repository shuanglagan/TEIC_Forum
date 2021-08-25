<template lang="pug">

  q-page-container
    q-list.row.justify-around
      q-item.q-px-xl.col-3(to="/admin/posts" exact exact-active-class="active") adminPosts
      q-item.q-px-xl.col-3(to="/admin/comments" exact exact-active-class="active") adminComments
    //- q-card.overflow-auto(flat bordered)
    //-   q-card-section(v-html='postText' scroll)
    q-form.q-gutter-md(@submit.prevent="submit" @reset='reset'
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        )
        q-editor(v-model="form.editor" lazy-rules :error="!rules.editor" error-message='欄位不能為空')
        div.row.justify-end
          q-btn.col-2(label='送出' type='submit' color='primary')
          q-btn.col-2(label='重設' type='reset' color='primary' flat).

    //- router-view
</template>

<script>
// import Editor from 'components/Editor.vue'
export default {
//   components: { Editor },
  data () {
    return {
    //   posts: [],
      form: {
        editor: ''
      },
      url: process.env.VUE_APP_API
    }
  },
  computed: {
    rules () {
      const editor = this.form.editor
      return {
        editor: editor.length === 0 ? null : editor.length >= 0 && editor.length <= 10000
      }
    }
  },
  methods: {
    reset () {
      this.form.editor = ''
    },
    async submit () {
      try {
        await this.axios.post('/posts', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '送出成功'
        })
        this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: error.response.data.message
        })
      }
    }
  }
}

</script>
