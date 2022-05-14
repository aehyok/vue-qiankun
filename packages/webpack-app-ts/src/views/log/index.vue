<template>
  <div>
    <el-table
      :data="apilist"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="project" label="project" />
      <el-table-column prop="content" label="content" />
      <el-table-column prop="version" label="version" />
      <el-table-column prop="createTime" label="createTime" />
    </el-table>
  </div>
</template>
<script>
import SlTable from '../../../../common/components/table/index.vue'
import { defineComponent, reactive, toRefs, onMounted, ref } from "vue";
import { getTableConfig, getTableData, getLogList } from '@/services/api';
export default defineComponent({
  components: { SlTable },
  setup() {
    const show = ref(false);
    const state = reactive({
      pageModel: {
        page: 1,
        limit: 10,
        total: 0
      },
      list: [], // table数据
      apilist: [],
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
            method: (index, row, ss) => {
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

    const getLogListApi = () => {
      getLogList({}).then(result => {
        console.log(result, 'getLogListApi')
        state.apilist = result.data
      })
    }
    getLogListApi()
    onMounted(async() => {

      const resultConfig = await getTableConfig('0')
      const resultData = await getTableData({
        GuideLineId: '0',
        Param: {
          "@tabletype": "VIEW",
          "@tablename":"dvsdb30.view_villageepidemic"
        }
      })
      console.time('data1')
      Promise.all([resultConfig, resultData]).then((values) => {
        console.timeEnd('data1')
        console.log(values, 'values', new Date().getMilliseconds());
        const result = values[0]
        if(result.code == 200 ) {
          console.log(result, 'table列表配置')
          state.columns = JSON.parse(result.data.resultColumns) 
          console.log(state.columns, 'state.columns')
        }
        const data = values[1]
        if(data.code == 200 ) {
          console.log(data, 'table列表配置')
          state.list =data.data
          console.log(state.columns, 'state.columns')
        }
        show.value= true
      });
      // console.log('table-config')
      // const result = await getTableConfig('0')


    })
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

    state.list = [];
    // state.columns = columns_test;
    const search = () => {
      state.list = [...state.list];
      console.log(state.pageModel, "state.pageModel");
    };



    return {
      ...toRefs(state),
      handleSelectionChange,
      search,
      show
    };
  }
});
</script>
