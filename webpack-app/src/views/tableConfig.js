const list =
[
    {
        id: "24",
        title: "编号3",
        // state: 0,
        state: '待审核'
    },
    {
        id: "23",
        title: "编号4",
        // state: 1
        state: '已审核',
    },
    {
        id: "23",
        title: "编号5",
        // state: 2
        state: '未审核'
    },
    {
        id: "2",
        title: "编号3",
        // state: 0
        state: '未审核'
    },
    {
        id: "223",
        title: "编号3",
        // state: 1
        state: '已审核'
    },
    {
        id: "2444",
        title: "编号3",
        // state: 1
        state: '待审核'
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
      prop: "state",
      label: "状态",
      align: "center",
      render: (row, column) => {
        return `<el-tag type="success">${row[column.prop]}</el-tag>`;
      }
      // render: (h, params) => {
      //   return h(
      //     "el-tag",
      //     {
      //       props: {
      //         type:
      //           params.row.state === 0 ? "success" : params.row.state === 1 ? "info" : "danger"
      //       } // 组件的props
      //     },
      //     params.row.state === 0 ? "上架" : params.row.state === 1 ? "下架" : "审核中"
      //   );
      // }
    }
  ]
export {
    list,
    columns_test
}