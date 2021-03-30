<template>
  <div>
    <video
      id="my-video"
      class="video-js vjs-default-skin box"
      controls
      preload="auto"
    >
      <source
          src="https://stream.sea.utuapp.cn/TV0010.m3u8"
          type="application/x-mpegURL"
      />
    </video>
  </div>
</template>
<script>
import videojs from 'video.js'
// import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
export default {
  data () {
    return {}
  },
  created () {
    const temp = { A: 11, B: 12, C: { c: 1 } }
    const obj = { a: 1 }
    const copy = Object.assign({}, obj, temp)
    console.log(copy, 'copy')
  },
  mounted () {
    videojs('my-video',
      function () {
        this.play()
      })
  }
}
</script>
