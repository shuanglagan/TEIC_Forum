import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import mixin from '../boot/mixin'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import VuePageTransition from 'vue-page-transition'

import {
  Quasar
} from 'quasar'

import VueGtag from 'vue-gtag'
Vue.use(VueGtag, {
  config: { id: 'G-SY725F9H0S' }
})

// Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
// import example from './module-example'

Vue.use(Vuex)

Vue.component('ImgInputer', ImgInputer)

Vue.mixin(mixin)

Vue.use(Quasar, {
  plugins: {
    Dialog
  }
})

Vue.use(VuePageTransition)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  state: {
    jwt: {
      token: '',
      received: 0
    },
    user: {
      account: '',
      role: 0,
      email: ''
    },
    list: [],
    finished: []
  },
  mutations: {
    login (state, data) {
      state.jwt.token = data.token
      state.jwt.received = new Date().getTime()
      state.user.account = data.account
      state.user.role = data.role
      state.user.email = data.email
    },
    logout (state) {
      state.jwt = {
        token: '',
        received: 0
      }
      state.user = {
        account: '',
        role: 0,
        email: ''
      }
    },
    addList (state, data) {
      state.list.push({
        name: data,
        edit: false,
        model: data
      })
    },
    extend (state, data) {
      state.jwt.token = data
      state.jwt.received = new Date().getTime()
    },
    getinfo (state, data) {
      state.user.account = data.account
      state.user.role = data.role
      state.user.email = data.email
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    user (state) {
      return { islogin: state.user.account.length > 0, isAdmin: state.user.role === 1, ...state.user }
    },
    list (state) {
      return state.list
    }
  },
  plugins: [createPersistedState({
    paths: ['jwt', 'user']
  })],
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})
