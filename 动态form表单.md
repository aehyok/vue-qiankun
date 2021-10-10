## Form 表单字段配置器

- 默认设置就是一行一列
- 如果想设置一行两列则需要传递参数
  ```
    // 此处columnSpan设置为12
        <form-view
          v-model:columnList="formConfig.formListItem"    // form表单字段列表
          :formData="form"             // form表单数据绑定对象
          ref="formRef"
          :columnSpan="columnSpan"     // 此处columnSpan设置为12
      />
  ```

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
  ### 8、 图片上传 image

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
   ### 9、 视频上传 video

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
   ### 10、 日期 date

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
   ### 11、 日期范围 daterange

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