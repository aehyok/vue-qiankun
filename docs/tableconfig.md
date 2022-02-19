## vue3 element-plus 动态table列表json配置使用说明
---

> 大家好，我是aehyok🎋，一个住在深圳城市的佛系码农🧚🏻‍♀️，如果你喜欢我的文章📚，可以通过点赞帮我聚集灵力⭐️。

> 个人github仓库地址： [https:github.com/aehyok](https:github.com/aehyok)

> 本文讲解代码仓库地址 ：  [https:github.com/aehyok/vue-qiankun](https:github.com/aehyok/vue-qiankun) 目前基于dev分支进行开发和测试

> 本demo已部署腾讯云 [http://vue.tuokecat.com](http://vue.tuokecat.com)（服务器配置较低，如有访问比较慢，请耐心等待）



### table列表json配置生成器

  - 1、 在PC端日常的使用中，使用最多的过于表单和列表了，故此对table列表和form表单进行了统一的封装，通过json配置就可以快速适配table列表和form表单。
  - 2、封装思路
      - A、列表的搜索条件和搜索按钮，这个与table 可以解耦，目前放到单独的组件中，所以本节暂不考虑
      - B、table列表显示字段，根据不同的类型进行制定
      - C、最右侧的操作按钮的配置，比如（行编辑、删除等操作），根据定义的函数进行注入，后面实现函数操作进行自定义，不与table列表冲突
      - D、特殊的字段，比如（序号字段、多选框、单选框等等）  
      - E、最后当然少不了分页器的参与
  - 3、本章节主要记录自己的table封装
-------------------

### 先来一个完整的效果展示

  - 1、列表展示字段的配置json
  ```javascript
    {
      type:'checkbox',
    },
    {
      type:'index',
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
  ```
  最后一个字段 custom 可以通过配置html，自定义展示复杂的组件和样式介入
  
- 2、右侧操作按钮的配置信息
 ```javascript
 {
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
  } 
```
其中的handleDetail和handleDel函数通过自定义实现业务对接即可。

- 3、 最后的效果图片


![微信截图_20211013150541.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c50102b6400456994e3646448dc600a~tplv-k3u1fbpfcp-watermark.image?)

### 字段配置详细介绍

#### 1、普通字段直接配置

    ```javascript
      {
        prop: "name",
        label: "设施名称",
        align: "center",
      }
    ```

#### 2、序号字段配置（后期可直接配置自定义序号，暂时从 1 自增+1）

    ```javascript
      {
        type: "index"
      }
    ```

#### 3、checkbox 字段配置（后期可添加单选框的配置）

    ```javascript
      {
        type: "checkbox"
      }
    ```

#### 4、日期格式字段配置，可设置转换格式

    ```javascript
    {
        prop: "recorDate",
        label: "返乡日期",
        align: "center",
        dateFormat: "yyyy-MM-dd"
    },
    ```

#### 5、字典数据转换

    ```javascript
    {
        prop: "sex",
        label: "性别",
        align: "center",
        dictionary:[
            {
                code: 1, name:'男',
            },
            {
                code: 2, name:'女',
            }
        ]
    },
    ```

#### 6、自定义字段展示内容

    ```javascript
      {
        prop: "",
        label: "自定义",
        align: "center",
        html: (row, column) => {
            return row.name==="集资球场" || row.address ==="22" ? `<span style="color: red;">${ row.address }</span>`:`222`
        }
     },
    ```

#### 7、显示 image

    ```javascript
      {
        prop: "image",
        label: "自定义",
        align: "center",
        image:'image'
     },
    ```

#### 8、设置字段排序(前端自动排序）

    ```javascript
      {
        prop: "image",
        label: "自定义",
        align: "center",
        sortable: true
     },
    ```

#### 9、设置字段自定义调用接口排序

    ```javascript
      {
        prop: "image",
        label: "自定义",
        align: "center",
        sortable: "custom",  // 通过传递的search查询函数中添加了orders排序字段
     }
    ```

 ### 最后的最后
> [https://github.com/aehyok/vue-qiankun](https://github.com/aehyok/vue-qiankun) 
  本文中不涉及到代码，有关代码问题可以访问文章开头的微前端github demo 仓库，github仓库将会保持持续更新，不断优化小demo。

> [https://github.com/aehyok/2022](https://github.com/aehyok/2022) 
   最后自己每天工作中的笔记记录仓库，主要以文章链接和问题处理方案为主。

    
