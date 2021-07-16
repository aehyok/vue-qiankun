<template>
  <div>
    <sl-table
      :list="list"
      @handleSelectionChange="handleSelectionChange"
      :options="options"
      :columns="columns"
      v-model:pageModel="pageModel"
      @search="search"
    >
    </sl-table>
  </div>
</template>
<script>
import { SlTable } from "aehyok-form-vue3";
// import "aehyok-form-vue3/lib/aehyok-form.css";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  components: { SlTable },
  setup() {
    // 选中行
    const handleSelectionChange = (val) => {
      console.log("val:", val);
    };
    // 编辑
    const handleEdit = (index, row, idx) => {
      console.log("index:", index, idx);
      console.log("row:", row);
    };
    // 删除
    const handleDel = (index, row) => {
      console.log(" index:", index);
      console.log(" row:", row);
    };
    const state = reactive({
      pageModel: {
        page: 1,
        limit: 10,
        total: 17
      },
      list: [
        {
          id: "24",
          title: "编号3",
          state: 0
        },
        {
          id: "23",
          title: "编号4",
          state: 1
        },
        {
          id: "23",
          title: "编号5",
          state: 2
        },
        {
          id: "2",
          title: "编号3",
          state: 0
        },
        {
          id: "223",
          title: "编号3",
          state: 1
        },
        {
          id: "2444",
          title: "编号3",
          state: 1
        }
      ], // table数据
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true // 是否支持列表项选中功能
      }, // table 的参数
      columns: [
        {
          prop: "id",
          label: "编号",
          align: "center"
        },
        {
          prop: "title",
          label: "标题",
          align: "center",
          formatter: (row) => {
            return `<span style="white-space: nowrap;color: dodgerblue;">${row.title}</span>`;
          }
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
      ], // 需要展示的列
      operates: {
        width: 200,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "编辑",
            type: "warning",
            show: true,
            icon: "el-icon-edit",
            plain: true,
            disabled: false,
            method: (index, row, ss) => {
              handleEdit(index, row, ss);
            }
          },
          {
            id: "2",
            label: "删除",
            type: "danger",
            icon: "el-icon-delete",
            show: true,
            plain: false,
            disabled: false,
            method: (index, row) => {
              handleDel(index, row);
            }
          }
        ]
      } // 列操作按钮
    });
    return {
      ...toRefs(state),
      handleSelectionChange,
      handleEdit,
      handleDel
    };
  }
});
</script>
