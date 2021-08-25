<template lang="pug">
.q-ma-md
    .row.justify-around
        q-btn.col-md-auto.col-2(label='建立新貼文' color='primary' @click='form.card = true')
          q-dialog(v-model='form.card' persistent)
            //- q-form.row.q-gutter-md.q-pt-xl(@submit.prevent="submit" @reset='reset')
            q-card(style='min-width: 650px')
              q-card-section
                .text-h6.text-bold 標題
                q-input.col-12(filled type='text' v-model="form.title" label='標題' label-for="input-title" autofocus )
              q-card-section
                .text-h6.text-bold 內容
                q-editor.col-12(filled type="textarea" v-model='form.contents' label='內容' label-for="input-contents" hint='請輸入說明'
                :toolbar="[[{label:'標題',icon: $q.iconSet.editor.formatting,fixedLabel: true,options: ['p','h1','h2','h3','h4','h5','h6','code']}],[{label:'段落',icon: $q.iconSet.editor.align,fixedLabel: true,options: ['quote', 'unordered', 'ordered', 'outdent', 'indent', 'left', 'center', 'right', 'justify']}],[{label:'字體',icon: $q.iconSet.editor.font,fixedLabel: true,options: ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript']}],[{label:'字型',fixedLabel: true,options: ['default_font','arial','arial_black','comic_sans','courier_new','impact','lucida_grande','times_new_roman','verdana']},'removeFormat'],['token', 'hr', 'link', 'custom_btn'],['undo', 'redo']]"
                :fonts="{arial: 'Arial',arial_black: 'Arial Black',comic_sans: 'Comic Sans MS',courier_new: 'Courier New',impact: 'Impact',lucida_grande: 'Lucida Grande',times_new_roman: 'Times New Roman',verdana: 'Verdana'}"
                  )
              q-card-section
                .text-h6.text-bold 附加圖片
                img-inputer.col-12.justify-center(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改" style="height:200px width:100%")
                br
                //- div.col-12.row.justify-end
                //-   q-btn.q-ml-sm.col-2(label='送出' type='submit' color='primary')
                //-   q-btn.q-ml-sm.col-2(label='重設' type='reset' color='primary').
              q-card-actions.text-primary(align='right')
                q-btn.q-ml-sm.col-2(label='送出' type='submit' color='primary')
                q-btn.q-ml-sm.col-2(label='重設' type='reset' color='primary')
                q-btn.q-ml-sm.col-2(flat label='取消' color='primary'          v-close-popup).

          //-     q-card-actions.text-primary(align='right')
          //-       q-btn(flat label='送出' type='submitC' v-close-popup)
          //-       q-btn(flat label='重設' type='resetC' )
          //-       q-btn(flat label='取消'                v-close-popup).

</template>

<script>

export default {
  data () {
    return {
      posts: [],
      form: {
        card: false,
        title: '',
        contents: '',
        image: null,
        _id: ''

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
            _id: this.form._id
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
