<template lang="pug">
  q-page#postNew.w-80.q-mx-auto.q-px-auto
    .w-100.col.self-center
      q-form.row.q-gutter-md.w-100(@submit.prevent="submit" @reset='reset')
          q-input.col-12.bg-white(filled type='text' v-model="form.title" label='標題' label-for="input-title" hint='請輸入問題' lazy-rules
          :error="!rules.title" error-message='標題不能為空' autofocus)
          q-editor.col-12(filled type="textarea" v-model='form.contents' label='內容' label-for="input-contents" hint='請輸入說明' lazy-rules
          :error="!rules.contents" error-message='內容不能為空' :dense="$q.screen.lt.md"
          :toolbar="[[{label:'標題',icon: $q.iconSet.editor.formatting,fixedLabel: true,options: ['p','h1','h2','h3','h4','h5','h6','code']}],[{label:'段落',icon: $q.iconSet.editor.align,fixedLabel: true,options: ['quote', 'unordered', 'ordered', 'outdent', 'indent', 'left', 'center', 'right', 'justify']}],[{label:'字體',icon: $q.iconSet.editor.font,fixedLabel: true,options: ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript']}],[{label:'字型',fixedLabel: true,options: ['default_font','arial','arial_black','comic_sans','courier_new','impact','lucida_grande','times_new_roman','verdana']},'removeFormat'],[{label:'字型大小',icon: $q.iconSet.editor.fontSize,fixedLabel: true,fixedIcon: true,list: 'no-icons',options: ['size-1','size-2','size-3','size-4','size-5','size-6','size-7']}],['token', 'hr', 'link', 'custom_btn'],['undo', 'redo']]"
          :fonts="{arial: 'Arial',arial_black: 'Arial Black',comic_sans: 'Comic Sans MS',courier_new: 'Courier New',impact: 'Impact',lucida_grande: 'Lucida Grande',times_new_roman: 'Times New Roman',verdana: 'Verdana'}"
            )
          //- img-inputer.col-12(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改" style="height:300px")
          br
          div.col-12.row.justify-end
            q-btn.q-ml-sm.col-2(label='送出' type='submit' color='primary')
            q-btn.q-ml-sm.col-2(label='重設' type='reset' color='primary').
      div

</template>
<script>

export default {
  data () {
    return {
      posts: [],
      form: {

        title: '',
        contents: '',
        image: null,
        _id: '',
        author: ''

      }

    }
  },
  computed: {
    rules () {
      const title = this.form.title
      const contents = this.form.contents

      return {

        title: title.length === 0 ? null : title.length >= 0,
        contents: contents.length === 0 ? null : contents.length >= 0
      }
    }
  },
  methods: {
    reset () {
    // 測試表單
      this.form.title = ''
      this.form.contents = ''
      this.form.image = ''
    },
    editPost (index) {
      this.form = {
        title: this.posts[index].title,
        contents: this.posts[index].contents,
        image: this.posts[index].image,
        _id: this.posts[index]._id,
        // date: this.posts[index].date,
        index
      }
    //   this.$bvModal.show('modal-post')
    },
    async submit () {
    //   this.submitDisable = true
      try {
        const fd = new FormData()
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        // 有id就編輯，沒id就新增
        if (this.form._id.length === 0) {
          await this.axios.post('/posts', fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        } else {
          const { data } = await this.axios.patch('/posts/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.posts[this.form.index] = {
            title: this.form.title,
            contents: this.form.contents,
            image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
            _id: this.form._id,
            // 非上課程式碼
            author: this.$store.state.user.account
            // date: Date.now()
          }
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤'
        //   text: error.response.data.message
        })
        console.log(error)
      }
      this.submitDisable = false
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/posts')
      this.posts = data.result.map(post => {
        if (post.image) {
          post.image = `${process.env.VUE_APP_API}/files/${post.image}`
        }
        return post
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
