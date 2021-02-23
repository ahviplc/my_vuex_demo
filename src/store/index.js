import Vue from 'vue'
import Vuex from 'vuex'

// 引入todos的 state，mutations，actions，getter
// 引入分离出去的module 添加到 modules
import todos from './mod-todos'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 存储要管理的数据 在Store中
  state: {
    count: 0
  },
  // mutations 用于变更 Store 中的数据
  // 1.只能通过 mutations 变更 Store 数据,不可以直接操作中 Store 中的数据
  // 2.通过这种方式虽然操作起来稍微繁琐一些,但是可以集中监控所有数据的变化
  // 3.不要在 mutations 函数中,执行异步操作
  // 4.下面所有操作都是同步执行的
  mutations: {
    add (state) {
      // 变更状态
      // +1
      state.count++
    },
    addN (state, step) {
      // 变更状态
      // +n
      state.count += step
    },
    sub (state) {
      // 变更状态
      // -1
      state.count--
    },
    subN (state, step) {
      // 变更状态
      // -n
      state.count -= step
    }
  },
  // actions 用于处理异步任务
  actions: {
    // 异步+1
    addAsync (context) {
      // 变更状态
      // +1
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    // 异步+n
    addNAsync (context, step) {
      // 变更状态
      // +n
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    // 异步-1
    subAsync (context) {
      // 变更状态
      // -1
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    // 异步-n
    subNAsync (context, step) {
      // 变更状态
      // -n
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  // 定义 getters
  // getters 用于对 Store 中的数据进行加工处理形成新的数据.
  // 1.getters 可以对 Store 中已有的数据加工处理之后形成新的数据,类似 Vue 的计算属性.
  // 2.Store 中数据发生变化, getters 的数据也会跟着变化。
  getters: {
    showNum: state => {
      return '当前最新的数量是【' + state.count + '】'
    }
  },
  modules: {
    todos: todos // 将todos加入 modules
  }
})
