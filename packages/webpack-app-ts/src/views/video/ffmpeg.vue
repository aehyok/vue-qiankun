<template>
  <video :src="video" controls />
  <br />
  <button @click="transcode">Start</button>
  <p>{{ message }}</p>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

export default defineComponent({
  name: 'App',
  setup() {
    // app state //
    const ffmpeg = createFFmpeg({
      log: true
    })
    const message = ref('Click Start to Transcode')
    const video = ref('')
    const file = process.env.NODE_ENV === 'production' ? '/flame.avi' : '/bipbop_16x9_variant.m3u8'
    // methods
    async function transcode() {
      message.value = 'Loading ffmeg-core.js'
      if (!ffmpeg.isLoaded()) {
        // 判断是否已经加载
        await ffmpeg.load()
      }
      message.value = 'Start transcoding'
      ffmpeg.FS('writeFile', 'test.avi', await fetchFile(file))
      await ffmpeg.run('-i', 'test.avi', 'test.mp4')
      message.value = 'Complete transcoding'
      const data = ffmpeg.FS('readFile', 'test.mp4')
      video.value = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
    }
    return {
      video,
      message,
      transcode
    }
  }
})
</script>
