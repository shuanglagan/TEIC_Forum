<template lang="pug">
div
  q-form.q-gutter-md.q-pt-xl(@submit.prevent="submit" @reset='reset')
    div.col-12.row.justify-end
        q-btn.q-ml-sm.col-2(label='送出' type='submit' color='primary')
        q-btn.q-ml-sm.col-2(label='重設' type='reset' color='primary').
    .row.q-pa-sm.bg-primary
      q-input.col(filled bg-color='white' square v-model='newList' placeholder='Add List' dense @keydown.enter='addList')
        template(v-slot:append)
          q-btn(round dense flat icon='add' @click='addList')
    div
      q-card.bg-grey-1.q-ma-md(v-for='(list, index) in lists' :key='index')
        q-card-section.text-white(style='background: radial-gradient(circle, #4db6ac 0%, #26a69a 100%)')
          .text-h6.text-capitalize.text-bold {{ list.name }}
        .row.q-pa-sm.bg-secondary
          q-input.col(type="textarea" filled bg-color='white' square v-model='list.newTask' :placeholder='`Add task to ${list.name} list`' dense @keydown.enter='addTask(list)')
            template(v-slot:append)
              q-btn(round dense flat icon='add' @click='addTask(list)').
        q-list.bg-white
          q-expansion-item(label='展開/收合清單' default-opened)
              q-card(v-ripple v-for='(task,index, taskInd) in list.content' :key='taskInd')
                q-card-section.column
                  div {{ task.title }}
                  q-btn.self-end(round dense flat  icon='delete' @click='deleteTask(index)').

//-   .no-lists.absolute-center(v-if='!lists.length')
//-     q-icon(name='check' size='100px' color='primary')
//-       .text-h5.text-primary.text-center.
//-         No Task
</template>
<script>
// import Table from '../components/Table'

export default {
  data () {
    return {
      newList: '',
      lists: [
        {
          id: 1,
          name: 'example',
          newTask: '',
          content: [
            {
              title: 'Text'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addList () {
      if (this.newList) {
        this.lists.splice(0, 0, {
          id: this.lists.length + 1,
          name: this.newList,
          newTask: '',
          content: []
        })
      }
    },
    addTask (list) {
      if (list.newTask) {
        const index = this.lists.findIndex(el => el.id === list.id)
        console.log('index: ', index)
        const newList = {
          ...list,
          newTask: '',
          content: [
            {
              title: list.newTask
            },
            ...list.content
          ]
        }

        this.$set(this.lists, index, newList)
      }
    },
    deleteTask (index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really delete?',
        cancel: true,
        persistent: true
      })
        .onOk(() => {
          this.tasks.splice(index, 1)
          this.$q.notify('Task deleted')
        })
    }
    // async submit () {
    // //   this.submitDisable = true
    //   try {
    //     const fd = new FormData()
    //     for (const key in this.form) {
    //       fd.append(key, this.form[key])
    //     }
    //     // 有id就編輯，沒id就新增
    //     if (this.form._id.length === 0) {
    //       await this.axios.post('/posts', fd, {
    //         headers: {
    //           authorization: 'Bearer ' + this.$store.state.jwt.token
    //         }
    //       })
    //     } else {
    //       const { data } = await this.axios.patch('/posts/' + this.form._id, fd, {
    //         headers: {
    //           authorization: 'Bearer ' + this.$store.state.jwt.token
    //         }
    //       })
    //       this.posts[this.form.index] = {
    //         title: this.form.title,
    //         contents: this.form.contents,
    //         image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
    //         _id: this.form._id
    //         // date: (new Date)
    //       }
    //     }
    //   } catch (error) {
    //     this.$swal({
    //       icon: 'error',
    //       title: '錯誤'
    //     //   text: error.response.data.message
    //     })
    //     console.log(error)
    //   }
    //   this.submitDisable = false
    // }
  }

}
</script>
