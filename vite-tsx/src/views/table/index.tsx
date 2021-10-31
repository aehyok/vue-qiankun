import { defineComponent, ref, reactive } from 'vue'
import { format } from 'date-fns'
import table1 from './table1'
import table2 from './table2'
export default defineComponent({
  components: {
    table1, table2
  },
  setup() {
    console.log('table in console')
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    return () =>
      <>
        <div class="word-color">注：以家庭户为单位进行积分，户下家庭成员都可参与家庭积分。</div>
        <table1 />
        <div style="margin-top:45px;">每日签到（连续7天），中断后重新开始</div>
        <table2 />

        <div style="padding: 40px 0">
          <el-button type="info">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </>
  }
})