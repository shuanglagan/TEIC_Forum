import axios from 'axios'

export default ({ app, router, store, Vue }) => {
  Vue.prototype.axios = axios.create({ baseURL: process.env.VUE_APP_API })
}

// Vue.prototype.axios.攔截器
// 美金符號拿掉，之後一樣寫(this.$)
