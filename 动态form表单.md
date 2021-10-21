> ⚠️本文为掘金社区首发文章，未获授权禁止转载

> 大家好，我是aehyok🎋，一个住在深圳城市的佛系码农🧚🏻‍♀️，如果你喜欢我的文章📚，可以通过点赞帮我聚集灵力⭐️。

> 个人github仓库地址： [https:github.com/aehyok](https:github.com/aehyok)

> 本文讲解代码仓库地址 ：  [https:github.com/aehyok/vue-qiankun](https:github.com/aehyok/vue-qiankun) 目前基于dev分支进行开发和测试

> 本demo已部署腾讯云 [http://vue.tuokecat.com](http://vue.tuokecat.com)（服务器配置较低，如有访问比较慢，请耐心等待）

> table封装路径为根路径下的 vue-qiankun/common/components/form/


### form表单json配置生成器

  - 1、 在PC端日常的使用中，使用最多的莫过于表单和列表了，故此对table列表和form表单进行了统一的封装，通过json配置就可以快速适配table列表和form表单。
  - 2、本章节主要记录自己的form表单封装
  - 3、封装思路
  
      - A、根据布局,一行一列默认可不设置（columnSpan设置为24），一行两列可设置参数columnSpan设置为12，后续以此类推

      - B、根据不同的字段类型，分别对应子组件进行渲染

      - C、子组件根据不同的类型，以及配置的类型字段进行渲染和数据绑定

      - D、子组件可以设置必填项和rules表单验证规则

      - E、可以通过设置字段的值，去控制其他字段的展示和隐藏

      - F、下拉等字典类型数据，可统一设置读取接口数据，也可以根据需要进行传递当前数组数据

      - G、图片上传可设置上传接口，并可设置上传多张图片

      - H、富文本编辑器也可以作为组件嵌入表单
      
      - I、 ......
      
-------------------

### 先来一个完整的效果展示

  - 1、form表单配置json

  ```javascript
    {
    "formListItem": [
      {
        "name": "name1",
        "type": "text",
        "title": "栏目标题",
        "required": true
      },
      {
        "name": "name",
        "type": "text",
        "title": "栏目名称"
      },
      {
        "name": "total",
        "type": "number",
        "title": "栏目数量",
        "required": true
      },
      {
        "name": "count",
        "type": "number",
        "title": "浏览数量"
      },
      {
        "name": "descript",
        "type": "textarea",
        "title": "备注",
        "required": true,
        "rows": 3
      },
      {
        "name": "content",
        "type": "textarea",
        "title": "内容",
        "rows": 3
      },
      {
        "name": "startDate",
        "type": "date",
        "title": "开始日期",
        "required": true
      },
      {
        "name": "endDate",
        "type": "date",
        "title": "结束日期"
      },
      {
        "name": "isValid",
        "type": "switch",
        "title": "是否有效"
      },
      {
        "name": "isExpired",
        "type": "switch",
        "title": "是否过期",
        "required": true
      },
      {
        "name": "type",
        "type": "radio",
        "dictionary": [
          {
            "code": 1,
            "name": "横版栏目"
          },
          {
            "code": 2,
            "name": "竖版栏目"
          }
        ],
        "title": "栏目类型",
        "controls": [
          {
            "value": 1,
            "showCondition": [
              {
                "name": "show",
                "type": "radio",
                "dictionary": [
                  {
                    "code": 1,
                    "name": "China"
                  },
                  {
                    "code": 2,
                    "name": "English"
                  }
                ],
                "title": "测试类型",
                "required": true
              },
              {
                "name": "image1",
                "type": "ImageTypeView",
                "title": "文件"
              }
            ]
          },
          {
            "value": 2,
            "showCondition": [
              {
                "name": "isValids",
                "type": "switch",
                "title": "是否有效"
              }
            ]
          }
        ]
      },
      {
        "name": "requireType",
        "type": "radio",
        "dictionary": [
          {
            "code": 1,
            "name": "类型一"
          },
          {
            "code": 2,
            "name": "类型二"
          }
        ],
        "title": "图文类型",
        "required": true
      },
      {
        "name": "range",
        "type": "checkbox",
        "title": "发布范围",
        "dictionary": [
          {
            "code": 1,
            "name": "范围一"
          },
          {
            "code": 2,
            "name": "范围二"
          }
        ],
        "required": true
      },
      {
        "name": "dateRange",
        "type": "daterange",
        "title": "日期范围"
      },
      {
        "name": "creType",
        "type": "select",
        "dictionary": [
          {
            "code": 1,
            "name": "身份证"
          },
          {
            "code": 2,
            "name": "居住证"
          }
        ],
        "title": "证件类型"
      },
      {
        "name": "image",
        "type": "image",
        "title": "头像"
      }
    ],
    "formData": {
      "name": "主菜单栏目",
      "total": null,
      "count": null,
      "createDate": 1606730360386,
      "type": 1,
      "creType": "",
      "range": [],
      "isExpired": false,
      "isValid": true
    }
  }
  ```

- 2、 最后的效果图片


![微信截图_20211019153602.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36f8668b5a694f85959755b1b05b4ac7~tplv-k3u1fbpfcp-watermark.image?)

效果展示的在线预览页面为 http://vue.tuokecat.com/#/webpack-app/form

具体代码可根据路由进行搜索

### 字段配置详细介绍

### 1、静态文本 static

    ```javascript
      {
        type: "static",  // 字段类型只读文本
        name: "name",   //与后台对接字段
        title: "名称",  // 前端展示字段
      },
    ```

### 2、文本框 text 

    ```javascript
      {
        type: "text",  // 字段类型文本框
        name: "name",  //与后台对接字段
        title: "域名",  // 前端展示字段
        required: true, // 必填项设置
        maxlength: 50,  // 字符串长度限制
        showwordlimit： true, // 是否显示字符串长度
        placeholder："请输入10个字符以内的名称", // 占位文本提示
        append: ".com",  // 文本框后置内容
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```

### 3、文本域 textarea

    ```javascript
      {
        type: "textarea",  // 字段类型文本域
        name: "name",  //与后台对接字段
        title: "备注",  // 前端展示字段
        required: true, // 必填项设置
        placeholder："请输入10个字符以内的名称", // 占位文本提示
        rows: 4, //  输入框行数
        minlength: 100, // 最小输入长度
        maxlength: 5000,  // 最大输入长度
        showwordlimit： true, // 是否显示字符串长度
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```

### 4、下拉框 select

    ```javascript
      {
        type: "select",  // 字段类型下拉框
        name: "options",   //与后台对接字段
        title: "类型",  // 前端展示字段
        required: true, // 必填项设置
        placeholder:"请选择类型",  // 占位文本提示
        // dictionary  可直接传递下拉数据，也可以传递字典中的typeCode,通过内部接口获取
        dictionary: 7010, // 7010为字典中维护的typecode
        dictionary:[
          {
            code: 1, name:"图片",
          },
          {
            code: 2, name:"视频"
          }
        ],
        multiple: true, // 下拉列表可以多选
        // rules // 正则匹配
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '只能选择*******' }
        ],
        // 点击下来触发切换联动的事件，为一个函数
        changeFunction: function(){}
      },
    ```

### 5、富文本 editor

    ```javascript
      {
        type: "editor",  // 字段类型富文本
        name: "content",   //与后台对接字段
        title: "内容",  // 前端展示字段
        required: true, // 必填项设置
        placeholder:"请选择类型",  // 占位文本提示
        // rules // 正则匹配
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '只能选择*******' }
        ],
        maxLength:5000, // 富文本框最大长度，默认5000
      },
    ```

### 6、数值框 number

    ```javascript
      {
        type: "number",  // 字段类型数值
        name: "num",  //与后台对接字段
        title: "总数",  // 前端展示字段
        required: true, // 必填项设置
        placeholder："请输入10个字符以内的名称", // 占位文本提示
        precision: 2,  // 小数点后的位数
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```
 ### 7、省市区三级级联选择 citySelect

    ```javascript
      {
        type: "citySelect",  // 字段类型省市区
        name: "region",  //与后台对接字段
        title: "户籍地",  // 前端展示字段
        required: true, // 必填项设置
        placeholder："请输入10个字符以内的名称", // 占位文本提示
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```   
  #### 8、 图片上传 image

    ```javascript
      {
        type: "image",  // 字段类型图片
        name: "images",  //与后台对接字段
        title: "上传图片",  // 前端展示字段
        required: true, // 必填项设置
        placeholder："请上传图片", // 占位文本提示
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```      
   #### 9、 视频上传 video

    ```javascript
      {
        type: "video",  // 字段类型视频
        name: "images",  //与后台对接字段
        title: "上传视频",  // 前端展示字段
        required: true, // 必填项设置
        placeholder："请上传视频", // 占位文本提示
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```      
   #### 10、 日期 date

    ```javascript
      {
        type: "date",  // 字段类型日期
        name: "date",  //与后台对接字段
        title: "日期",  // 前端展示字段
        required: true, // 必填项设置
        placeholder："请选择日期", // 占位文本提示
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```      
   #### 11、 日期范围 daterange

    ```javascript
      {
        type: "daterange",  // 字段类型日期
        name: "date",  //与后台对接字段
        title: "日期范围",  // 前端展示字段
        required: true, // 必填项设置
        placeholder："请选择日期", // 占位文本提示
        // rules // 数组
        rules: [
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
        ],
      },
    ```  
    
### 附上整个调用的所有代码
          
   - 1、template 模板代码       
  ```javascript
    <template>
      <div>
        <sl-table
          :list="list"
          @handleSelectionChange="handleSelectionChange"
          :columns="columns"
          :operates="operates"
          v-model:pageModel="pageModel"
          @search="search"
        >
        </sl-table>
      </div>
    </template>
  ```
  - 2、'script'标签代码
  ```javascript
  import SlTable from '../../../common/components/table/index.vue'
import { defineComponent, reactive, toRefs } from "vue";
import { list_test, columns_test } from "./tableConfig";
export default defineComponent({
  components: { SlTable },
  setup() {
    // 选中行
    const handleSelectionChange = (val) => {
      console.log("handleSelectionChange-val:", val);
    };
    // 编辑
    const handleDetail = (index, row, idx) => {
      console.log("index:", index, idx);
      console.log("row:", row);
    };
    // 删除
    const handleDel = (index, row) => {
      console.log(" index:", index);
      console.log(" row:", row);
    };

    const state = reactive({
      pageModel: {
        page: 1,
        limit: 10,
        total: 17
      },
      list: [], // table数据
      columns: [], // 需要展示的列
      operates: {
        width: 200,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "查看",
            type: "text",
            show: true,
            disabled: false,
            method: (index, row, ss) => {
              handleDetail(index, row, ss);
            }
          },
          {
            id: "2",
            label: "删除",
            type: "text",
            show: true,
            disabled: false,
            method: (index, row) => {
              handleDel(index, row);
            }
          }
        ]
      } // 列操作按钮
    });

    state.list = list_test;
    state.columns = columns_test;
    const search = () => {
      state.list = [...state.list];
      console.log(state.pageModel, "state.pageModel");
    };
    return {
      ...toRefs(state),
      handleSelectionChange,
      search
    };
  }
});
  ```
  - 3、其中模拟数据和字段配置在单独的文件中tableConfig
  
  ```javascript
      const list_test =
[
    {
        id: "24",
        title: "编号3",
        state: 0,
        createTime:"2021-09-23T17:57:09",
        remark: "自定义"
    },
    {
        id: "23",
        title: "编号4",
        state: 1,
        createTime:"2021-09-23T17:57:19",
        remark: "自定义"
    },
    {
        id: "23",
        title: "编号5",
        state: 2,
        createTime:"2021-09-23T17:57:29",
        remark: "自定义"
    },
    {
       id: "23",
       title: "编号5",
       state: 1,
       createTime:"2021-09-23T17:57:39",
       remark: "自定义111"
    },
    {
        id: "223",
        title: "编号3",
        state: 1,
        createTime:"2021-09-23T17:57:49",
        remark: "22222"
    },
    {
        id: "2444",
        title: "编号3",
        state: 0,
        createTime:"2021-09-23T17:57:59",
        remark: "333333"
    },
    {
      id: "24",
      title: "编号3",
      state: 0,
      createTime:"2021-09-23T17:57:09",
      remark: "自定义"
  },
  {
      id: "23",
      title: "编号4",
      state: 1,
      createTime:"2021-09-23T17:57:19",
      remark: "自定义"
  },
  {
      id: "23",
      title: "编号5",
      state: 2,
      createTime:"2021-09-23T17:57:29",
      remark: "自定义"
  },
  {
     id: "23",
     title: "编号5",
     state: 1,
     createTime:"2021-09-23T17:57:39",
     remark: "自定义111"
  },
  {
      id: "223",
      title: "编号3",
      state: 1,
      createTime:"2021-09-23T17:57:49",
      remark: "22222"
  },
  {
      id: "2444",
      title: "编号3",
      state: 0,
      createTime:"2021-09-23T17:57:59",
      remark: "333333"
  }
]

const columns_test = [
    {
        type:'checkbox',
    },
    {
      prop: "id",
      label: "编号",
      type:'index',
      align: "center"
    },
    {
      prop: "title",
      label: "标题",
      align: "center",
    },
    {
      prop: "createTime",
      label: "创建时间",
      align: "center",
      dateFormat: "yyyy-MM-dd HH:mm:ss",
      sortable: true
    },
    {
      prop: "state",
      label: "状态",
      align: "center",
      dictionary: [
        { code: 0, name: "待审核"},
        { code: 1, name: "已审核"},
        { code: 2, name: "审核中"},
      ]
    },
    {
      prop:"custom",
      label:"自定义",
      align: "center",
      html: (row, column) => {
        return row.title==="编号3" ? `<span style="color: red;">${ row.remark }</span>`:`未定义`
      }
    }
  ]
export {
    list_test,
    columns_test
}
  ```
  
### 最后的最后
> [https://github.com/aehyok/vue-qiankun](https://github.com/aehyok/vue-qiankun) 
  本文中不涉及到代码，有关代码问题可以访问文章开头的微前端github demo 仓库，github仓库将会保持持续更新，不断优化小demo。

> [https://github.com/aehyok/vue3-ele-form](https://github.com/aehyok/vue3-ele-form)  
   同时对json数据配置生成动态form表单和table列表也会持续优化，目前刚刚在公司项目中尝试，等机会合适可能就让同事一起参与进来。

> [https://github.com/aehyok/2021](https://github.com/aehyok/2021) 
   最后自己每天工作中的笔记记录仓库，主要以文章链接和问题处理方案为主。

    

## Form 表单字段配置器

