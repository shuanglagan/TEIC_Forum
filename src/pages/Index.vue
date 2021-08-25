<template lang="pug">
  q-page#index
    q-table.q-ma-xl(

      title="文章總覽"
      :data="posts"
      :columns="columns"
      row-key="title"

      selection="single"
      :selected.sync="selected"

      :filter="filter"

      class="my-sticky-header-column-table"

      :pagination="initialPagination")

      //- template(v-slot:body-selection='scope')
      //-   q-radio(v-model='scope.row.selected').
      //-   |{{scope}}
      template(v-slot:top-right)
        q-input(borderless dense debounce='300' v-model='filter' placeholder='Search')
          template(v-slot:append)
            q-icon(name='search').

    .column.q-mt-xl(v-for="post in selected" :key="post._id")
      PostCard.col.self-center.w-90(:post="post")

    //- div.q-mt-md.
    //-   Selected: {{ JSON.stringify(selected) }}
</template>

<script>
import PostCard from '../components/PostCard.vue'

export default {
  name: 'Home',
  data () {
    return {
      // table selected
      selected: [],
      filter: '',

      // 分頁功能
      // lastIndex: null,
      // filter: '',
      // loading: false,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 20
        // rowsNumber: xx if getting data from a server

      },

      posts: [],
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: 'name'
          // format: val => `${val}`,
          // sortable: true
        },
        { name: 'title', align: 'center', label: '標題', field: 'title', sortable: true },
        // { name: 'image', label: '圖片', field: 'image' },
        // { name: 'tag', label: '標籤', field: 'tag' },
        // { name: 'follows', label: '追蹤', field: 'follows', sortable: true },
        // { name: 'emoji', label: 'emoji', field: 'emoji', sortable: true },
        { name: 'author', label: '作者', field: 'author', sortable: true },
        { name: 'date', label: '日期', field: 'date', sortable: true }
      ],
      field: [
        {
          key: 'title',
          label: '標題'
        },
        // {
        //   key: 'image',
        //   label: '圖片'
        // },
        // {
        //   key: 'tag',
        //   label: '標籤'
        // },
        // {
        //   key: 'follows',
        //   label: '追蹤'
        // },
        // {
        //   key: 'emoji',
        //   label: 'emoji'
        // },
        {
          key: 'author',
          label: 'author'
        },
        {
          key: 'date',
          label: '日期'
        }
      ]
    }
  },
  components: {
    PostCard
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
    // getSelectedString () {
    //   return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    // }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/posts')
      this.posts = data.result.map(post => {
        if (post.image) {
          post.image = `${process.env.VUE_APP_API}/files/${post.image}`
        }
        post.selected = false
        return post
      }
      )
      // this.posts2 = data.result.map(post => {
      //   if (post.contents==selected.) {

      //   }
      //   return post
      // }
      // )
      // })
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

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 400px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  // max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    // background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child, th:first-child
    position: sticky
    left: 0
    z-index: 1
    background-color: #fff
</style>
