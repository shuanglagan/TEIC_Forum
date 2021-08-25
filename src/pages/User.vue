<template lang="pug">
  q-page-container#user
    .container
      .row
        q-toolbar.row.q-mt-5(pills justified)
          q-item.col.justify-center(to="/user/posts" exact exact-active-class="active") 貼文
          q-item.col.justify-center(to="/user/follows" exact exact-active-class="active") 追蹤
        hr
      .row
        .col
          router-view
</template>

<script>

</script>
