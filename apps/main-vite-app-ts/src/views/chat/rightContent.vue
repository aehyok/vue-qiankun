<template>
  <div class="chat-right">
    <div ref="contentRef" class="right-scroll">
      <!-- <div > -->
      <div class="right-content" v-for="(item, index) in questionAndAnswerData" :key="index">
        <!-- -----------问题 开始----------  -->
        <div
          style="
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 10px;
            margin-top: 10px;
          "
        >
          <div style="display: flex; flex-direction: column">
            <div
              style="
                font-size: 12px;
                color: gray;
                display: flex;
                justify-content: flex-end;
                margin-bottom: 3px;
              "
            >
              2023/3/9 11:29:19
            </div>
            <div
              style="
                background-color: #a1dc95;
                border-radius: 8px;
                line-height: 40px;
                padding-left: 10px;
                padding-right: 10px;
                font-size: 13px;
              "
            >
              {{ item.question }}
            </div>
          </div>

          <img :src="iconUrl" style="width: 30px; height: 30px; margin-left: 10px" />
        </div>
        <!-- -----------问题 结束----------  -->

        <div
          style="
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-left: 10px;
            margin-right: 10px;
            color: white;
            margin-top: 20px;
          "
        >
          <!-- <img :src="iconUrl" style="width: 40px; height: 40px; margin-right: 10px" /> -->
          <!-- 答案的头像 开始 -->
          <div style="width: 40px">
            <svg
              width="40"
              height="40"
              viewBox="0 0 41 41"
              style="width: 30px; height: 30px; margin-top: 20px; margin-right: 10px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke-width="1.5"
            >
              <path
                d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <!-- 答案的头像 结束 -->

          <!-- 答案的内容 开始 -->

          <div style="display: flex; flex-direction: column">
            <div
              style="
                font-size: 12px;
                color: gray;
                display: flex;
                justify-content: flex-start;
                margin-bottom: 3px;
              "
            >
              2023/3/9 11:29:19
            </div>
            <div
              style="
                background-color: #444654;
                border-radius: 8px;
                line-height: 50px;
                padding-left: 10px;
                padding-right: 10px;
              "
              class="markdown-body"
              v-html="item.answer"
            ></div>
          </div>

          <!-- 答案的内容 结束 -->
        </div>
      </div>

      <!-- </div> -->
      <!-- 例子 -->
      <!-- <div class="right-content">
        <div
          style="
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 10px;
            margin-top: 10px;
          "
        >
          <div style="display: flex; flex-direction: column">
            <div
              style="
                font-size: 12px;
                color: gray;
                display: flex;
                justify-content: flex-end;
                margin-bottom: 3px;
              "
            >
              2023/3/9 11:29:19
            </div>
            <div
              style="
                background-color: #a1dc95;
                border-radius: 8px;
                line-height: 40px;
                padding-left: 10px;
                padding-right: 10px;
                font-size: 13px;
              "
            >
              请用go语言写一段hello world入门代码，并解析请用go语言写一段hello world入门代码，并解析
            </div>
          </div>

          <img :src="iconUrl" style="width: 30px; height: 30px; margin-left: 10px" />
        </div>

        <div
          style="
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-left: 10px;
            margin-right: 10px;
            color: white;
            margin-top: 20px;
          "
        >
          <div style="width: 40px">
            <svg
              width="40"
              height="40"
              viewBox="0 0 41 41"
              style="width: 30px; height: 30px; margin-top: 20px; margin-right: 10px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke-width="1.5"
            >
              <path
                d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div style="display: flex; flex-direction: column">
            <div
              style="
                font-size: 12px;
                color: gray;
                display: flex;
                justify-content: flex-start;
                margin-bottom: 3px;
              "
            >
              2023/3/9 11:29:19
            </div>
            <div
              style="
                background-color: #444654;
                border-radius: 8px;
                line-height: 50px;
                padding-left: 10px;
                padding-right: 10px;
              "
              class="markdown-body"
              v-html="html"
            ></div>
          </div>
        </div>
      </div> -->
    </div>
    <div style="text-align: center; margin: 20px 0">
      <el-button type="primary" :loading="loading" v-if="loading">Loading</el-button>
    </div>
    <div class="foot-content">
      <el-button type="success" @click="createChatContent">生成图片</el-button>
      <el-input
        v-model="input"
        :rows="2"
        type="textarea"
        :readonly="loading"
        style="height: 60px; padding: 0 10px; margin-top: 10px"
        placeholder="请输入"
      />
      <el-button type="success" :icon="Promotion" @click="sendChatContent" :loading="loading">
        发送
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import MarkdownIt from 'markdown-it'
import html2canvas from 'html2canvas'
import 'highlight.js/styles/default.css'
import hljs from 'highlight.js'
import { getChatCompletions } from '@/services/chatgpt.js'
import { useChatStore } from '@/store/chat'
// interface questionAndAnswerDataType {
//   question: string
//   answer: string
// }
const chatStore = useChatStore()

