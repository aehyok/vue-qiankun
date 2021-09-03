<template>
    <div class="container">
        <div class="header">
            <div>Dynamic Form Design</div>
            <div>
                <el-button type="primary" size="mini">导入JSON</el-button>
                <el-button type="primary" size="mini">生成JSON</el-button>
            </div>
        </div>
        <div class="body">
            <div class="left-component">
                <div style="font-weight: 600; margin: 15px;">表单组件</div>
                <el-row>
                    <template v-for="item in componentList">
                        <el-col :span="12" @click="componentClick(item)" class="item-component">
                            <i class="el-icon-apple"></i>
                            {{item.title}}
                        </el-col>
                    </template>
                </el-row>
            </div>
            <div class="center">
                <el-form :model="state.formConfig.formData" label-width="120px"  >
                    <form-view
                        :columnList="state.formConfig.formListItem"
                        :formData="state.formConfig.formData"
                        @componentExampleClick = "componentExampleClick"
                    />
                </el-form>
            </div>
            <div class="right-component">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="组件配置" name="first">组件配置</el-tab-pane>
                    <el-tab-pane label="组件样式" name="second">组件样式</el-tab-pane>
                    <el-tab-pane label="表单配置" name="third">表单配置</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import FormView from "../../../common/components/form/drag-index.vue";
import shortid from 'shortid';
    const componentList = ref([])
    const activeName = ref('first')
    const handleClick = (tab, event) => {
        console.log(tab, event);
      }
    const state = reactive({
        options: {
        mode: "code",
        mainMenuBar: false
        },
        show: true,
        formConfig: {
        formListItem: [
            
        ],
        formData: {
            staticData: '测试数据组合',
            name: "主菜单栏目",
            total: null,
            count: null,
            createDate: 1606730360386,
            type: 1,
            requireType: undefined,
            creType: undefined,
            range: [],
            isExpired: false,
            isValid: true,
            type11: 1,
            area: "2",
            unit:"1",
            requireType: 1,
        }
        }
    });


    componentList.value = [
        {
            id: 0,
            name:"static",
            title: "静态文本",
        },
        {
            id: 1,
            name:"text",
            title: "文本框"
        },
        {
            id: 2,
            name:"textarea",
            title: "多行文本"
        },
        {
            id: 3,
            name:"number",
            title: "数字框"
        },
        {
            id: 4,
            name:"select",
            title: "下拉框",
            dictionary: true
        },
        {
            id: 5,
            name:"radio",
            title: "单选框",
            dictionary: true
        },
        {
            id: 6,
            name:"checkbox",
            title: "多选框",
            dictionary: true
        },
        {
            id: 7,
            name:"date",
            title: "日期选择"
        },
        {
            id: 8,
            name:"daterange",
            title: "日期范围"
        },
        {
            id: 9,
            name:"switch",
            title: "开关"
        },
        {
            id: 10,
            name:"text",
            title: "文本框"
        },
    ]
    
    const componentExampleClick = (item) => {
        console.log('ssssssssss')
    }

    const componentClick = (item) => {
        console.log("当前组件为: ",item);
        let column = {
            name: shortid.generate(),
            type: item.name,
            title: item.title
        }
        if(["select","radio","checkbox"].includes(item.type)) {
            column.dictionary = [
                {
                    code:1,
                    name:"图片"
                },
                {
                    code:2,
                    name:"视频"
                }
            ]
        }
        state.formConfig.formListItem.push(column)
    }
</script>
<style scoped="scss">
    .container {
        border: 1px solid #EAECEF; 
        width: 100%;
        height: 90vh; 
        display:flex;
        flex-direction:column;
    }
    .header {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #EAECEF;
        display: flex;
        align-items: center;
        font-weight: 600;
        justify-content: space-between;
    }
    .body{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .left-component {
        min-width: 200px;
        max-width: 300px;
        height: calc(90vh - 60px);
        border-right: 1px solid #EAECEF;
        padding: 5px;
    }
    .right-component {
        min-width: 360px;
        height: calc(90vh- 60px);
        border-left: 1px solid #EAECEF;
    }
    .center {
        width: 100%;
        height: calc(90vh- 60px);
        padding: 10px;
    }
    .item-component {
        border: 1px solid #EAECEF;
        padding: 25px;
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .item-component:hover {
        background: #2E73FF;
        color: white;
        cursor: pointer;
    }
</style>