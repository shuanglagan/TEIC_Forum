<template lang="pug">
  div.text-white
    q-splitter(v-model='splitterModel' style='height: 400px' dark)
      template(v-slot:before)
        .q-pa-md
          q-tree(:nodes='simple' node-key='label' selected-color='primary' :selected.sync='selected' default-expand-all dark)
            //- template(v-slot:default-header='scope') {{scope.key}}
            //-   q-btn 123

      template(v-slot:after)
        q-tab-panels(v-model='selected' animated transition-prev='jump-up' transition-next='jump-up' dark)
            q-tab-panel(name='簡介')
              .text-h4.q-mb-md TEIC Forum  討論論壇
              ul
                li Try Error & Interactive Companionship
                li 嘗試做一個論壇網站，讓人們可以更方便的提問、討論。
                li 目前因個人因素，暫時只有新增貼文、檢是貼文的功能。

              //- q-input(filled v-model='name' label='Your name *' hint='Name and surname' lazy-rules :rules='[ val => val && val.length > 0 || \'Please type something\']')
            q-tab-panel(name='整體架構')
              .text-h4.q-mb-md 整體架構
              ul
                li 框架：Quasar / Node.js / express
                li 後端套件：
                  ul
                    li 資料庫：mongoose
                    li 驗證、通知： md5 / validator / Sweetalert2
                    li server：cors / body-parser / multer / multer-ftp / dotenv / jsonwebtoken
                    li 其他：eslint / nodemon
                li 前端套件：
                  ul
                    li validator / vuelidate / Vuex / mixin / PageTransition / Gtag / persistedstate
            q-tab-panel(name='登入前')
              .text-h4.q-mb-md 登入前
              ul
                li 閱讀
                li 搜尋
                li 自定義
              //- q-splitter(v-model='splitterModel' horizontal style='height: 400px' dark)
            q-tab-panel(name='登入後')
              .text-h4.q-mb-md 登入後
              ul
                li 新增文章
                li 文章列表
                li 自定義
            q-tab-panel(name='新增文章')
              .text-h4.q-mb-md 新增文章
              ul
                li Editor (WYSIWYG)
                li 文章插圖
                li 自定義
            q-tab-panel(name='困難')
              .text-h4.q-mb-md 困難
              ul
                li 遠距教學
                li 如何在不同情境下存取資料

</template>
<script>
export default {
  data () {
    return {
      splitterModel: 50,
      selected: '',
      simple: [
        {
          label: 'TEIC Forum',
          children: [
            {
              label: '簡介'
            },
            {
              label: '論壇架構',
              children: [
                {
                  label: '整體架構'
                },
                {
                  label: '登入前'
                },
                {
                  label: '登入後'
                }
              ]
            },
            {
              label: '功能說明',
              children: [
                {
                  label: '新增文章'
                }
              ]
            },
            {
              label: '進行中的功能',
              children: [
                {
                  label: '留言'
                },
                {
                  label: '按讚'
                },
                {
                  label: '收藏'
                },
                {
                  label: '分享'
                },
                {
                  label: '追蹤'
                }
              ]
            },
            {
              label: '困難'
            }
          ]
        }
      ]
    }
  }
}
</script>
