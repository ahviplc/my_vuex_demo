<template>
  <div>
    <!--组件访问State中数据的第一种方式 【$store.state.count】-->
    <!--组件访问State中数据的第二种方式 在【src/components/Subtration.vue:39】中查看-->
    <h3>当前最新的count值为:{{count}} ,原生</h3>
    <!--使用getters第一种方式【this.$store.getters.名称】-->
    <h3>当前最新的count值为:{{this.$store.getters.showNum}},使用了getters,第一种方式</h3>
    <!--使用getters第二种方式 在【src/components/Subtration.vue:43】-->
    <h3>当前最新的count值为:{{showNum}},使用了getters,第二种方式</h3>
    <button @click="subHandle">-1</button>
    |
    <button @click="subAsyncHandle">-1异步,1秒后执行</button>
    |
    <button @click="subNHandle(6)">-n</button>
    |
    <button @click="subNAsyncHandle(6)">-n异步,1秒后执行</button>
  </div>
</template>

<script>
// 从 vuex 中
// 按需导入 mapState 函数
// 按需导入 mapMutations 函数
// 按需导入 mapActions 函数
// 按需导入 mapGetters 函数
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Subtration',
  data () {
    return {
      countTemp: 0
    }
  },
  computed: {
    // 组件访问State中数据的第二种方式
    // 将全局数据 映射为当前组件的计算属性
    // 然后直接 {{count}}即可访问数据
    ...mapState(['count']),
    // 使用getters第二种方式
    // 使用 mapGetters函数 将其映射为当前组件的计算属性
    // 然后直接 {{showNum}}即可访问数据
    ...mapGetters(['showNum'])
  },
  // 注意 这里的 方法名称 不要和 store中 mutations 函数 和 actions 函数 相同
  methods: {
    subHandle () {
      console.log('...Subtration.vue...subHandle...')
      // 直接操作中Store中的数据不可取
      // this.$store.state.count--

      // 触发 mutations 的第一种方式
      // commit 的作用 就是调用某个 mutations 函数
      // this.$store.commit('sub')

      // 触发 mutations 的第二种方式 使用 mapMutations 函数
      // 使用 mapMutations 将 方法 映射为当前组件的方法
      // 直接调用此方法
      this.sub()
    },
    subNHandle (step) {
      console.log('...Subtration.vue...subNHandle...')
      // 触发 mutations 的第一种方式 触发时 携带参数
      // commit 的作用 就是调用某个 mutations 函数
      // this.$store.commit('subN', step)

      // 触发 mutations 的第二种方式 使用 mapMutations 函数
      // 使用 mapMutations 将 方法 映射为当前组件的方法
      // 直接调用此方法 携带参数
      this.subN(step)
    },
    // 触发 mutations 的第二种方式
    // 使用 mapMutations 将 方法 映射为当前组件的方法
    // 使用 mapMutations 函数 将需要的 mutations 函数 映射为当前组件的 methods 方法
    ...mapMutations(['sub', 'subN']),
    // 异步 -1
    subAsyncHandle () {
      // 异步的让 count -1
      console.log('...Subtration.vue...subAsyncHandle...')
      // 推荐使用下面方式
      // 触发 actions 的第一种方式
      // dispatch函数 的作用 就是调用某个 actions 函数 异步处理
      // this.$store.dispatch('subAsync')

      // 触发 actions 的第二种方式 使用 mapActions 函数
      this.subAsync()
    },
    // 异步 -n
    subNAsyncHandle (step) {
      // 异步的让 count -1
      console.log('...Subtration.vue...subNAsyncHandle...')
      // 推荐使用下面方式
      // 触发 actions 的第一种方式
      // dispatch函数 的作用 就是调用某个 actions 函数 异步处理 携带参数
      // this.$store.dispatch('subNAsync', step)

      // 触发 actions 的第二种方式 使用 mapActions 函数
      this.subNAsync(step)
    },
    // 使用 mapActions 函数 将需要的 actions 函数 映射为当前组件的 methods 方法
    ...mapActions(['subAsync', 'subNAsync'])
  }
}
</script>

<style scoped>

</style>
