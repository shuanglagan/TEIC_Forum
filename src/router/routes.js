
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { title: 'TEIC Forum', login: false } },
      { path: 'map', component: () => import('pages/Map.vue'), meta: { title: '網站地圖', login: false } },
      { path: 'register', component: () => import('pages/Register.vue'), meta: { title: '註冊', login: false } },
      { path: 'login', component: () => import('pages/Login.vue'), meta: { title: '登入', login: false } },
      { path: 'posts_new', component: () => import('pages/Posts_new.vue'), meta: { title: '新增貼文', login: true } },
      { path: 'posts_my', component: () => import('pages/Posts_my.vue'), meta: { title: '文章列表', login: true } },
      { path: 'posts_follows', component: () => import('pages/Posts_follows.vue'), meta: { title: '追蹤列表', login: true } },

      { path: 'test_editor', component: () => import('pages/Test_editor.vue'), meta: { title: 'Forum | Test_editor', login: false } },
      { path: 'test_tableEdit', component: () => import('pages/Test_tableEdit.vue'), meta: { title: 'Forum | Test_tableEdit', login: false } },
      { path: 'test_todo', component: () => import('pages/Test_todo.vue'), meta: { title: 'Forum | Test_todo', login: false } },
      { path: 'test_tree', component: () => import('pages/Test_tree.vue'), meta: { title: 'Forum | Test_tree', login: false } },
      { path: 'test_form_dialog', component: () => import('pages/Test_form_dialog.vue'), meta: { title: 'Forum | Test_form_dialog', login: false } },
      { path: 'test_timeline', component: () => import('pages/Test_timeline.vue'), meta: { title: 'Forum | Test_timeline', login: false } },
      { path: 'test_tree_easy', component: () => import('pages/Test_tree_easy.vue'), meta: { title: 'Forum | Test_tree_easy', login: false } },

      {
        path: '/user',
        component: () => import('pages/User.vue'),
        children: [
          { path: '', component: () => import('pages/UserHome.vue'), meta: { title: 'User | 個人空間', login: true } },
          { path: 'posts', component: () => import('pages/UserPosts.vue'), meta: { title: 'User | 貼文', login: true } },
          // { path: 'comments', component: () => import('pages/UserComments.vue'), meta: { title: 'User | 留言管理', login: true} },
          { path: 'follows', component: () => import('pages/UserFollows.vue'), meta: { title: 'User | 追蹤', login: true } }

        ]
      }
      // {
      //   path: '/admin',
      //   component: () => import('pages/Admin.vue'),
      //   children: [
      //     { path: '', component: () => import('pages/AdminHome.vue'), meta: { title: 'Back | 後臺管理', login: true, admin: true } },
      //     { path: 'user', component: () => import('pages/AdminUser.vue'), meta: { title: 'Back | 會員管理', login: true, admin: true } },
      //     { path: 'posts', component: () => import('pages/AdminPosts.vue'), meta: { title: 'Back | 貼文管理', login: true, admin: true } },

      //   ]
      // }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
