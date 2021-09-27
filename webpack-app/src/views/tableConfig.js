const list_test =
[
    {
        id: "24",
        title: "编号3",
        state: 0,
        createTime:"2021-09-23T17:57:09",
        remark: "自定义"
    },
    {
        id: "23",
        title: "编号4",
        state: 1,
        createTime:"2021-09-23T17:57:19",
        remark: "自定义"
    },
    {
        id: "23",
        title: "编号5",
        state: 2,
        createTime:"2021-09-23T17:57:29",
        remark: "自定义"
    },
    {
       id: "23",
       title: "编号5",
       state: 1,
       createTime:"2021-09-23T17:57:39",
       remark: "自定义111"
    },
    {
        id: "223",
        title: "编号3",
        state: 1,
        createTime:"2021-09-23T17:57:49",
        remark: "22222"
    },
    {
        id: "2444",
        title: "编号3",
        state: 0,
        createTime:"2021-09-23T17:57:59",
        remark: "333333"
    }
]

const columns_test = [
    {
        type:'checkbox',
    },
    {
      prop: "id",
      label: "编号",
      type:'index',
      align: "center"
    },
    {
      prop: "title",
      label: "标题",
      align: "center",
    },
    {
      prop: "createTime",
      label: "创建时间",
      align: "center",
      dateFormat: "yyyy-MM-dd HH:mm:ss",
      sortable: true
    },
    {
      prop: "state",
      label: "状态",
      align: "center",
      dictionary: [
        { code: 0, name: "待审核"},
        { code: 1, name: "已审核"},
        { code: 2, name: "审核中"},
      ]
    },
    {
      prop:"custom",
      label:"自定义",
      align: "center",
      html: (row, column) => {
        return row.title==="编号3" ? `<span style="color: red;">${ row.remark }</span>`:`未定义`
      }
    }
  ]
export {
    list_test,
    columns_test
}