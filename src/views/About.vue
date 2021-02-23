<template>
  <div class="about">
    <h1>{{title}}</h1>
    <a-button type="primary" @click="axiosHandle">axios测试</a-button>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  data () {
    return {
      title: 'This is an about page!!!'
    }
  },
  methods: {
    axiosHandle () {
      // 直接 this.$axioe() 使用
      this.$axios({
        method: 'get',
        url: 'http://httpbin.org/get',
        // `headers` 是即将被发送的自定义请求头
        headers: {
          'X-User-Token': 'lc' // headers
        }
      }).then((res) => {
        console.log('...About.vue...mounted()...res -> ', res) // 这个本身就是对象了
        console.log('...About.vue...mounted()...res.data -> ', res.data) // 这个本身就是对象了
        // 直接 this.$message 使用 Ant Design Vue 全局提示 Message
        this.$message.success(JSON.stringify(res.data), 3, () => {
          console.log('...About.vue...我显示了 res.data ,关闭时触发的回调函数...触发了我...')
        }).then(() => this.$message.success('Loading finished', 5, function () {
          console.log('...About.vue...我显示了 Loading finished ,关闭时触发的回调函数...触发了我...未使用箭头函数...')
        })).then(() => this.$message.info('Loading finished is finished', 7, () => {
          console.log('...About.vue...我显示了 Loading finished is finished ,关闭时触发的回调函数...触发了我...使用了箭头函数...')
        }))
      }).catch((err) => {
        console.log('...About.vue...mounted()...err... -> ', err)
      })
    }
  }
}
</script>

<style>

</style>
