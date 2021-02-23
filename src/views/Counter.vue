<template>
  <div>
    {{title}}
    <p>---------------------------------------</p>
    <my-addition></my-addition>
    <p>---------------------------------------</p>
    <my-subtration></my-subtration>
    <p>---------------------------------------</p>
  </div>
</template>

<script>
import Addition from '@/components/Addition'
import Subtration from '@/components/Subtration'

export default {
  name: 'Counter',
  components: {
    'my-addition': Addition,
    'my-subtration': Subtration
  },
  data () {
    return {
      title: '计数器'
    }
  }
}
</script>

<style scoped>

</style>
