import Vue from 'vue'
import Router from 'vue-router'
import BinaryExcel from '@/components/BinaryExcel'
import LinkExcel from '@/components/LinkExcel'
import DOMExcel from '@/components/DOMExcel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/binaryExcel', // 二进制excel导出
      name: 'BinaryExcel',
      component: BinaryExcel
    },
    {
      path: '/linkExcel', // excel链接导出
      name: 'LinkExcel',
      component: LinkExcel
    },
    {
      path: '/domExcel', // DOM excel导出
      name: 'DOMExcel',
      component: DOMExcel
    }
  ]
})
