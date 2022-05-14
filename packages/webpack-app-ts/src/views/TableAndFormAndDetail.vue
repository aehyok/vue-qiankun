<template>
  <div style="display:flex;justify-content: space-between;padding: 10px;">
    <div>
        <el-button
          type="primary"
          size="default"
          @click="addClick"
          >新增</el-button
        >
    </div>
    <div>
      <sl-search :searchParameters="searchParameters"  @search="search"/>
    </div>
  </div>

    
    <sl-table
      :list="list"
      @handleSelectionChange="handleSelectionChange"
      :columns="columns"
      :operates="operates"
      v-model:pageModel="pageModel"
      @search="search"
    >
    </sl-table>
    <el-dialog  v-model="showEdit" title="编辑" @close="editCloseClick">
      <el-form
            :model="formConfig.formData"
            label-width="120px"
            ref="formDom"
        >
          <sl-form
            :columnList="formConfig.formListItem"
            :formData="formConfig.formData"
            />
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog  v-model="showDetail"  title="详情">
       <sl-detail  :columnList="detail.columns" :columnData="detail.formData"/>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" >确 定</el-button>
        </span>
      </template>
    </el-dialog>
</template>
<script>
// import SlDialog from '../../../common/components/dialog/index.vue'
// import SlTable from '../../../common/components/table/index.vue'
// import SlForm from '../../../common/components/form/index.vue'
// import SlDetail from '../../../common/components/detail/index.vue'
// import SlSearch from '../../../common/components/search/index.vue'
import {  SlTable, SlForm, SlDetail, SlSearch } from '@app/components'
import { defineComponent, reactive, toRefs, ref } from "vue";
import { table_DataList, table_ColumnList, form_ColumnList, form_Data, detail_ColumnList, detail_Data } from "./TableAndFormAndDetail";
import { ElMessageBox, ElMessage } from "element-plus"
export default defineComponent({
  components: { SlTable, SlForm, SlDetail, SlSearch },
  setup() {
    const showEdit = ref (false)
    const showDetail = ref (false)
    // 选中行
    const handleSelectionChange = (val) => {
      console.log("handleSelectionChange-val:", val);
    };

    const searchParameters = [
        {
          type: 'select',
          title: '事件类型',
          placeholder: '',
          dictionary: [
            { code: 1, name:"事件一"},
            { code: 2, name: "事件二"}
          ],
          value: 1,
          showClear: true,
        },
        {
          title: '发布日期',
          type: "daterange",
          placeholder: '请输入问题描述关键字',
          value: undefined
        },
        {
          type: "input",
          placeholder: '请输入问题描述关键字',
          value: ''
        },
      ]
     // 编辑
    const handleEdit = (index, row, idx) => {
      console.log("index:", index, idx);
      console.log("row:", row);
      showEdit.value = true
    };

    // 查看
    const handleDetail = (index, row, idx) => {
      console.log("index:", index, idx);
      console.log("row:", row);
      showDetail.value = true
    };
    // 删除
    const handleDel = (index, row) => {
      console.log(" index:", index);
      console.log(" row:", row);
      handleDelete()
    };

    // 删除
    const handleDelete = () =>{
      ElMessageBox.confirm('您确定要删除选中的数据?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          ElMessage.success("删除成功")
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

    const editCloseClick = () => {
      showEdit.value = false
    }

    const addClick = () => {
      showEdit.value = true
    }
    const detailCloseClick = () => {
      showDetail.value = false
    }

    const detail = reactive({
      columns: detail_ColumnList,
      formData: detail_Data
    })
    const formConfig = reactive({
      formListItem: form_ColumnList,
      formData: form_Data
    })
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
            id: "0",
            label: "编辑",
            type: "primary",
            show: true,
            disabled: false,
            method: (index, row, ss) => {
              handleEdit(index, row, ss);
            }
          },
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

    state.list = table_DataList;
    state.columns = table_ColumnList;
    const search = () => {
      state.list = [...state.list];
      console.log(state.pageModel, "state.pageModel");
    };
    return {
      ...toRefs(state),
      handleSelectionChange,
      search,
      showEdit,
      showDetail,
      formConfig,
      detail,
      detailCloseClick,
      editCloseClick,
      searchParameters,
      addClick
    };
  }
});
</script>
