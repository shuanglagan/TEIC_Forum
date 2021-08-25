<template lang="pug">
//- div
//-   q-option-group(v-model="post" :options="post._id")
//-   q-tab-panels(v-model="post" align='right')
//-     q-tab-panel(v-html="post.contents")
//- Card 寫法
q-card.q-mb-md()
  q-card-section(v-html="post.title").text-h4.text-arial-bold
  q-card-section(v-html="post.contents")
  q-card-section(align='right')
    //- q-btn(flat round color='orange' icon='mood' @click="showing = true")
    //- q-popup-proxy(v-model="showing")
    //-   q-banner
    //-     q-btn(flat round color='red' icon='sentiment_satisfied_alt' v-close-popup)
    //-     q-btn(flat round color='red' icon='face' v-close-popup)
    //-     q-btn(flat round color='red' icon='mood_bad' v-close-popup)
    q-btn(flat round color='red' icon='favorite')
    q-btn(flat round color='teal' icon='bookmark')
    q-btn(flat round color='primary' icon='share').
</template>

<script>
export default {
  name: 'postCard',
  showing: false,
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
