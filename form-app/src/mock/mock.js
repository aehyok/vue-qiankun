import Mock from 'mockjs'

/*
字段定义
图片、日期、数值、字符串、段落 等等
https://github.com/nuysoft/Mock/wiki/Text
*/

// 内容类型
Mock.mock('/get/contentType', /post|get/i,
  [
    { id: 1, text: '图片' },
    { id: 2, text: '视频' }
  ])

Mock.mock('/get/tableList', /post|get/i, {
  // /post|get/i 匹配post和get模式 也可以用'post'或'get'
  'data|1-100': [{
    paramName: '@ctitle',
    paramValue: '@cname',
    paramDesc: '@cname',
    paramImage: '@image("125x80")',
    usage: '@DATETIME("yyyy年MM月dd日 HH:mm:ss")'
  }]
})

var Random = Mock.Random
Mock.mock('/get/scrollNews', /post|get/i, {
  // /post|get/i 匹配post和get模式 也可以用'post'或'get'
  'docs|1-100': [{
    paramName: '@ctitle',
    imageUrl: '@image("125x80")',
    usage: '@DATETIME("yyyy年MM月dd日 HH:mm:ss")',
    total: 20000,
    views: Random.integer(10000, 12000)
  }],
  total: 2,
  limit: 20,
  page: 1,
  pages: 1
})
