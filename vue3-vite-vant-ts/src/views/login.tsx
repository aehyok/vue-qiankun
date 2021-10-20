import { defineComponent } from 'vue'
import { format } from 'date-fns'
import style from './login.scss'

export default defineComponent({
  setup() {
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const onChangeStatusClick =(index: number) => {
      console.log(index, '--index--')
    }
    const tableData = [
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 1,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '门牌标签',
        count: 1000,
        times: 0,
        remark: '每年自动得分值，不累计叠加',
        status: 1,
      },
      {
        id: 1,
        item: '认证我的家乡',
        count: 1000,
        times: 1,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '随手拍',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 1,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 1,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 0,
      },
      {
        id: 1,
        item: '创建户码',
        count: 1000,
        times: 0,
        remark: '户码默认分值',
        status: 0,
      }
    ]
    
    return () =>
      <>
        <div>login</div>
        {date}
        <el-table data={tableData} style={{ width: '100%' }}>
          <el-table-column prop="item" label="积分项" width="180" />
          <el-table-column prop="count" label="分值" width="180">
            {{
                      default: ({ $index }: { $index: number }) => (
                        <el-button
                          type="danger"
                        >
                          删除
                        </el-button>
                      )
                    }}
          </el-table-column>
          <el-table-column prop="times" label="上限次数" >
          {{
            default: ({ row }: { $index: number,row: any }) => {
              console.log(row.times,row, '2-1-4')
              return (row.times > 0 ?                         
                <el-input placeholder={"请输入---"}/> : "--")
            }
          }}
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="address" label="启用状态" >
          {{
            default: ({ $index,row }: { $index: number,row: any }) => {
              console.log(row.times,row, '2-1-4')
              const value = row.status===1 ? true: false
              return <el-switch v-model={value}  change ={onChangeStatusClick($index)}/>
            }
          }}
          </el-table-column>
        </el-table>
      </>
  }
})