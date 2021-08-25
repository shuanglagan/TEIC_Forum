<template lang="pug">
.row.flex
  q-page#login.col-4.q-mx-auto(style="min-height:0px")
    .q-pa-md.bg-white.q-mx-auto(style="height:270px")
      q-form.q-gutter-md(@submit.prevent="submit" @reset='reset')
        q-input(filled type='text' v-model="form.account" label='帳號' label-for="input-account" hint='帳號長度限制為 4 到 20 個字' lazy-rules
        :error="!rules.account" error-message='帳號格式錯誤')
        q-input(filled type='text' v-model='form.password' label='密碼' label-for="input-password" hint='密碼長度限制為 4 到 20 個字' lazy-rules
        :error="!rules.password" error-message='密碼格式錯誤')
        br
        //- q-toggle(v-model='form.accept' label='I accept the license and terms')
        .column.items-end
          .row
            q-btn.col-6(label='登入' type='submit' color='primary')
            q-btn.col-6(label='重設' type='reset' color='primary' flat).

        //-檢查.env是否讀的到 | {{ url }}
</template>

<script>

export default {
  data () {
    return {
      form: {
        account: '',
        password: ''
        // accept: false
      }
      // url: process.env.VUE_APP_API
    }
  },
  computed: {
    rules () {
      const account = this.form.account
      const password = this.form.password
      return {
        account: account.length === 0 ? null : account.length >= 4 && account.length <= 20,
        password: password.length === 0 ? null : password.length >= 4 && password.length <= 20
      }
    }
  },
  methods: {
    reset () {
      this.form.account = ''
      this.form.password = ''
    },
    async submit () {
      try {
        const { data } = await this.axios.post('/users/login', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '登入成功'
        })
        this.$store.commit('login', data)
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
