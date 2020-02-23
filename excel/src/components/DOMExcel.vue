<template>
  <div>
    <el-button type="primary" size="small" @click="doExport">导出</el-button>
    <table id="table" style="display: none;">
      <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>学校</th>
          <th>入学日期</th>
          <th>体温是否正常</th>
        </tr>
      </thead>
      <tbody v-html="tbodyHtml">
      </tbody>
    </table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { post } from '@/service/request'

export default {
  name: 'DOMExcel',
  data () {
    return {
      tbodyHtml: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      post('/excel/domExcel', {}).then(res => {
        if (res.data.code === 1) {
          var tbodyHtml = ''
          res.data.rows.forEach(e => {
            tbodyHtml += '<tr>'
            tbodyHtml += '<td>' + e.name + '</td>'
            tbodyHtml += '<td>' + e.age + '</td>'
            tbodyHtml += '<td>' + e.school + '</td>'
            tbodyHtml += '<td>' + e.date + '</td>'
            tbodyHtml += '<td>' + e.safe + '</td>'
            tbodyHtml += '<tr>'
          })
          this.tbodyHtml = tbodyHtml
        }
      })
    },
    doExport () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#table'))
      /* get binary string as output */
      let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
      try {
        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'excel导出.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    }
  }
}
</script>
