import { defineComponent, ref } from 'vue'
import foucsDirective from '@/directive/focus'
import { ElInput, ElScrollbar, ElEmpty, ElButton, ElCheckbox, ElMessage } from 'element-plus'

interface IListData {
  value: string
  finish: boolean
}

export default defineComponent({
  directives: { focus: foucsDirective },
  setup() {
    const content = ref<string>('')
    const list = ref<IListData[]>([])

    function addList() {
      if (!content.value) {
        ElMessage.warning('请输入todo信息')
        return
      }
      list.value.push({
        value: content.value,
        finish: false
      })
      content.value = ''
    }

    function delItem(index: number) {
      list.value.splice(index, 1)
    }

    return () => (
      <div class="todo-list">
        <ElInput
          type="text"
          v-focus
          v-model={content.value}
          v-slots={{
            append: (
              <ElButton
                icon="el-icon-circle-plus-outline"
                {...{
                  onClick: addList
                }}
              >
                添加
              </ElButton>
            )
          }}
        />

        <ElScrollbar height="400px">
          {list.value.length === 0 ? (
            <ElEmpty />
          ) : (
            list.value.map((data, index) => (
              <div
                class="list-item"
                style={{
                  textDecoration: data.finish ? 'line-through' : 'none'
                }}
                key={index}
              >
                <ElCheckbox v-model={data.finish}>完成</ElCheckbox>
                {data.value}
                <ElButton
                  round
                  size="mini"
                  type="danger"
                  class="el-icon-delete"
                  icon="el-icon-delete"
                  {...{
                    onClick: () => {
                      delItem(index)
                    }
                  }}
                >
                  删除
                </ElButton>
              </div>
            ))
          )}
        </ElScrollbar>
      </div>
    )
  }
})
