<template>
  <div>
    <h3>当前最新的count值为:{{count}}</h3>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'Addition',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    add () {
      console.log(1)
    }
  }
}
</script>

<style scoped>

</style>
