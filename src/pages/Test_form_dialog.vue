<template lang="pug">
.q-ma-md
    .row.justify-around
        q-btn.col-md-auto.col-2(label='card' color='primary' @click='form.card = true')
          q-dialog(v-model='form.card' persistent)
            q-card(style='min-width: 350px')
              q-card-section
                q-input.col-12(filled type='text' v-model="form.title" label='標題' label-for="input-title" hint='請輸入問題' lazy-rules
                :error="!rules.title" error-message='標題不能為空' autofocus)
                q-editor.col-12(filled type="textarea" v-model='form.contents' label='內容' label-for="input-contents" hint='請輸入說明' lazy-rules
                :error="!rules.contents" error-message='內容不能為空')
                img-inputer.col.justify-center(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
                br
                div.col-12.row.justify-end
                  q-btn.q-ml-sm.col-2(label='送出' type='submit' color='primary')
                  q-btn.q-ml-sm.col-2(label='重設' type='reset' color='primary').

              q-card-actions.text-primary(align='right')
                q-btn(flat label='送出' type='submitC' v-close-popup)
                q-btn(flat label='重設' type='resetC' )
                q-btn(flat label='取消'                v-close-popup).

        q-btn.col-md-auto.col-2(label='form' color='primary' @click='form.formm = true')
          q-dialog(v-model='form.formm' persistent)
            q-form.q-gutter-md(@submit.prevent="submitF" @reset='resetF')
              q-input(filled type='text' v-model="form.titleF" label='問題' label-for="input-title" hint='請輸入問題' lazy-rules
              :error="!rules.titleF" error-message='標題不能為空' autofocus)
              q-input(filled type='text' v-model='form.contentsF' label='詳細說明' label-for="input-contents" hint='請輸入說明' lazy-rules
              :error="!rules.contentsF" error-message='說明不能為空')

              br
              //- q-toggle(v-model='form.accept' label='I accept the license and terms')
              div.row.justify-end
                q-btn(label='送出' type='submitF' color='primary')
                q-btn.q-ml-sm(label='重設' type='resetF' color='primary')
                q-btn.q-ml-sm(flat label='取消'                v-close-popup).

    //- q-form.row.q-gutter-md.q-pt-xl(@submit.prevent="submit" @reset='reset')
    //-     q-input.col-12(filled type='text' v-model="form.title" label='標題' label-for="input-title" hint='請輸入問題' lazy-rules
    //-     :error="!rules.title" error-message='標題不能為空' autofocus)
    //-     q-editor.col-12(filled type="textarea" v-model='form.contents' label='內容' label-for="input-contents" hint='請輸入說明' lazy-rules
    //-     :error="!rules.contents" error-message='內容不能為空')
    //-     img-inputer.col.justify-center(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
    //-     br

    //-     div.col-12.row.justify-end
    //-       q-btn.q-ml-sm.col-2(label='送出' type='submit' color='primary')
    //-       q-btn.q-ml-sm.col-2(label='重設' type='reset' color='primary').

    //- q-table(title="文章總覽" :data="posts" :columns="columns" row-key="rowNumber")
    //- br
    //- q-option-group(v-model='posts' inline :options="row.rowNumber")

    //- q-tab-panels.shadow-2.rounded-borders(v-model='panel' animated)
    //-   q-tab-panel(name='mails')
    //-   q-tab-panel(name='alarms')
    //-   q-tab-panel(name='movies')

</template>
<script>

export default {
  data () {
    return {
      posts: [],
      columns: [
        {
          name: 'rowNumber',
          // required: true,
          align: 'left',
          label: '#',
          field: row => row.rowNumber,
          sortable: true
        },
        { name: 'image', label: '圖片', field: 'image' },
        { name: 'title', label: '標題', field: 'title', sortable: true },
        { name: 'follows', label: '追蹤', field: 'follows', sortable: true },
        { name: 'emoji', label: 'emoji', field: 'emoji', sortable: true },
        { name: 'date', label: '日期', field: 'date', sortable: true }
      ],
      field: [
        {
          key: 'image',
          label: '圖片'
        },
        {
          key: 'title',
          label: '標題'
        },
        {
          key: 'follows',
          label: '追蹤'
        },
        {
          key: 'emoji',
          label: 'emoji'
        },
        {
          key: 'date',
          label: '日期'
        }
      ],
      form: {
        card: false,
        titleC: '',
        contentsC: '',

        // 測試表單
        formm: false,
        titleF: '',
        contentsF: '',

        title: '',
        contents: '',
        image: null,
        _id: ''

      }

    }
  },
  computed: {
    rules () {
    // 測試表單
      const titleC = this.form.titleC
      const contentsC = this.form.contentsC

      const titleF = this.form.titleF
      const contentsF = this.form.contentsF

      const title = this.form.title
      const contents = this.form.contents

      return {
        titleC: titleC.length === 0 ? null : titleC.length >= 0,
        contentsC: contentsC.length === 0 ? null : contentsC.length >= 0,

        titleF: titleF.length === 0 ? null : titleF.length >= 0,
        contentsF: contentsF.length === 0 ? null : contentsF.length >= 0,

        title: title.length === 0 ? null : title.length >= 0,
        contents: contents.length === 0 ? null : contents.length >= 0
      }
    }
  },
  methods: {
    resetC () {
    // 測試表單
      this.form.titleC = ''
      this.form.contentsC = ''
    },
    resetF () {
    // 測試表單
      this.form.titleF = ''
      this.form.contentsF = ''
    },
    reset () {
    // 測試表單
      this.form.title = ''
      this.form.contents = ''
    },
    editPost (index) {
      this.form = {
        title: this.posts[index].title,
        contents: this.posts[index].contents,
        image: this.posts[index].image,
        _id: this.posts[index]._id,
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
            // date: (new Date)
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
