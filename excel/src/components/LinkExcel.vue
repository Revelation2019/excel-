<template>
  <el-button type="primary" size="small" @click="doExport">导出</el-button>
</template>

<script>
import { post } from '@/service/request'

export default {
  name: 'LinkExcel',
  data () {
    return {}
  },
  methods: {
    doExport () {
      post('/excel/linkExcel', {}).then(res => {
        console.log(res)
        window.open(res.data.downloadUrl) // 下载excel文件
      })
    }
  }
}
</script>
