<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <p>---------------------------------------</p>
    <my-addition></my-addition>
    <p>---------------------------------------</p>
    <my-subtration></my-subtration>
    <p>---------------------------------------</p>
    <router-view/>
  </div>
</template>

<script>
import Addition from './components/Addition'
import Subtration from './components/Subtration'

export default {
  name: 'App',
  components: {
    'my-addition': Addition,
    'my-subtration': Subtration
  },
  data () {
    return {
      msg: 'this is msg...'
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
