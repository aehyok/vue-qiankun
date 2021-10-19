import { defineComponent } from 'vue'
import child from './child'

export default defineComponent({
  components: {
    child
  },
  setup() {
    const data= 'hello world in'
    return () =>
      <>
        <div>Home</div>
        <el-button type="primary">测试</el-button>
        <child data = {data} />
      </>
  }
})