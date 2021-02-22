<template>
  <div>
    <!--组件访问State中数据的第一种方式 【$store.state.count】-->
    <!--组件访问State中数据的第二种方式 在src/components/Subtration.vue:39中查看-->
    <h3>当前最新的count值为:{{$store.state.count}} ,原生</h3>
    <!--使用getters第一种方式【this.$store.getters.名称】-->
    <h3>当前最新的count值为:{{this.$store.getters.showNum}},使用了getters,第一种方式</h3>
    <!--使用getters第二种方式 在【src/components/Addition.vue:36】-->
    <h3>当前最新的count值为:{{showNum}},使用了getters,第二种方式</h3>
    <button @click="addHandle">+1</button>
    |
    <button @click="addAsyncHandle">+1异步,1秒后执行</button>
    |
    <button @click="addNHandle(3)">+n</button>
    |
    <button @click="addNAsyncHandle(3)">+n异步,1秒后执行</button>
  </div>
</template>

<script>
// 从 vuex 中
// 按需导入 mapGetters 函数
import { mapGetters } from 'vuex'

export default {
  name: 'Addition',
  data () {
    return {
      countTemp: 0
    }
  },
  computed: {
    // 使用getters第二种方式
    // 使用 mapGetters函数 将其映射为当前组件的计算属性
    // 然后直接 {{showNum}}即可访问数据
    ...mapGetters(['showNum'])
  },
  // 注意 这里的 方法名称 不要和 store中 mutations 函数 和 actions 函数 相同
  methods: {
    addHandle () {
      console.log('...Addition.vue...addHandle...')
      // 直接操作中Store中的数据不可取
      // this.$store.state.count++
      // 推荐使用下面方式
      // 触发 mutations 的第一种方式
      // commit 的作用 就是调用某个 mutations 函数
      this.$store.commit('add')

      // 触发 mutations 的第二种方式
      // 去看src/components/Subtration.vue:75
    },
    addAsyncHandle () {
      // 异步的让 count +1
      console.log('...Addition.vue...addAsyncHandle...')
      // 推荐使用下面方式
      // 触发 actions 的第一种方式
      // dispatch函数 的作用 就是调用某个 actions 函数 异步处理
      this.$store.dispatch('addAsync')

      // 触发 actions 的第二种方式
      // 去看src/components/Subtration.vue:101
    },
    addNHandle (step) {
      console.log('...Addition.vue...addNHandle...')
      // 推荐使用下面方式
      // 触发 mutations 的第一种方式 触发时 携带参数
      // commit 的作用 就是调用某个 mutations 函数
      this.$store.commit('addN', step)

      // 触发 mutations 的第二种方式
      // 去看src/components/Subtration.vue:75
    },
    addNAsyncHandle (step) {
      // 异步的让 count +n
      console.log('...Addition.vue...addNAsyncHandle...')
      // 推荐使用下面方式
      // 触发 actions 的第一种方式
      // dispatch函数 的作用 就是调用某个 actions 函数 异步处理 携带参数
      this.$store.dispatch('addNAsync', step)

      // 触发 actions 的第二种方式
      // 去看src/components/Subtration.vue:101
    }
  }
}
</script>

<style scoped>

</style>
