<template>
	<div class="main">
    <!-- 顶部 -->
		<div class="header">
			<div class="header-left">
				<img :src="headerSetting.logoUrl" />
				<div class="left-title">qiankun综合服务平台</div>
			</div>
      <div class="right-notice">				
        <img :src="headerSetting.hornUrl" class="new-img"/>
        <div class="new-con">
          <el-carousel 
          height="36px" 
          direction="vertical" 
          :autoplay="true"
          indicator-position="none"
          >
            <el-carousel-item v-for="item in newList" :key="item" class="carousel-class" @click="goNewinfo(item.id)"> 
              <div class="top-title">{{item.title}}</div>
              <div>{{item.createdAt.split(" ")[0]}}</div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
		</div>
    <!-- 内容 -->
    <div class="content">
      <div class="con-top">
        <!-- indicator-position="outside" -->
        <el-carousel height="420px">
          <el-carousel-item v-for="item in swiperImageList" :key="item">
            <img :src="item" class="con-top-img"/>
          </el-carousel-item>
        </el-carousel> 
        <img :src="swiperCenterImage" alt="" class="banner-center"> 
      </div>
      <!-- 子系统模块 -->
      <div class="system" v-if="showHome">
        <swiper class="mySwiper" :slidesPerView="5" :navigation="true">
          <swiper-slide v-for="(item,index) in modeuleList" :key="index">
            <div @click="jumpChildSystem(item)" 
              class="module-system" 
              :class="item.systemId == activeModule ? 'active-module' : ''"   
              @mouseover="activeModule = item.systemId" 
              @mouseleave="activeModule = ''">
                <img :src="item.systemId == activeModule ? item.selected: item.normal"/>
                <div class="module-title">{{item.title}}</div>
              </div>
            </swiper-slide>
        </swiper>
      </div>
      <div class="echarts" v-if="showHome">
        <div class="center">
          <div class="left">
            <!-- 人口概况 -->
          </div>
          <div class="right">
            <!-- 账号信息 -->
            <div class="me-info">
              <div class="me-avator">
                <img :src="avator" class="me-avator-img"/>
              </div>
              <div class="me-name">
                <div>{{nickName}}</div>
                <div style="margin-top:15px;">
                  <el-button @click="updatePasswordClick" type="primary" size="medium">修改密码</el-button>
                  <el-button @click="logoutClick" type="primary" size="medium">退出</el-button>
                </div>
              </div>
            </div>
            <!-- 杨陵概况 -->
            <div class="intro">
                <div class="intro-title">杨陵概况</div>
                <div class="charts-line"></div>
                <div class="swiper">
                  <el-carousel height="200px">
                    <el-carousel-item v-for="item in introduceList" :key="item">
                      <img :src="item" class="con-top-img"/>
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div class="intro-content">杨陵，是陕西杨凌农业高新技术产业示范区下辖唯一县级行政区。地处陕西关中平原,因隋文帝杨坚陵寝在此而得名。全区总面积135平方公里，人口24万，是陇海铁路、郑西高铁、连霍高速沿线的重要节点城市，也是西安国际化大都市圈的重要组成部分和关中——天水经济区中最具发展活力的战略板块。</div>
                <div class="intro-button">
                  <el-button @click="goInfo" type="primary">
                    查看详情<i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </div>
                <!-- 外出务工情况 -->
                <outWorker  :num="echartsNum" :data="chartsData7" :key="new Date().getTime()" class="mt-10" />
                <!-- 乡村治理居民参与情况 -->
                <participation  :num="echartsNum" :data1="chartsData9" :data2="chartsData10" :key="new Date().getTime()" class="mt-10"/>
            </div>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div v-if="!showHome" class="info-class">
        <div class="info">
          <img :src="closeImage" class="info-close-img" @click="showHome = true"/>
          <div class="info-title">杨陵区情概况</div> 
          <div class="info-list">
            <span class="sub-title">政区划分</span>
            区辖两镇（五泉镇、揉谷镇）三办（杨陵街道办事处、李台街道办事处、大寨街道办事处），54个行政村，22个社区。
          </div>
          <div class="info-list">
            <span class="sub-title">人口面积</span>
            全区总面积135平方公里，城区面积26.6平方公里，总人口24万人，耕地面积7.81万亩。
          </div>
          <div class="info-list">
            <span class="sub-title">自然特征</span>
            区内三面环水，南界为渭河，东界为漆水河，北界为小湋河。宝鸡峡二支渠、渭惠渠、高干渠等人工渠系越境而过，水资源丰富、水利条件优越。区内地势南低北高，依次形成三道塬坡，海拔435-563米。境内塬、坡、滩地交错，土壤肥沃，适宜多种农作物生长。年降水量635.1—663.9毫米，年均气温12.9℃，属暖温带季风半湿润气候区。
          </div>
          <div class="info-list">
            <span class="sub-title">经济概况</span>
            2020年全年地区生产总值151.7亿元；固定资产投资增长4.5%；农业增加值增长4.3%；城乡居民人均可支配收入分别增长4.3%和7.8%。
          </div>
          <div class="info-list">
            <span class="sub-title">工业发展</span>
            紧盯高质量发展目标，全力促进工业稳增长，农副产品加工、饲料生产、农化生物平稳健康发展，占全区规上工业总产值68.7%。培育规上工业企业3家、亿元企业2家、农业科技小巨人3家。申报创新创业团队7家、“专精特新”企业6家、民营经济转型升级示范企业5家。锣鼓产业园和化建新材料产业园共入驻企业21家。
          </div>
          <div class="info-list">
            <span class="sub-title">乡村振兴</span>
            扎实推进特色现代农业建设，现代农业融合体验园建成投用，特色现代农业示范园等项目建设进展顺利，建成单品冠军园5个。建成新式大棚2032亩，推广基质栽培技术1029亩、有机肥2670亩，小麦、玉米平均亩产达470余公斤，畜禽总存栏23.02万头（羽）。新成立农业专家试验示范基地5个，百名专家服务团推广新技术、新品种30余项。开展农业培训21场，对外输出农技劳务1万余人。累计发展农业龙头企业49家、专业合作社321家，培训职业农民1453人。
          </div>
          <div class="info-list">
            坚持把农村人居环境整治作为实施乡村振兴战略的基础，“八清一改”扎实开展，“厕所革命”深入实施，无害化卫生厕所占比达90.79%，建成农村“三园”369座，生活垃圾有效治理村达到100%，83%的农村污水实现有效管控，村容村貌明显转变。 
          </div> 
          <div class="info-list">
            脱贫攻坚成果持续巩固，建立健全防返贫监测机制和常态化帮扶机制，常态化落实兜底政策，“两不愁三保障”和农村安全饮水问题基本解决。积极引进引导帮助相对困难群众发展农业产业，推进巩固脱贫攻坚成果与乡村振兴有效衔接。
          </div> 
          <div class="info-list">
            <span class="sub-title">第三产业</span>
            始终把“三产兴区”作为重要战略任务，大力发展夜间经济、假日经济，杨凌风情商业街夜间经济聚集区繁荣发展，“箱遇星空”后备箱集市、会展旅游节等导流促销活动成功举办。王上村守望田园民宿、马家底湋水乡邻康乐谷建成投用，研学游、周末游、采摘游等蓬勃开展。全年预计接待游客428万人次，旅游综合收入20.6亿元。
          </div>
          <div class="info-list">
            <span class="sub-title">城市品质</span>
            坚持以人为本不断提高城市精细化管理水平，省道107项目即将竣工，国道344、杨扶路(高干渠-孟杨路段）等项目扎实推进。老城区雨污分流、供热管网和街心花园建设、城市“六乱”专项整治取得实效，老旧小区改造加快实施。国有物业公司成功接管14个安置小区，曹新庄垃圾填埋场二期加快建设，购置新能源纯电动公交车30辆。五泉重点示范镇建设位列全省前三、揉谷镇进入第一方阵。
          </div>
          <div class="info-list">
            <span class="sub-title">人文自然景观</span>
            境内有国家一级文物保护单位泰陵（即杨坚陵）、古农师后稷封地（古邰国遗址）、唐太宗李世民出生地（庆善宫遗址）等文物古迹。后稷教稼园、周尧昆虫博物馆、水保所人工降雨大厅、中国克隆动物基地、新天地设施农业园等一大批富具科普内容的旅游景点蜚声海外。亚洲第一规模的水上运动中心、邰城休闲广场、杨陵“蘸水面”、绿色无公害蔬菜等令游人留恋忘返、赞不绝口。
          </div>
          <div class="info-list">
            <span class="sub-title">生态环境</span>
            严格落实“限煤、降尘、控车、减排、增绿、打违”六大治理措施，全年空气质量优良天数242天。以饮水安全、污水收集、流域达标为基准，常态化开展“三河两渠”巡查管控。严格落实“一控两减三基本”管控措施，农药化肥使用实现“零增长”，秸秆综合利用率、畜禽资源化利用率分别达到96%和88%。
          </div>
          <div class="info-list">
            <span class="sub-title">社会事业</span>
            稳就业举措扎实有效，举办创业培训班6期，新开发公益性岗位232个，召开线上、线下招聘活动14场次，为1万余名劳动力找到合适岗位。恒大小学二期项目等加快建设，11所校园环境改造提升工程全面完成，新投用公办幼儿园4所。教师职称评审、全员聘用制等改革基本完成，岗位工资升级分档改革积极推进，“两支队伍”综合素质持续提升。基层卫生院（室）提升改造项目正在收尾，健康促进区创建积极开展，家庭医生签约有序进行，医药卫生体制改革不断深化。打造幸福院改造提升示范点10个，建成养老驿站5所，社区志愿服务站实现全覆盖。
          </div>
          <div class="info-list">
            <span class="sub-title">社会治理</span>
            坚持扫黑除恶专项斗争和无黑无恶创建两线作战、惩治黑恶与社会治理融合推进,一批乱象乱点问题得到有效整治，涉黑涉恶问题线索办结率99.3%，基本实现了行业无乱象、黑恶滋生无空间。矛盾纠纷排查化解工作扎实推进，矛盾纠纷化解率94.9%，网格事件办结率98.64%。突出重点领域监管，强化源头管控，安全生产、食品药品安全和市场监管扎实有效。
          </div>
        </div> 
      </div>
    </div>
    <UpdatePassword v-model="updateDialogVisible"  @cancel="close"/>
	</div>
</template>
<script lang="ts">
	import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted, ref } from "vue"
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import 'swiper/swiper.scss';
	import "swiper/components/pagination/pagination.min.css"
	import "swiper/components/navigation/navigation.min.css"
	import { useRouter } from 'vue-router';
  import  handConfig  from '../../public/config/index'
	import { useStore } from 'vuex';
  import { 
    logout, 
} from '../services'
  import UpdatePassword from '../components/update-password.vue'
  import SwiperCore, {
    Pagination,Navigation
  } from 'swiper/core';
  // install Swiper modules
  SwiperCore.use([Pagination,Navigation])
	export default defineComponent({
		components: {
			Swiper,
    	SwiperSlide,
      UpdatePassword,
		},
		setup() {
			const { proxy } = getCurrentInstance()
			const router = useRouter()
			const store = useStore()
			const state = reactive({
					showHome: true,
          updateDialogVisible: false,
          avator: 'images/home/icon-avator.png',
          nickName:JSON.parse(localStorage.getItem('token')).nickName, // 账户名称
          newList:[], // 顶部消息列表
          swiperCenterImage: "images/home/swiper-title.png",
          closeImage: 'images/home/close.png',
          swiperImageList: [ // 轮播图片列表
            'images/home/banner-01.png',
            'images/home/banner-02.png',
            'images/home/banner-03.png'
          ],
          introduceList: [ // 轮播图片列表
            'images/home/introduce-01.png'
          ],
          headerSetting: { // 顶部导航
            logoUrl: "images/home/icon_logo.png",
            hornUrl: "images/home/icon_horn.png"
          },
          activeModule:'', // 系统模块
          treeData:{},
          area:'', // 区域
          areaOptions: [], // 区域数据
          town:'', // 镇
          townOptions: [], // 镇数据
          village:'', // 村
          villageOptions: [], // 村数据
          echartsNum: 0,
          chartsData1:[], // 人口概况 男女比例
          chartsData2:[], // 人口概况 人口类型
          chartsData3:[], // 农村居民平均年收入
          chartsData4:[], // 乡村治理荣誉
          chartsData5:[], // 随手拍事件分类统计
          chartsData6:[], // 随手拍办理情况统计
          chartsData7:[], // 外出务工情况
          chartsData8:[], // 农作物占耕地统计
          chartsData9:[], // 乡村治理居民参与情况 男女
          chartsData10:[], // 乡村治理居民参与情况 年龄段
			})
      // 获取下拉框数据
      const getTreeData = async() => {
      }
			// 模块列表
			const  { modeuleList,jumpChildSystem	} = useModuleSetting(router,store, proxy)
      const updatePasswordClick = () => {
        // console.log('updatePassword')
        state.updateDialogVisible = true
      }
      // 切换镇
      const changeTown = (id) =>{
        // console.log(id, 'id++__+++',state.treeData.children)
        
      }
      // 获取echart数据
      const getChartData = () =>{
        state.echartsNum++
        // 人口概况 男女比例
        
        // 人口概况 人口类型
        
        // 农村居民平均年收入
   
        // 乡村治理荣誉

        // 随手拍事件分类统计

        // 随手拍办理情况统计

        // 外出务工情况

        // 乡村治理居民参与情况 男女

        // 乡村治理居民参与情况 年龄段

        // 农作物占耕地统计

      }
      onMounted(() => {
        getTreeData()
        getNews()
      })
      // 获取顶部的消息滚动
      const getNews = async() => {  
        
      }
      // 查看公文详情
      const goNewinfo = (id) =>{
        router.push(`/dvs-digital/document-info?id=${id}`)
      }
      const search = (type) => {
        
      }
      // // 查看详情
      const goInfo = () =>{
        state.showHome = false
        window.scroll(0,0)
      }
      const close = () => {
        state.updateDialogVisible = false
      }
      // echarts 统计报表
      const {logoutClick } = useEchartsSetting(proxy, router)
			return {
        ...toRefs(state),
        logoutClick,
        modeuleList,
        jumpChildSystem,
        updatePasswordClick,
        goInfo,
        goNewinfo,
        search,
        getTreeData,
        getChartData,
        changeTown,
        close,
			}
		} 
	})

	function useModuleSetting(router,store,proxy) {
		const modeuleList = reactive(
			handConfig.systemList
		)
		const jumpChildSystem = (child: any) => {
			// console.log(child, 'jumpChildSystem')
			store.commit('changeSystem',child.systemId)
			if(child.path) {
				router.push(child.path)
			}else {
				proxy.$alert('请联系管理员，配置相关子系统！')
			}
		}
		return {
			modeuleList,
			jumpChildSystem,	
		}
	}

  function useEchartsSetting(proxy, router) {
    const logoutClick = () => {
      proxy.$confirm('请问是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          logout().then((res:any ) => {
            console.log('登出成功', res)
            localStorage.clear()
            router.push('/login')
          })
        })
        .catch(() => {
          return false
        })
    }
    return {
      logoutClick,
    }
  }
