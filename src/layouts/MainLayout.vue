<template lang="pug">
  q-layout(view='lHh Lpr lFf').bg-teic.text-teic(reveal elevated).100vw
    q-header
    q-page-container
      .container
        q-fab(vertical-actions-align='left' color='blue-8' hide-icon direction='right' label="Menu"  class="q-pt-lg" )
          q-fab-action(color='deep-orange-12'  v-if="!user.islogin" to="/register" icon='login' label='註冊')
          q-fab-action(color='secondary'       v-if="!user.islogin" to="/login" icon='login' label='登入')
          q-fab-action(color='purple-5'   v-if="!user.islogin" to="/" label='回首頁')

          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_tree" label='Test_tree')
          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_timeline" label='Test_timeline')
          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_tree_easy" label='Test_tree_easy')
          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_form_dialog" label='Test_form_dialog')
          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_editor" label='Test_editor')
          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_tableEdit" label='Test_tableEdit')
          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_todo" label='Test_todo')
          //- q-fab-action(color='secondary'       v-if="!user.islogin" to="/test_trello" label='Test_trello')

          q-fab-action(color='light-blue-12'       v-if="user.islogin" to="/" label='回首頁')
          q-fab-action(color='cyan-8'       v-if="user.islogin" to="/posts_new" label='新貼文')
          q-fab-action(color='green-8'       v-if="user.islogin" to="/posts_my" label='文章列表')
          q-fab-action(color='lime-8'       v-if="user.islogin" to="/posts_follows" label='追蹤列表')
          //- q-fab-action(color='orange-8'          v-if="user.islogin" to="/user"  label='個人空間' )
          q-fab-action(color='deep-orange-3'          v-if="user.islogin"  @click="logout" label='登出')

          q-fab-action(color='accent'          v-if="user.islogin && user.isAdmin" to="/user/admin" label='後臺管理' ).
        brbrbrbrbr
        router-view.
</template>

<script>
export default {
  name: 'App',
  title: 'Index Page',
  methods: {
    async logout () {
      try {
        await this.axios.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('logout')
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '發生錯誤'
        })
      }
    }
  },
  async mounted () {
    if (this.$store.state.jwt.token.length === 0) return
    const diff = Date.now() - this.$store.state.jwt.received
    try {
      // 如果進入網頁時，距離收到 jwt 過了六天，重新取得一次新的 jwt
      // 1000 * 60 * 60 * 24 * 6 = 6 天的毫秒數
      if (diff > 1000 * 60 * 60 * 24 * 6) {
        const { data } = await this.axios.post('/users/extend', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('extend', data.result)
      }
      // 進入網頁時重新取一次使用者資料
      const { data } = await this.axios.get('/users/', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.$store.commit('getinfo', data.result)
    } catch (error) {
      this.$store.commit('logout')
    }
  }
}
</script>
