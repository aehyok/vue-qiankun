<template>
  <!-- <el-table>
    <el-table-column
      fixed="left"
      header-align="center"
      prop="areaName"
      label="区域名称"
      v-if="state.show"
    >
      <template #default="scope">
        <span v-if="scope.row.areaLevel >= 5 || scope.row.areaName === '汇总数据'">{{
          scope.row.areaName
        }}</span>
        <span v-else>
          <a @click="clickItem(0, scope.row)" v-if="scope.row.areaLevel < 5">{{
            scope.row.areaName
          }}</a>
        </span>
      </template>
    </el-table-column>
    <el-table-column
      header-align="center"
      v-for="group in state.theaders"
      :key="group.MajorGroup"
      prop=""
      :label="group.MajorGroup"
      min-width="250px"
      label-class-name="col-class"
    >
      <el-table-column
        header-align="center"
        v-for="sub in group.SubGroups"
        :key="sub.title"
        prop=""
        :label="sub.title"
        min-width="120px"
        label-class-name="col-class"
      >
        <el-table-column
          header-align="center"
          v-for="item in sub.items"
          :key="item.title"
          :prop="item.keyName"
          :label="item.title"
          min-width="120px"
          label-class-name="col-class"
        >
          <el-table-column
            header-align="center"
            v-for="field in item.fields"
            :key="field.header"
            :prop="field.keyName"
            :label="field.header"
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
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table-column>
    <el-table-column
      header-align="center"
      prop="auditStatus"
      label="状态"
      fixed="right"
      v-if="state.show && props.showOperationButton"
    >
      <template #default="scope">
        <span v-if="scope.row.areaName === '汇总数据'"></span>
        <span v-else-if="scope.row.auditStatus === 2" style="color: red">驳回</span>
        <span
          v-else
          :style="{
            color: scope.row.status === 3 ? 'red' : scope.row.status === 0 ? '#e6a23c' : ''
          }"
          >{{ getStatus(scope.row.status) }}</span
        >
      </template>
    </el-table-column>
    <el-table-column
      header-align="center"
      prop=""
      label="操作"
      fixed="right"
      v-if="state.show && props.showOperationButton"
    >
      <template #default="scope">
        <span v-if="scope.row.status === 0 || scope.row.areaName === '汇总数据'"></span>
        <a @click="clickItem(2, scope.row)" v-if="scope.row.status !== 0">查看</a>
      </template>
    </el-table-column>
  </el-table> -->

  <div>
    <vxe-table border height="900" :data="list">
      <!-- <vxe-colgroup title="基本信息">
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
      <vxe-column field="address" title="Address" show-overflow></vxe-column> -->

      <vxe-column fixed="left" header-align="center" field="areaName" title="区域名称">
        <!-- <template #default="scope">
          <span v-if="scope.row.areaLevel >= 5 || scope.row.areaName === '汇总数据'">{{
            scope.row.areaName
          }}</span>
          <span v-else>
            <a @click="clickItem(0, scope.row)" v-if="scope.row.areaLevel < 5">{{
              scope.row.areaName
            }}</a>
          </span>
        </template> -->
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
            <vxe-colgroup
              header-align="center"
              v-for="field in item.fields"
              :key="field.header"
              :filed="field.keyName"
              :title="field.header"
              min-width="120px"
              label-class-name="col-class"
            >
              <!-- <template #default="scope">
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
              </template> -->
            </vxe-colgroup>
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-colgroup>
    </vxe-table>
  </div>
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

    listTest.data.map((item) => {
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
    state.list = Object.freeze(listTest.data)
    console.log(columnsTest.data[0].definedata, 'state.columns')
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

    return {
      ...toRefs(state),
      handleSelectionChange
    }
  }
})
</script>
