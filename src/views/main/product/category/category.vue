<template>
  <div class="category">
    <h2>category</h2>
    <h2>{{getIdTypeNumber('1')}}</h2>
    <h2>{{res['1']}}</h2>
  </div>
</template>

<script lang="ts" name="category">
import logCollection from '@/utils/demo'
export default {
  data() {
    return {
      res: {
        '1': '身份证',
        '2': '护照',
        '3': '台湾居民身份证',
        '4': '港澳台居民身份证'
      }
    }
  },
  methods: {
    getIdTypeNumber(val) {
    let res = ''
      switch(val) {
        case '1': 
          res = '身份证'
          break
        case '2':
          res = '护照'
          break
        case '3':
          res = '台湾居民身份证'
          break
        case '4':
          res = '港澳台居民身份证'
          break
        default:
          res = ''
      }
    return res
    }
  },
  setup() {
    const tuple: [string, number, number] = ['zhangsan', 18, 1.89]
    const arr: string[] = ['aaa', 'bbb', 'ccc']
    logCollection(tuple)
    logCollection(arr)
  }
}
</script>

<style scoped>
.category {
}
</style>
