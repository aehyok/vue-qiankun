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
    return {
      // ss: 'aehyok'
    }
  },
  created () {
    const temp = { A: 11, B: 12, C: { c: 1 } }
    const obj = { a: 1 }
    const copy = Object.assign({}, obj, temp)
    console.log(copy, 'copy')

    // const tempObject = { }

    // Object.defineProperty(tempObject, 'test', {
    //   value: 42,
    //   enumerable: false,
    //   writable: true,
    //   set (newVal) {
    //     this.value = newVal
    //   },
    //   get () {
    //     // return value
    //   }
    // })
    // tempObject.test = 77
    // console.log(tempObject.test)
    const ss = 123
    window.ss = ss
    const obj1 = {
      ss: 55,
      a: function () { console.log(this.ss) },
      b: {
        c: function () { console.log(this) },
        d: '1111'
      }
    }
    console.log(ss)
    obj1.a()
    obj1.b.c()

    const obj2 = {
      ss: 33,
      a: () => { console.log('obj2'); console.log(this); console.log(this.ss) }
    }
    obj2.a()
    // obj2.b.c()
  },
  mounted () {
    videojs('my-video',
      function () {
        this.play()
      })
  }
}
</script>
