const table_DataList = [
  {
    id: '24',
    title: '编号1',
    state: 0,
    createTime: '2021-09-23T17:57:09',
    remark: '自定义'
  },
  {
    id: '23',
    title: '编号2',
    state: 1,
    createTime: '2021-09-23T17:57:19',
    remark: '自定义'
  },
  {
    id: '23',
    title: '编号3',
    state: 2,
    createTime: '2021-09-23T17:57:29',
    remark: '自定义'
  },
  {
    id: '23',
    title: '编号4',
    state: 1,
    createTime: '2021-09-23T17:57:39',
    remark: '自定义111'
  },
  {
    id: '223',
    title: '编号5',
    state: 1,
    createTime: '2021-09-23T17:57:49',
    remark: '22222'
  },
  {
    id: '2444',
    title: '编号6',
    state: 0,
    createTime: '2021-09-23T17:57:59',
    remark: '333333'
  },
  {
    id: '24',
    title: '编号7',
    state: 0,
    createTime: '2021-09-23T17:57:09',
    remark: '自定义'
  },
  {
    id: '23',
    title: '编号8',
    state: 1,
    createTime: '2021-09-23T17:57:19',
    remark: '自定义'
  },
  {
    id: '23',
    title: '编号9',
    state: 2,
    createTime: '2021-09-23T17:57:29',
    remark: '自定义'
  },
  {
    id: '23',
    title: '编号10',
    state: 1,
    createTime: '2021-09-23T17:57:39',
    remark: '自定义111'
  }
]

const table_ColumnList = [
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
    html: (row, column) => {
      return row.state === 2 ? `<span style="color: red;">${row.remark}</span>` : `未定义`
    }
  }
]

const form_ColumnList = [
  {
    name: 'name1',
    type: 'text',
    title: '栏目标题',
    required: true // 必填
  },
  {
    name: 'name',
    type: 'text',
    title: '栏目名称'
  },
  {
    name: 'total',
    type: 'number',
    title: '栏目数量',
    required: true
  },
  {
    name: 'count',
    type: 'number',
    title: '浏览数量'
  },
  {
    name: 'descript',
    type: 'textarea',
    title: '备注',
    required: true
  },
  {
    name: 'content',
    type: 'textarea',
    title: '内容'
  },
  {
    name: 'startDate',
    type: 'date',
    title: '开始日期',
    required: true
  },
  {
    name: 'endDate',
    type: 'date',
    title: '结束日期'
  },
  {
    name: 'isValid',
    type: 'switch',
    title: '是否有效'
  },
  {
    name: 'isExpired',
    type: 'switch',
    title: '是否过期',
    required: true
  },
  {
    name: 'type',
    type: 'radio',
    dictionary: [
      { code: 1, name: '横版栏目' },
      { code: 2, name: '竖版栏目' }
    ],
    title: '栏目类型',
    controls: [
      {
        value: 1,
        showCondition: [
          {
            name: 'show',
            type: 'radio',
            dictionary: [
              { code: 1, name: 'China' },
              { code: 2, name: 'English' }
            ],
            title: '测试类型',
            required: true
          }
        ]
      },
      {
        value: 2,
        showCondition: [
          {
            name: 'isValids',
            type: 'switch',
            title: '是否有效'
          }
        ]
      }
    ]
  },
  {
    name: 'requireType',
    type: 'radio',
    dictionary: [
      { code: 1, name: '类型一' },
      { code: 2, name: '类型二' }
    ],
    title: '图文类型',
    required: true
  },
  {
    name: 'range',
    type: 'checkbox',
    title: '发布范围',
    dictionary: [
      { code: 1, name: '范围一' },
      { code: 2, name: '范围二' }
    ],
    required: true
  },
  {
    name: 'dateRange',
    type: 'daterange',
    title: '日期范围'
  },
  {
    name: 'creType',
    type: 'select',
    // multiple: true,
    dictionary: [
      { code: 1, name: '身份证' },
      { code: 2, name: '居住证' }
    ],
    title: '证件类型'
  },
  {
    name: 'image',
    type: 'image',
    title: '头像'
  }
]

const form_Data = {
  name: '主菜单栏目',
  total: null,
  count: null,
  createDate: 1606730360386,
  type: 1,
  requireType: undefined,
  creType: '',
  range: [],
  isExpired: false,
  isValid: true
}

const detail_ColumnList = [
  {
    label: '事件类型',
    name: 'type',
    dictionary: []
  },
  {
    label: '事发地址',
    name: 'address'
  },
  {
    label: '上报人员',
    name: 'createdByName'
  },
  {
    label: '上报日期',
    name: 'createdAt',
    type: 'date'
  },
  {
    label: '问题描述',
    name: 'descript'
  },
  {
    label: '上传照片',
    name: 'imageFiles',
    type: 'image'
  }
]

const detail_Data = {
  type: '事件类型',
  address: '事发地址',
  createdByName: '上报人员',
  createdAt: '2021-09-23T17:57:59',
  descript: '测试',
  imageFiles: [
    {
      id: 2253,
      originName: '标准图1.jpg',
      byteSize: '86158',
      relativePath: '/1/6/169e75990fc3e348b13b7bf2ac778042.jpg',
      extensionName: '.jpg',
      fileType: 1,
      md5: '2ed41cb75b21e9476f4f5f4a8e0e1507',
      thumbnailId: 0,
      thumbnailRelativePath: '/1/6/169e75990fc3e348b13b7bf2ac778042.jpg',
      used: false,
      isMaterial: false,
      url: 'https://dvs-sit1.sunlight-tech.com/sundfs/1/6/169e75990fc3e348b13b7bf2ac778042.jpg',
      thumbnailUrl:
        'https://dvs-sit1.sunlight-tech.com/sundfs/1/6/169e75990fc3e348b13b7bf2ac778042.jpg'
    },
    {
      id: 2255,
      originName: '标准图.jpg',
      byteSize: '36854',
      relativePath: '/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg',
      extensionName: '.jpg',
      fileType: 1,
      md5: '5e7a86d478bc7a992b5899347e8cc085',
      thumbnailId: 0,
      thumbnailRelativePath: '/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg',
      used: false,
      isMaterial: false,
      url: 'https://dvs-sit1.sunlight-tech.com/sundfs/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg',
      thumbnailUrl:
        'https://dvs-sit1.sunlight-tech.com/sundfs/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg'
    }
  ]
}
export {
  table_DataList,
  table_ColumnList,
  form_ColumnList,
  form_Data,
  detail_ColumnList,
  detail_Data
}
