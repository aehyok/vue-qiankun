<template>
  <vxe-table border height="900" :data="list">
    <vxe-column field="areaName" title="区域名称" width="120" fixed="left">
      <template #default="{ row }">
        <span v-if="row.areaLevel >= 5 || row.areaName === '汇总数据'">{{ row.areaName }}</span>
        <span v-else>
          <a @click="clickItem(0, row)" v-if="row.areaLevel < 5">{{ row.areaName }}</a>
        </span>
      </template>
    </vxe-column>
    <vxe-colgroup
      v-for="group in columns"
      header-align="center"
      :key="group.MajorGroup"
      field=""
      :title="group.MajorGroup"
      min-width="250px"
      label-class-name="col-class"
    >
      <vxe-colgroup
        header-align="center"
        v-for="sub in group.SubGroups"
        :key="sub.title"
        field=""
        :title="sub.title"
        min-width="120px"
        label-class-name="col-class"
      >
        <vxe-colgroup
          header-align="center"
          v-for="item in sub.items"
          :key="item.title"
          :field="item.keyName"
          :title="item.title"
          min-width="120px"
          label-class-name="col-class"
        >
          <vxe-column
            header-align="center"
            v-for="field in item.fields"
            :key="field.header"
            :filed="field.keyName"
            :title="field.header"
            min-width="120px"
            label-class-name="col-class"
          >
            <template #default="scope">
              <span v-if="scope.row[`${field.form}.needReport`] === 0">无此建设项目</span>
              <span v-else-if="!scope.row[field.keyName] && scope.row[field.keyName] !== 0"
                >未上报</span
              >

              <span v-else-if="field.type === 2 || scope.row.areaName === '汇总数据'">
                {{ scope.row[field.keyName] }}
              </span>
              <span v-else-if="scope.row[field.keyName] || scope.row[field.keyName] === 0">
                <a @click="clickItem(1, scope.row, field.keyName)">{{
                  scope.row[field.keyName]
                }}</a>
              </span>
            </template>
          </vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
    </vxe-colgroup>
  </vxe-table>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { listTest, columnsTest } from './tableConfig-vxe-ex'

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
    console.log(listTest.data, 'older data')
    listTest.data.map(async (item) => {
      // res.data.forEach((item) => {
      const datas = item.areaData || []

      const row = {
        areaId: item.areaId,
        areaName: item.areaName,
        areaLevel: item.level,
        status: 0,
        auditStatus: 0,
        amount: item.amount || 0
      }

      datas.forEach((obj) => {
        const list = JSON.parse(obj.data || '[]')
        row.status = obj.status
        row.auditStatus = obj.auditStatus
        row.formName = obj.formName

        row[`${obj.formName}.needReport`] = obj.needReport

        list.forEach((d) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const key in d) {
            if (obj.needReport === 0) {
              row[`${obj.formName}.${key}`] = '无此建设项目'
            } else {
              row[`${obj.formName}.${key}`] = d[key]
            }
          }
        })
      })
      state.list.push(row)
    })

    // state.list = listTest.data
    const cols = []
    // state.list = Object.freeze(listTest.data)
    console.log(state.list, 'state.list')
    // console.log(columnsTest.data[0].definedata, 'state.columns')
    state.columns = JSON.parse(columnsTest.data[0].definedata)
    console.log(state.columns, 'state.columns')

    state.columns.forEach((group) => {
      ;(group.SubGroups || []).forEach((sub) => {
        ;(sub.items || []).forEach((item) => {
          if (item.type === 2 && item.fields.length > 0) {
            const fen = item.fields[0]
            fenXiangHandler(fen)
          }
          ;(item.fields || []).forEach((field) => {
            field.keyName = `${field.form}.${field.fieldname}`
            field.type = item.type
            cols.push({
              descript: field.descript,
              header: field.header,
              fieldName: field.fieldname,
              formName: field.form,
              keyName: field.keyName,
              type: item.type
            })
          })

          if (item.fields.length <= 1) {
            item.title = ''
          }
        })
      })
    })

    const formatterData = (data) => {
      console.log(data, '111111')
      return '111111'
    }
    return {
      ...toRefs(state),
      handleSelectionChange,
      formatterData
    }
  }
})
</script>
