<template>
<div>
  11111111111
  <video :src="video" controls />
  <br />
  <button @click="transcode">
    Start
  </button>
  <p>{{ message }}</p>
</div>
</template>
<script>
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
export default {
  data () {
    return {
      message: 'Hello ffmpeg',
      video: '',
      ffmpeg: {},
      file: {}
    }
  },
  methods: {
    async transcode () {
      this.message = 'Loading ffmeg-core.js'
      if (!this.ffmpeg.isLoaded()) {
        // 判断是否已经加载
        await this.ffmpeg.load()
      }
      this.message = 'Start transcoding'
      this.ffmpeg.FS('writeFile', 'test.avi', await fetchFile(this.file))
      await this.ffmpeg.run('-i', 'test.avi', 'test.mp4')
      this.message = 'Complete transcoding'
      const data = this.ffmpeg.FS('readFile', 'test.mp4')
      this.video = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
    }
  },
  mounted () {
    // app state
    this.ffmpeg = createFFmpeg({
      log: true
    })
    this.file = process.env.NODE_ENV === 'production' ? '/flame.avi' : 'bootvideo.ts'
    // methods
  }
}
</script>
