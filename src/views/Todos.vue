<template>
  <div id="todos-app">
    <div>
      <a-icon type="menu"/>
      {{title}}
    </div>
    <div class="icons-list">
      <a-icon type="home"/>
      <a-icon type="smile" theme="outlined"/>
      <a-icon type="sync" spin/>
      <a-icon type="smile" :rotate="180"/>
      <a-icon type="loading"/>
    </div>
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handlInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done' @click.native="changeDoneById(item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余待做</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button @click="ChangeList('all')" :type="viewKey === 'all' ? 'primary' : ''">全部</a-button>
          <a-button @click="ChangeList('undone')" :type="viewKey === 'undone' ? 'primary' : ''">未完成</a-button>
          <a-button @click="ChangeList('done')" :type="viewKey === 'done' ? 'primary' : ''">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>

    <div style="margin-top: 50px">
      <a-divider>数据展示区</a-divider>
      <a-collapse>
        <a-collapse-panel key="1" header="json | this.$store.state">
          <p>{{this.$store.state}}</p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="json | this.$store.getters " :disabled="false">
          <p>{{this.$store.getters}}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="int | count">
          <!--<P> json | this.$store.state ===> {{this.$store.state}}</P>-->
          <!--<P> json | this.$store.getters ===> {{this.$store.getters}}</P>-->
          <p>count ===> {{count}},</p>
          <P> count2 ===> {{count2}},</P>
          <P> count3 ===> {{count3}},</P>
          <P> count4 ===> {{count4}},</P>
          <P>count6_my_computed ===> {{count6_my_computed}}</P>
          <!--{{count5}} 注意 这里count5 无法正常输出的 因为 因为 count5 上箭头函数的this指针并没有指向vue实例,
          因此不要滥用箭头函数 如要正常使用 且需求必须如此 请按照 count4写法-->
        </a-collapse-panel>
      </a-collapse>
      <a-divider>数据展示区2</a-divider>
      <a-carousel autoplay>
        <div>
          <a-tooltip placement="topLeft" arrow-point-at-center>
            <template slot="title">
              {{this.$store.state}}
            </template>
            <a-button>json | this.$store.state</a-button>
          </a-tooltip>
        </div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
      </a-carousel>
    </div>
  </div>
</template>

<script>
// 按需导入
// mapState
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Todos',
  created () {
    console.log('...created...')
    this.$store.dispatch('getList')
  },
  mounted () {
    console.log('...mounted...')
    console.log('...publicPath...->', this.publicPath)
  },

  // // computed 处理 State 和 Getters
  // // 第一种写法
  // computed: {
  //   // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组.
  //   // ...mapState(['list', 'inputValue', 'viewKey']),
  //   // 这是纯写法
  //   list: function () {
  //     return this.$store.state.todos.list
  //   },
  //   inputValue () {
  //     return this.$store.state.todos.inputValue
  //   },
  //   viewKey () {
  //     return this.$store.state.todos.viewKey
  //   },
  //   // 使用 mapGetters 和 扩展运算符
  //   ...mapGetters(['unDoneLength', 'infoList'])
  // },

  // computed 处理 State 和 Getters
  // 第二种写法
  computed: {
    ...mapState({
      list: (state) => state.todos.list,
      inputValue: (state) => state.todos.inputValue,
      viewKey: state => state.todos.viewKey,
      // 下面这些无用 只是写法演示使用
      // 当映射的计算属性的名称与 state 的子节点名称相同时 也就是 state.count 直接可以找到 可以赋值 名称 字符串
      count: 'count', // {{ this.$store.state.count}} 和 {{count}} 均可了,这里 传字符串参数 'count' 等同于 `state => state.count`
      count2: (state) => state.count, // 使用箭头函数 箭头函数可使代码更简练 【count2: state => state.count】也可
      count3 (state) { // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        return state.count
      },
      count4: function (state) { // count3 加了个 function
        return state.count + this.count2
      },
      // count5: (state) => this.count2 + state.count, // 注意下面的写法看起来和上面 count4 相同,事实上 count5 上箭头函数的this指针并没有指向vue实例,因此不要滥用箭头函数 如要正常使用 且需求必须如此 请按照 count4写法
      count6_my_computed: function () { // 这里count6,测试一下computed的原有用法
        return this.$store.state.count
      }
    }),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  data () {
    return {
      title: '待办事项App',
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
    handlInputChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    // 向列表中新增item项
    addItemToList () {
      // 打印输入框的值
      // console.log(this.$store.state.todos.inputValue)
      // console.log(this.inputValue)
      if (this.inputValue.trim().length <= 0) {
        return this.$notification.open({
          message: '文本框内容不能为空！',
          type: 'warning'
        })
      }
      this.$store.commit('addItem')
    },
    // 删除列表中的item
    removeItemById (id) {
      this.$store.commit('removeItem', id)
    },
    // 改变任务状态
    changeDoneById (id) {
      this.$store.commit('changeDone', id)
    },
    // 清除已完成的任务
    clean () {
      this.$store.commit('cleanDone')
    },
    // 修改页面上展示的列表数据
    ChangeList (key) {
      this.$store.commit('changeViewKey', key)
    }
  }
}
</script>

<style scoped>
  #todos-app {
    padding: 10px;
  }

  .my_ipt {
    width: 500px;
    margin-right: 10px;
  }

  .dt_list {
    width: 500px;
    margin-top: 10px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /*跑马灯*/
  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #1890ff;
    overflow: hidden;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }
  /*跑马灯*/
</style>
