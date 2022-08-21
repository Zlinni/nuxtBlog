<template>
  <div class="w-100 h-100">
    <v-card>
      <v-tabs v-model="tab" background-color="primary">
        <v-tab value="access">Assess</v-tab>
        <v-tab value="app-out">APP-OUT</v-tab>
        <v-tab value="error">ERROR</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="access">
          <div class="container w-100 px-2">
            <div class="header w-100 h-2 d-flex justify-space-between align-center">
              <div v-for="n in 3" :key="n" class="circle mx-2"></div>
              <div class="text-md-h5 ml-auto">Assess日志</div>
              <v-icon class="ml-auto">mdi-update</v-icon>
            </div>
            <div class="w-100" v-show="useIsArrayAndLength(logData.logs)">
              <div class="w-100 d-flex content" v-for="(log, index) in logData.logs" :key="index">
                <div class="text-caption numberCount d-flex justify-center align-center ml-n1">{{ index + 1 }}</div>
                <template v-if="useIsArrayAndLength(log)">
                  <div class="d-flex align-center paraCount">
                    <div v-for="logPiece in (log as LogInfo[])" :key="logPiece.id">
                      <div :style="{ 'color': logPiece.color }">{{ `${logPiece.value}\u00A0` }}</div>
                    </div>
                  </div>
                </template>
                <template v-if="!Array.isArray(log)">
                  <p class="d-flex align-center paraCount" :style="{ 'color': log.color }">
                    {{ log.value }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="app-out">
          <div class="container w-100 px-2">
            <div class="header w-100 h-2 d-flex justify-space-between align-center">
              <div v-for="n in 3" :key="n" class="circle mx-2"></div>
              <div class="text-md-h5 ml-auto">App-out日志</div>
              <v-icon class="ml-auto">mdi-update</v-icon>
            </div>
            <div class="w-100" v-show="useIsArrayAndLength(logData.logs)">
              <div class="w-100 d-flex content" v-for="(log, index) in logData.logs" :key="index">
                <div class="text-caption numberCount d-flex justify-center align-center ml-n1">{{ index + 1 }}</div>
                <template v-if="useIsArrayAndLength(log)">
                  <div class="d-flex align-center paraCount">
                    <div v-for="logPiece in (log as LogInfo[])" :key="logPiece.id">
                      <div :style="{ 'color': logPiece.color }">{{ logPiece.value }}</div>
                    </div>
                  </div>
                </template>
                <template v-if="!Array.isArray(log)">
                  <p class="d-flex align-center paraCount" :style="{ 'color': log.color }">
                    {{ log.value }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="error">
          <div class="container w-100 px-2">
            <div class="header w-100 h-2 d-flex justify-space-between align-center">
              <div v-for="n in 3" :key="n" class="circle mx-2"></div>
              <div class="text-md-h5 ml-auto">Error日志</div>
              <v-icon class="ml-auto">mdi-update</v-icon>
            </div>
            <div class="w-100" v-show="useIsArrayAndLength(logData.logs)">
              <div class="w-100 d-flex content" v-for="(log, index) in logData.logs" :key="index">
                <div class="text-caption numberCount d-flex justify-center align-center ml-n1">{{ index + 1 }}</div>
                <template v-if="useIsArrayAndLength(log)">
                  <div class="d-flex align-center paraCount">
                    <div v-for="logPiece in (log as LogInfo[])" :key="logPiece.id">
                      <div :style="{ 'color': logPiece.color }">{{ logPiece.value }}</div>
                    </div>
                  </div>
                </template>
                <template v-if="!Array.isArray(log)">
                  <p class="d-flex align-center paraCount" :style="{ 'color': log.color }">
                    {{ log.value }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  // layout: "layouthome",
  keepalive: true,
});
let socket = reactive({}) as WebSocket;
// 断线重连次数
let limitConnect = ref<number>(3);
let timeConnect = ref<number>(0);
let timeoutObj = ref<any>(null);
const timeout = 1000 * 60; // 60s发一次心跳
interface Log {
  fileName: string;
  logs: (LogInfo[] | LogInfo)[]
}
interface LogInfo {
  id: string;
  color: string;
  value: string;
}
let logData = ref<Log>({
  fileName: '',
  logs: []
});
let tab = ref(null);
onMounted(() => {
  initSocket();
})
watch(tab, (val) => {
  socketGetList();
})
// 获取ws日志内容
const socketGetList = () => {
  console.log(socket.readyState)
  if (socket.readyState === 1) {
    // if (time) clearTimeout(time)
    const obj = {
      event: 'sendLog',
      data: tab.value
    }
    socket.send(JSON.stringify(obj))
  } 
  // else {
  //   time = setTimeout(() => {
  //     socketGetList(time)
  //   }, 1000)
  // }
};
// 初始化socket
const initSocket = () => {
  socket = new WebSocket(useWebsocketApi().value);
  socket.onopen = wsOpen
  socket.onmessage = wsOnMsg
  socket.onclose = wsOnClose
};
// 开启ws
const wsOpen = () => {
  console.log('连接开启: ')
  socketGetList()
};
// ws收信息
const wsOnMsg = (msg:any) => {
  const data = JSON.parse(msg.data)
  console.log('客户端收到消息', data)
  if (!data) {
    useIsError().value = true;
    useErrorMsg().value = data.error || '服务端消息异常'
    return;
  }
  if (useIsArrayAndLength(data.data)) {
    logData.value = data.data[0];
    debugger
    resetHeart()
    heartCheck()
  } else {
    logData.value = {
      fileName: '',
      logs: []
    };
  }
};
// 关闭ws
const wsOnClose = () => {
  console.log('连接关闭')
  reconnect()
};
// ws重连
const reconnect = () => {
  // lockReconnect加锁，防止onclose、onerror两次重连
  if (limitConnect.value > 0) {
    if (localStorage.getItem('lockReconnect') !== '1') {
      localStorage.setItem('lockReconnect', '1')
      limitConnect.value--
      timeConnect.value++
      console.log('第' + timeConnect.value + '次重连')
      // 进行重连
      setTimeout(() => {
        initSocket()
        localStorage.removeItem('lockReconnect')
      }, 2000)
    }
  } else {
    console.log('连接已超时')
  }
};
// 开启心跳
const heartCheck = () => {
  console.log('this.timeoutObj', timeoutObj.value, 'this.socket.readyState', socket.readyState)
  timeoutObj.value = setTimeout(() => {
    // 每隔五秒发送心跳包
    if (socket.readyState === 1) {
      socket.send(JSON.stringify('heart Check'))
    } else {
      reconnect()
    }
  }, timeout)
};
// 重置心跳
const resetHeart = () => {
  clearTimeout(timeoutObj.value)
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #1d1f21;
  color: white;

  .header {
    background-color: #21252b;

    .circle {
      border-radius: 20px;
      width: 20px;
      height: 20px;

      &:nth-child(1) {
        background-color: #fc625d;
      }

      &:nth-child(2) {
        background-color: #fdbc40;
      }

      &:nth-child(3) {
        background-color: #35cd4b;
      }
    }
  }

  .content {
    &:hover {
      background-color: #343638;
    }

    .numberCount {
      width: 45px;
      height: 30px;


    }

    .paraCount {
      width: calc(100% - 45px);
    }
  }

}
</style>