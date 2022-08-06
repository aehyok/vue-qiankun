<template>
  <div>
    <vxe-table border height="400" :data="list">
      <vxe-colgroup title="基本信息">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="更多信息">
        <vxe-column field="role" title="Role"></vxe-column>
        <vxe-colgroup title="详细信息">
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup title="分类信息">
        <vxe-column field="date3" title="Date"></vxe-column>
      </vxe-colgroup>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { listTest, columnsTest } from './tableConfig-vxe'

export default defineComponent({
  setup() {
    // 选中行
    const handleSelectionChange = (val) => {
      console.log('handleSelectionChange-val:', val)
    }
    // 编辑
    const handleDetail = (index, row, idx) => {
      console.log('index:', index, idx)
      console.log('row:', row)
    }
    // 删除
    const handleDel = (index, row) => {
      console.log(' index:', index)
      console.log(' row:', row)
    }

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
        fixed: 'right',
        list: [
          {
            id: '1',
            label: '查看',
            type: 'primary',
            show: true,
            disabled: false,
            method: (index, row, ss) => {
              handleDetail(index, row, ss)
            }
          },
          {
            id: '2',
            label: '删除',
            type: 'primary',
            show: true,
            disabled: false,
            method: (index, row) => {
              handleDel(index, row)
            }
          }
        ]
      } // 列操作按钮
    })

    state.list = Object.freeze(listTest)
    state.columns = columnsTest
    console.log(columns, 'columns')
    const search = () => {
      state.list = [...state.list]
      console.log(state.pageModel, 'state.pageModel')
    }
    return {
      ...toRefs(state),
      handleSelectionChange,
      search
    }
  }
})
</script>
