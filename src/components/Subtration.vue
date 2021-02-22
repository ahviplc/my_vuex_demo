<template>
  <div>
    <h3>当前最新的count值为:{{count}}</h3>
    <button @click="sub">-1</button>
  </div>
</template>

<script>
export default {
  name: 'Subtration',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    sub () {
      console.log(1)
    }
  }
}
</script>

<style scoped>

</style>
