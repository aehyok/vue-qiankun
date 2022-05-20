import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useOperation } from '../utils/demoroomOperation'
const useWebSocket = () => {
  const store = useStore()
  const router = useRouter()
  const { jumpOperation } = useOperation()
  const initWebSocket = () => {
    if (store.state.isDestroyed) {
      console.log(
        'initWebSocket： !!!!!!!!! this has already been destroyed!! No.' + store.state.isDestroyed
      )
      return
    }

    if (store.state.websock) {
      store.state.websock.close()
      store.commit('set_websock', '')
    }

    let wsuri = 'ws://47.111.217.26:5980/socket?roomNo=102A8206'

    if (process.env.NODE_ENV === 'production') {
      wsuri = 'wss://socket.sea.utuapp.cn/socket?roomNo=102A8206'
    }

    console.log('ws: ' + wsuri)

    store.state.websock = new WebSocket(wsuri)
    store.state.websock.onmessage = function (msg) {
      console.log('msg', msg)
      try {
        let states = JSON.parse(msg.data)

        if (states.method == 'heartbeatRequest') {
          if (states.code == 0) {
            let now = new Date()
            let nowTime = now.getTime()
            if (
              !store.state.lastHeartbeatRspPrintTime ||
              nowTime > store.state.lastHeartbeatRspPrintTime + 10000
            ) {
              // store.state.lastHeartbeatRspPrintTime = nowTime;
              store.commit('set_lastHeartbeatRspPrintTime', nowTime)
            }
            setHeartbeatStatus(true)
          } else {
            console.log(
              store.state.serialNo + ' RCU --------------------==> ' + 'states.code=' + states.code,
              states
            )
          }
        }

        if (states.method && states.method === 'setScreenOperation') {
          console.log(states, '----------陈家店村委屏幕-------')
          if (states.data.length > 0) {
            switch (states.data[0].code) {
              case 700100:
              case 700200:
              case 700300:
              case 700400:
              case 700500:
              case 700600:
                console.log('跳转菜单', states.data[0].code)
                jumpOperation(states.data[0].code, router)
                break
              default:
                let commonFunction = store.state.commonFunction
                commonFunction(states.data[0].code)
                break
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    store.state.websock.onopen = function () {
      console.log('onopen, websocket' + store.state.serialNo)
      setWebSocketStatus(true)
    }

    store.state.websock.onclose = function (e) {
      console.log('onclose! websocket' + store.state.serialNo)
      store.commit('set_websock', '')
      setWebSocketStatus(false)
      clearTimeout(store.state.websockTimeout)
      // store.state.websockTimeout = setTimeout(() => {
      //     initWebSocket();
      // }, 2000);
      let websockTimeout = setTimeout(() => {
        initWebSocket()
      }, 2000)
      store.commit('set_websockTimeout', websockTimeout)
    }

    //连接发生错误的回调方法
    store.state.websock.onerror = function () {
      console.log('onerror! No.serialNo' + store.state.serialNo)
      setWebSocketStatus(false)
      clearTimeout(store.state.websockTimeout)
      // store.state.websockTimeout = setTimeout(() => {
      //     initWebSocket();
      // }, 2000);
      let websockTimeout = setTimeout(() => {
        initWebSocket()
      }, 2000)
      store.commit('set_websockTimeout', websockTimeout)
    }
  }

  const setWebSocketStatus = (ok) => {
    if (!ok) {
      clearInterval(store.state.heartbeatTimer)
      // store.state.heartbeatTimer = null;
      store.commit('set_heartbeatTimer', null)
    } else {
      // store.state.heartbeatFailCnt = 0;
      store.commit('set_heartbeatFailCnt', 0)
      clearInterval(store.state.heartbeatTimer)
      // store.state.heartbeatTimer = setInterval(() => {
      //     setHeartbeatStatus(false);
      //     requestHeartbeatToServer();
      // }, 1000);

      let heartbeatTimer = setInterval(() => {
        setHeartbeatStatus(false)
        requestHeartbeatToServer()
      }, 3000)
      store.commit('set_heartbeatTimer', heartbeatTimer)

      console.log('this.heartbeatTimer-serialNo', store.state.heartbeatTimer, store.state.serialNo)
    }
  }

  const setHeartbeatStatus = (ok) => {
    if (ok) {
      // store.state.heartbeatFailCnt = 0;
      store.commit('set_heartbeatFailCnt', 0)
    } else {
      // store.state.heartbeatFailCnt++;
      store.commit('set_heartbeatFailCnt', store.state.heartbeatFailCnt + 1)
      if (store.state.heartbeatFailCnt > 2) {
        console.log('heartbeat to server failed!!!')
        initWebSocket()
      }
    }
  }

  const requestHeartbeatToServer = () => {
    if (store.state.websock && store.state.websock.readyState === 1) {
      let now = new Date()
      let nowTime = now.getTime()
      if (
        !store.state.lastHeartbeatReqPrintTime ||
        nowTime > store.state.lastHeartbeatReqPrintTime + 10000
      ) {
        // store.state.lastHeartbeatReqPrintTime = nowTime;
        store.commit('set_lastHeartbeatReqPrintTime', nowTime)
        console.log(store.state.serialNo + ' RCU <== ' + 'requestHeartbeatToServer')
      }
      store.state.websock.send(JSON.stringify({ method: 'heartbeatRequest' }))
    } else {
      console.log('requestHeartbeatToServer:: invalid this.websock', store.state.websock)
    }
  }

  const openWebSocket = (commonFunction) => {
    store.commit('set_clear', false)

    store.commit('set_commonFunction', commonFunction)
    store.commit('set_serialNo', store.state.serialNo + 1)
    setWebSocketStatus(false)
    initWebSocket()
  }

  const closeWebSocket = () => {
    // store.state.isDestroyed = true;
    store.commit('set_isDestroyed', true)
    if (store.state.websock) {
      store.state.websock.close()
    }
    clearTimeout(store.state.websockTimeout)
    // store.state.websockTimeout = null;
    store.commit('set_websockTimeout', null)

    // console.log('!!!!!!this.heartbeatTimer', this.heartbeatTimer, this.serialNo)
    clearInterval(store.state.heartbeatTimer)
    // store.state.heartbeatTimer = null;
    store.commit('set_heartbeatTimer', null)
  }

  return {
    openWebSocket,
    closeWebSocket
  }
}
export { useWebSocket }
