var express = require('express');
var router = express.Router();
var nodeExcel = require('excel-export') // 用于将数据集导出到Excel xlsx文件
var xlsx = require('node-xlsx') // 服务端生成excel
var fs = require('fs')
var path = require('path')

// 导出excel二进制
router.post('/exportExcel', async (req, res, next) => {
  // 模拟从数据库获取表格数据
  var tableData = [
    { name: '张三', age: 20, school: '中南财经政法大学', date: '2020/12/12', safe: true },
    { name: '李四', age: 22, school: '华中科技大学', date: '2020/12/12', safe: true },
    { name: '王二', age: 23, school: '武汉大学', date: '2020/12/12', safe: true }
  ]
  var conf ={};
  conf.name = "mysheet";
  conf.cols = [{
    caption:'姓名',
    type:'string',
  },{
    caption:'年龄',
    type:'number',
  },{
    caption:'学校',
    type:'string',
    width: 50
  },{
    caption:'入学时间',
    type:'string',
    width: 50
  },{
    caption:'体温是否正常',
    type:'bool',
    width: 50
  }];
  conf.rows = tableData.reduce((init, item) => {
    init.push([item.name, item.age, item.school, item.date, item.safe])
    return init
  }, [])
  var result = nodeExcel.execute(conf);
  // xlsx格式
  res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

  // xls格式
  // res.setHeader('Content-Type', 'application/vnd.ms-excel;charset=utf-8');
  // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xls");
  res.end(result, 'binary');
})

// 服务端生成excel文件，返回文件链接给前端
router.post('/linkExcel', async (req, res, next) => {
  var tableData = [
    { name: '张三', age: 20, school: '中南财经政法大学', date: '2020/12/12', safe: true },
    { name: '李四', age: 22, school: '华中科技大学', date: '2020/12/12', safe: true },
    { name: '王二', age: 23, school: '武汉大学', date: '2020/12/12', safe: true }
  ]
  var title = ['姓名', '年龄', '学校', '入学日期', '体温是否正常']
  var excelData = []
  excelData = excelData.concat([title], tableData.reduce((init, item) => {
    init.push([item.name, item.age, item.school, item.date, item.safe])
    return init
  }, []))
  var buffer = xlsx.build([
    {
      name: 'mySheet', // 文件名
      data: excelData // 二维数组
    }
  ])
  var timeStamp = new Date().getTime()
  fs.writeFileSync(`../source/${timeStamp}.xlsx`, buffer, {'flag':'w'})
  res.json({
    code: 1,
    downloadUrl: path.resolve(__dirname, `../source/${timeStamp}.xlsx`)
  })
})

// 返回表格数据
router.post('/domExcel', async (req, res, next) => {
  var tableData = [
    { name: '张三', age: 20, school: '中南财经政法大学', date: '2020/12/12', safe: true },
    { name: '李四', age: 22, school: '华中科技大学', date: '2020/12/12', safe: true },
    { name: '王二', age: 23, school: '武汉大学', date: '2020/12/12', safe: true }
  ]
  res.json({
    code: 1,
    rows: tableData
  })
})

module.exports = router;