const markdown = new MarkdownIt({
  linkify: true,
  highlight(str: any, lang: any) {
    console.log(str, lang, 'str-lang')
    // if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="hljs" style=" position:relative;"><div class="pre-top"><span style="padding-left: 5px;">${lang}</span><span style="padding-right:5px">复制代码</span></div></div><code>${markdown.utils.escapeHtml(
        str
      )}</code></pre>`
      // eslint-disable-next-line no-empty
    } catch (__) {}
    // }

    return `<pre class="hljs-no-lang"><code>${markdown.utils.escapeHtml(str)}</code></pre>`
  }
})

const input = ref('')
const loading = ref(false)
const contentRef: any = ref(null)
const questionAndAnswerData: any = ref([])

const iconUrl = ref('/images/home/icon_avator.png')

const content = ref(
  '\n\n用GO语言实现Hello World，代码如下：\n\n```go\npackage main\n\nimport "fmt"\n\nfunc main() {\n fmt.Println("Hello, World!")\n}\n```\n\n输出结果：\n\n```\nHello, World!\n```\n\n以上代码使用 `fmt` 包中的 `Println` 函数输出了一条字符串。注意代码的组织形式：`main` 函数是程序的入口，必须包含在主包内。在此例中，我们定义了一个名为 `main` 的包，其中包含一个 `main` 函数。当执行程序时，将首先运行 `main` 函数，并输出一条 `Hello, World!` 的信息。'
)

const html = computed(() => {
  return markdown.render(content.value)
})

const sendChatContent = () => {
  loading.value = true
  getChatCompletions({ content: input.value }).then((res: any) => {
    const { code, data } = res
    if (code === 200) {
      if (data.choices?.length > 0) {
        const presentData = {
          question: input.value,
          answer: markdown.render(data?.choices?.[0].message?.content)
        }
        questionAndAnswerData.value.push(presentData)
        chatStore.setQuestionAnswerDat(questionAndAnswerData.value)
        input.value = ''
        loading.value = false
        console.log(code, data, 'chatComplteions')
      }
    } else {
      loading.value = false
    }
  })
}

const createChatContent = () => {
  // contentRef.value.scrollTop = 0
  return new Promise(() => {
    html2canvas(contentRef.value, {
      useCORS: true,
      allowTaint: true,
      scale: 1,
      width: contentRef.value.scrollWidth,
      height: contentRef.value.scrollHeight,
      windowHeight: contentRef.value.scrollHeight + 220,
      // windowWidth: contentRef.value.scrollWidth,
      x: 0,
      y: 0
    }).then((canvas) => {
      const oA = document.createElement('a')
      // let time = timeFormat()
      const aaa = '1'
      oA.download = `img_${aaa}.png`
      // // 设置下载的文件名，默认是'下载'
      oA.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

      document.body.appendChild(oA)
      oA.click()
      oA.remove() // 下载之后把创建的元素删除
      // resolve(dataURL)
    })
  })
}

onMounted(() => {
  questionAndAnswerData.value = chatStore.questionAnswerData
})
</script>
<style lang="scss" scoped>
.chat-content {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
}

.chat-left {
  width: 245px;
  background-color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.chat-right {
  flex: 1;
  background-color: #343541;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // height: 100vh;
}
.right-scroll {
  overflow-y: scroll;
  // overflow: hidden;
  // height: auto;
}
.right-scroll::-webkit-scrollbar {
  width: 0 !important;
}
.right-scroll {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

.right-content {
  flex: auto;
  position: relative;
  background-color: #343541;
}
.foot-content {
  // position: fixed;
  // bottom: 0;
  flex: 0 0 80px;
  // width: 100%;
  margin: 0px 40px 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(pre) {
  background-color: #282c34;
}

:deep(.hljs-keyword) {
  line-height: 25px;
}

:deep(.el-textarea__inner) {
  background-color: #28282c;
}

:deep(pre) {
  line-height: 25px;
  background-color: #000000;
}

:deep(p) {
  line-height: 25px;
  font-size: 12px;
}

:deep(.hljs) {
  color: white;
  padding-left: 5px;
  padding-top: 35px;
}

:deep(.hljs-no-lang) {
  color: white;
  padding-left: 5px;
  padding: 5px;
}
:deep(.pre-top) {
  position: absolute;
  height: 25px;
  background-color: #343541;
  top: 0px;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
