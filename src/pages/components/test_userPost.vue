<template lang="pug">
  q-page#admin-posts
    .row
      .column.col.items-center.row
        q-card.wd100
          q-tabs.bg-purple.text-white(v-model='tab' align='justify' narrow-indicator)
            q-tab(name='列表' label='列表')
            q-tab(name='新增' label='新增')
            q-tab(name='編輯' label='編輯').
          q-separator
          q-tab-panels.bg-purple-1.text-center(v-model='tab' animated)
            q-tab-panel(name='列表')
              .text-h5.text-bold 列表
              | Lorem
            q-tab-panel(name='新增')
              .text-h5.text-bold 新增
              | Lorem
            q-tab-panel(name='編輯')
              .text-h5.text-bold 編輯
              | Lorem

        q-btn(block variant="success" label="新增")

</template>

<script>

export default {
  data () {
    return {
      tab: ''
    }
  }
}
</script>
