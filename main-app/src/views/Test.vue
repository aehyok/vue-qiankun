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
  mounted () {
    videojs('my-video',
      function () {
        this.play()
      })
  }
}
</script>
