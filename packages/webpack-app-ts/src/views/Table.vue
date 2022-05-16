<template>
  <div>
    <sl-table
      :list="list"
      @handleSelectionChange="handleSelectionChange"
      :columns="columns"
      :operates="operates"
      v-model:pageModel="pageModel"
      @search="search"
    >
    </sl-table>
  </div>
</template>
<script>
import { SlTable } from '@app/components'
import { defineComponent, reactive, toRefs } from "vue";
import { list_test, columns_test } from "./tableConfig";
export default defineComponent({
  components: { SlTable },
  setup() {
    // 选中行
    const handleSelectionChange = (val) => {
      console.log("handleSelectionChange-val:", val);
    };
    // 编辑
    const handleDetail = (index, row, idx) => {
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
      list: [], // table数据
      columns: [], // 需要展示的列
      operates: {
        width: 200,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "查看",
            type: "primary",
            show: true,
            disabled: false,
            method: (index, row, ss) => {
              handleDetail(index, row, ss);
            }
          },
          {
            id: "2",
            label: "删除",
            type: "primary",
            show: true,
            disabled: false,
            method: (index, row) => {
              handleDel(index, row);
            }
          }
        ]
      } // 列操作按钮
    });

    state.list = list_test;
    state.columns = columns_test;
    const search = () => {
      state.list = [...state.list];
      console.log(state.pageModel, "state.pageModel");
    };
    return {
      ...toRefs(state),
      handleSelectionChange,
      search
    };
  }
});
</script>
