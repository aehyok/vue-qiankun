<template>
  <template v-for="(dataItem, _index) in dataList" :key="dataItem.id" @click="goDetails(dataItem.id)">
    <div class="dragger-container" :style="{
        height: '70px'
        }">
        
      <template v-for="configItem in state.config">
        <template v-if="configItem.view === 'DragImage'">
          <img
            :src="dataItem.url"
            :style="{
              // border: '0px',
              width: configItem.width + 'px',
              height: configItem.height + 'px',
              top: configItem.y + 'px',
              left: configItem.x + 'px',
              position: 'absolute',
              'z-index': configItem.index,
            }"
          />
        </template>
        <template v-if="configItem.view === 'DragButton'">
            <div  @click.stop="goDetails(dataItem.id)"
            :style="{
              // border: '0px',
              width: configItem.width + 'px',
              height: configItem.height + 'px',
              top: configItem.y + 'px',
              left: configItem.x + 'px',
              position: 'absolute',
              'z-index': configItem.index,
            }">
                {{dataItem[configItem.name]}}
            </div>
        </template>

        <template v-if="configItem.view === 'DragText'">
            <div :style="{
              // border: '0px',
              width: configItem.width + 'px',
              height: configItem.height + 'px',
              top: configItem.y + 'px',
              left: configItem.x + 'px',
              position: 'absolute',
              'z-index': configItem.index,
            }">
                {{dataItem[configItem.name]}}
            </div>
        </template>
        <template v-if="configItem.view === 'DragDate'">
            <div :style="{
              // border: '0px',
              width: configItem.width + 'px',
              height: configItem.height + 'px',
              top: configItem.y + 'px',
              left: configItem.x + 'px',
              position: 'absolute',
              'z-index': configItem.index,
            }">
                {{dataItem[configItem.name]}}
            </div>
        </template>
      </template>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, reactive, watch } from 'vue';

  import { useRouter } from 'vue-router';
  const props = defineProps({
    dataList: {
      type: [Array],
      default: () => [],
    },
  });

  const router = useRouter();
  const goDetails = (item) => {
    console.log(item);
    router.push('/news-detail');
  };

  const state = reactive({
    config: [
      {
        id: 'JniON6qs92',
        index: 10000,
        width: 65,
        height: 53,
        isActive: false,
        x: 7,
        y: 8,
        name: 'url',
        title: '图片',
        view: 'DragImage',
        config: 'ConfigImage',
      },
      {
        id: 'FOEZHi01H-',
        index: 100001,
        width: 183,
        height: 23,
        isActive: false,
        x: 81,
        y: 42,
        title: '日期',
        name: 'createdAt',
        view: 'DragDate',
        config: 'ConfigDate',
      },
      {
        id: '6Jp5lDYfIM',
        index: 10002,
        width: 89,
        height: 25,
        isActive: true,
        x: 328,
        y: 82,
        name: 'createdByDeptName',
        title: '按钮',
        view: 'DragButton',
        config: 'ConfigButton',
      },
      {
        id: 'gWzhVigTOI',
        index: 10003,
        width: 82,
        height: 23,
        isActive: false,
        x: 86,
        y: 11,
        name: 'messageName',
        title: '标题',
        view: 'DragText',
        config: 'ConfigText',
      },
    ],
  });
  console.log(state.config, props.dataList, '----config----dataList----')
  watch(()=> props.dataList, (newValue,oldValue) => {
    console.log(newValue, 'dataList----------')   
    delay()
  })

  const delay = () => {
      nextTick(()=> {
          let width = window.innerWidth
          let ratioW = width/ 375
          let height = window.innerHeight
          let ratioH = height/ 667
          console.log(ratioW, ratioH,'width-height')
          let doms: HTMLCollectionOf<Element> = document.getElementsByClassName('dragger-container')
          console.log(doms, 'doms', doms.length)
          for(let index=0; index< doms.length; index ++) {
            doms[index].style.transform = `scale(${ratioW}, ${ratioH})`;
            doms[index].style.transformOrigin = 'left top'; 
          }
      })
  }

  onMounted(()=> {
      delay()
  })
</script>

<style scoped lang="scss">
  .dragger-container {
    position: relative;
    width: 100vw;
    padding: 0 15px;
  }
</style>
