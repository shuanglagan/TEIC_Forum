<template lang="pug">
  div
    .wrap
      h1 Todos
      .list
        ul(@click='getData' )
          li(v-for='(item,index) in todos')
            | {{item}}

            hr
        ul()
          li.complete(v-for='(item,index) in done')
            | {{item}}

            hr
      .inputBox
        input.textBox(type='text' @keyup.enter='addTodo' v-model='newTodo')
      .finishOrNot
        span(@click='changeTodo')
        span(@click='changeDone')
</template>
<script>
// import Table from '../components/Table'

export default {
  data () {
    return {
      newTodo: '',
      todos: [],
      done: [],
      notFinish: false,
      finish: true
    }
  },
  methods: {
    addTodo (event) {
      this.todos.push(this.newTodo)
      this.newTodo = ''
    },
    getData (event) {
      const {
        target
      } = event
      if (target.tagName === 'LI') {
        this.done.push(target.textContent.trim())
        this.todos.splice(this.todos.indexOf(target.textContent.trim()), 1)
      };
    },
    changeTodo (event) {
      this.notFinish = false
      this.finish = true
    },
    changeDone (event) {
      this.notFinish = true
      this.finish = false
    }
  }

}
</script>
