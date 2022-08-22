const temp = [
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
  { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
  { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
  { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
]

const columnsTest = [
  {
    type: 'checkbox'
  },
  {
    prop: 'id',
    label: '编号',
    type: 'index',
    align: 'center'
  },
  {
    prop: 'title',
    label: '标题',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    align: 'center',
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
    sortable: true
  },
  {
    prop: 'state',
    label: '状态',
    align: 'center',
    dictionary: [
      { code: 0, name: '待审核' },
      { code: 1, name: '已审核' },
      { code: 2, name: '审核中' }
    ]
  },
  {
    prop: 'custom',
    label: '自定义',
    align: 'center',
    html: (row) => {
      return row.title === '编号3' ? `<span style="color: red;">${row.remark}</span>` : `未定义`
    }
  },
  {
    prop: 'title',
    label: '标题1',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建时间1',
    align: 'center',
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
    sortable: true
  },
  {
    prop: 'state',
    label: '状态1',
    align: 'center',
    dictionary: [
      { code: 0, name: '待审核' },
      { code: 1, name: '已审核' },
      { code: 2, name: '审核中' }
    ]
  },
  {
    prop: 'custom',
    label: '自定义1',
    align: 'center',
    html: (row) => {
      return row.title === '编号3' ? `<span style="color: red;">${row.remark}</span>` : `未定义`
    }
  }
]

const listTest = []

for (let index = 0; index < 100; index++) {
  // eslint-disable-next-line no-const-assign
  listTest = [...listTest, ...temp]
}
export { listTest, columnsTest }
