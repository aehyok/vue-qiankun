import { defineComponent, reactive } from "vue"
export default defineComponent({
    setup() {
        const onChangeStatusClick =(val:any, index : number) => {
            console.log('--index--', val, index)
            data.test = val
            data.inputValue = data.inputValue +'111'
            console.log('status----',data.tableData[index].status)
            data.tableData[index].status = !data.tableData[index].status ? 1: 0
          }
          const data = reactive({
            inputValue: '111111',
            test: false,
            tableData: [
              {
                id: 1,
                item: '第1天',
                count: 1000,
                remark: '连续签到成功',
              },
              {
                id: 2,
                item: '第2天',
                count: 1000,
                times: 0,
                remark: '连续签到成功',
              },
              {
                id: 3,
                item: '第3天',
                count: 1000,
                remark: '连续签到成功',
                status: 0,
              },
              {
                id: 4,
                item: '第4天',
                count: 5,
                remark: '连续签到成功',
              },
              {
                id:5,
                item: '第5天',
                count: 5,
                remark: '连续签到成功',
              },
              {
                id: 6,
                item: '第6天',
                count: 1,
                remark: '连续签到成功',
              },
              {
                id: 7,
                item: '第7天',
                count: 1,
                remark: '连续签到成功',
              },
            ]
          })

        return () =>
            <>
            <el-table data={ data.tableData } style={{ width: '100%' }} border>
                <el-table-column prop="item" label="积分项" width="180"  align="center"/>
                <el-table-column prop="count" label="分值" align="center">
                    {{
                    default: ({ $index, row }: { $index: number, row: any }) => {
                        return <el-input-Number controls={false} v-model={row.count}/>
                    }
                    }}
                </el-table-column>
                
                <el-table-column prop="remark" label="备注"  align="center" />
            </el-table>
            </>
    }
})