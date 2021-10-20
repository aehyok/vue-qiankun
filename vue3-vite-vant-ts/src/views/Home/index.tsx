import { defineComponent, reactive } from 'vue'
import child from './child'
// import slTable from '../../../../common/components/table/index.vue'
import { list_test, columns_test } from "./tableConfig";
export default defineComponent({
  components: {
    child,
    // slTable
  },
  setup() {
    const data = 'hello world in'

    // 选中行
    const handleSelectionChange = (val: any) => {
      console.log("handleSelectionChange-val:", val);
    };
    // 编辑
    const handleDetail = (index: any, row: any, idx: any) => {
      console.log("index:", index, idx);
      console.log("row:", row);
    };
    // 删除
    const handleDel = (index: any, row: any) => {
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
            type: "text",
            show: true,
            disabled: false,
            method: (index: any, row: any, ss: any) => {
              handleDetail(index, row, ss);
            }
          },
          {
            id: "2",
            label: "删除",
            type: "text",
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
    return () =>
      <>
        <sl-table
          list={state.list}
          handleSelectionChange={handleSelectionChange}
          columns={state.columns}
          operates={state.operates}
          pageModel={state.pageModel}
          search={search}
        >
        </sl-table>
        <child data={data} />
      </>
  }
})