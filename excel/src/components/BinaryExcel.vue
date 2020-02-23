<template>
  <el-button type="primary" size="small" @click="doExport">导出</el-button>
</template>

<script>
import { exportRequest } from '@/service/request'

export default {
  name: 'BinaryExcel',
  data () {
    return {}
  },
  methods: {
    /**
     * @description excel导出
     * @param data excel二进制数据
     * @param name 文件名
     */
    exportExcel (data, name = 'excel导出') {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // 兼容IE11
        window.navigator.msSaveOrOpenBlob(data, name + '.xls')
      } else {
        const link = document.createElement('a')
        // xlxs格式
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

        // xls格式
        // const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', name + '.xlsx')
        // document.body.appendChild(link)
        link.click()
        // document.body.removeChild(link)
      }
    },
    // 导出excel
    doExport () {
      exportRequest('/excel/exportExcel', {}).then(res => {
        this.exportExcel(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
