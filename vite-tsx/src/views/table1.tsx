import { defineComponent, reactive, ref} from "vue"
import { TableModel } from './../types/models';
export default defineComponent({
    setup() {

        const list: TableModel[] = ref()
        list.value= [
            {
            id: 1,
            item: '创建户码',
            count: 1000,
            times: 1,
            remark: '户码默认分值',
            status: 0,
            },
            {
            id: 2,
            item: '门牌标签',
            count: 1000,
            times: 0,
            remark: '每年自动得分值，不累计叠加',
            status: 1,
            },
            {
            id: 3,
            item: '认证我的家乡',
            count: 1000,
            times: 1,
            remark: '认证成功',
            status: 0,
            },
            {
            id: 4,
            item: '随手拍',
            count: 5,
            times: 0,
            remark: '每日累计叠加',
            status: 0,
            },
            {
            id:5,
            item: '发布农产品销售',
            count: 5,
            times: 0,
            remark: '每日累计叠加',
            status: 1,
            },
            {
            id: 6,
            item: '查看农产品销售',
            count: 1,
            times: 0,
            remark: '每日累计叠加',
            status: 0,
            },
            {
            id: 7,
            item: '查看信息公开',
            count: 1,
            times: 0,
            remark: '每日累计叠加',
            status: 0,
            },
            {
            id: 8,
            item: '查看便民服务',
            count: 1,
            times: 0,
            remark: '每日累计叠加',
            status: 0,
            },
            {
            id: 9,
            item: '发布村友圈',
            count: 2,
            times: 0,
            remark: '每日累计叠加',
            status: 0,
            },
            {
            id: 10,
            item: '村友圈点赞',
            count: 1,
            times: 0,
            remark: '每日累计叠加',
            status: 1,
            },
            {
            id: 11,
            item: '村友圈评价',
            count: 1,
            times: 0,
            remark: '每日累计叠加',
            status: 0,
            },
            {
            id: 12,
            item: '分享挣积分',
            count: 2,
            times: 0,
            remark: '每日累计叠加',
            status: 0,
            }
        ]
        const onChangeStatusClick =(val: any, index : number) => {
            console.log('--index--', val, index)
            data.test = val
            data.inputValue = data.inputValue +'111'
            console.log('status----',data.tableData[index].status)
            data.tableData[index].status = !data.tableData[index].status ? 1: 0
            data.tableData[index].times ++
        }

        const data = reactive({
            inputValue: '111111',
            test: false,
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
                <el-table-column prop="times" label="上限次数" align="center">
                {{
                    default: ({ row }: { $index: number,row: any }) => {
                    return (row.times > 0 ?                         
                        <el-input-Number controls={false} placeholder={"请输入---"} v-model={row.times}  /> : "--")
                    }
                }}
                </el-table-column>
                <el-table-column prop="remark" label="备注"  align="center" />
                <el-table-column prop="address" label="启用状态"  align="center">
                {{
                    default: ({ $index,row }: { $index: number,row: any }) => {
                        let value = row.status===1 ? true: false
                        return <el-switch v-model={value}  
                            onChange ={
                                (val: any)=> {
                                console.log(val, 'value-value')
                                onChangeStatusClick(val,$index)
                                }
                            }
                        />
                    }
                }}
                </el-table-column>
            </el-table>
            </>
    }
})