</script>
<style lang="scss" scoped>
	.main {
    display: flex;
		flex-direction: column;
	}
  .header {
    width:1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    line-height: 40px;
    color: #fff;
    margin:10px auto;
    img {
      width: 76px;
      height: 76px;
    }
    .header-left{
      display: flex;
      align-items: center;
    }
    .left-title {
      color:#666;
      margin-left:18px;
      font-size:28px;
      font-weight:bold;
    }
    // 顶部消息样式
    .right-notice {
      display: flex;
      align-items: center;
      width:460px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color:#666666;
      background:rgba(204, 204, 204, 0.2);
      border-radius: 16px;
      .new-img{
        width:20px;
        height:20px;
        margin:0 6px 0 8px;
      }
      .new-con{
        flex:1;
        .carousel-class{
          display: flex;
          cursor: pointer;
          .top-title{
            width:336px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  // 内容样式
  .content{
    .con-top{
      position: relative;
      width:1280px;
      margin:0 auto;
      .banner-center{
        width:459px;
        height:71px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index:99;
      }
    }
    .con-top-img{
      width: 100%;
      height:100%;
    }
    .system {
      background: #2F48B8;
      .mySwiper {
        width:1280px;
        padding: 0 40px 0 0;
        box-sizing: border-box;
      }
      :deep(.swiper-button-prev){
        left:0;
      }
      :deep(.swiper-button-next){
        right:0;
      }
      .module-system {
        width:206px;
        height:116px;
        border-radius: 6px;
        color:#fff;
        background:#486BEC;
        margin:36px 42px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          align-items: center;
          width:60px;
          height:60px;
        }
      }
      .module-system:hover {
        background: #F7B500;
      }
    }
  }
  .echarts {
    background-color:#102585;
    .center {
      margin:0 auto;
      width:1200px;
      padding:30px 0 100px;
      display: flex;
      color:#fff;
      .left {
        flex:2;
        margin-right:16px;
        .select-div{
          background:#2F48B8;
          padding: 10px;
          border-radius: 3px;
          .select-btn{
            background-color: #F7B500;
            border-color: #F7B500;
          }
          .select-btn1{
            background-color: rgba(255,255,255,0);
            border-color: #F7B500;
            color: #F7B500;
          }
        }
        .select{
          margin-left: 10px;
          width:156px;
        }
      }
      .right{
        flex:1;
        .me-info {
          display: flex;
          align-items: center;
          background:url('../images/home/meinfo.png');
          background-size:100% 100%;
          .me-avator {
            margin:20px;
            .me-avator-img{
              width: 60px;
              height:60px;
            }
          }
          .me-name {
            flex: 1;
          }
        }
        .intro {
          margin-top:12px;
          padding: 0 16px 16px;
          box-sizing: border-box;
          background:#2F48B8;
          color: #fff;
          border-radius: 6px;
          &-title {
            padding:16px 0 6px;
            color: #506FFE;
            font-weight: 700;
            font-size: 18px;
          }
          &-content {
            font-size: 14px;
            line-height:28px;
            margin: 16px 0 26px;
            font-family: PingFang-SC-Medium, PingFang-SC;
          }
          &-button {
            text-align: center;
            margin-bottom: 30px;
          }
        }
      }
    }
  }
	:deep(.el-carousel__indicators--outside) {
		background-color: #102585;
	}
	.leftecharts {
    width:100%;
    background: #102585;
    color:white;
  }
  :deep(.select .el-input__inner) {
    background: #4B68EC;
    color:#fff;
    height: 36px;
    border: none;
  }
	.select:nth-child(3) {
     padding-right:10px;
  }
  // 详情样式
  .info-class{
    background: #102585;
    padding-bottom:20px;
    .info{
      width:1080px;
      background: #2F48B8;
      position: relative;
      margin: 0 auto;
      color:#fff;
      padding: 0 20px 10px;
      border-radius: 6px;
      font-size:14px;
      .info-close-img{
        position: absolute;
        top:6px;
        right:6px;
        cursor: pointer;
      }
      .info-list{
        margin-bottom:16px;
        line-height: 24px;
        color:rgba(255,255,255,0.7);
      }
      .sub-title{
        font-weight: 700;
        margin-right:20px;
        color:#fff;
      }
      .info-title{
        text-align: center;
        font-size:20px;
        line-height:70px;
      }
    }
  }
</style>  