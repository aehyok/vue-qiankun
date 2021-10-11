## Table 列表数据配置器

### 1、普通字段直接配置

    ```javascript
      {
        prop: "name",
        label: "设施名称",
        align: "center",
      }
    ```

### 2、序号字段配置（后期可直接配置自定义序号，暂时从 1 自增+1）

    ```javascript
      {
        type: "index"
      }
    ```

### 3、checkbox 字段配置（后期可添加单选框的配置）

    ```javascript
      {
        type: "checkbox"
      }
    ```

### 4、日期格式字段配置，可设置转换格式

    ```javascript
    {
        prop: "recorDate",
        label: "返乡日期",
        align: "center",
        dateFormat: "yyyy-MM-dd"
    },
    ```

### 5、字典数据转换

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

### 6、自定义字段展示内容

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

### 7、显示 image

    ```javascript
      {
        prop: "image",
        label: "自定义",
        align: "center",
        image:'image'
     },
    ```

### 8、设置字段排序(前端自动排序）

    ```javascript
      {
        prop: "image",
        label: "自定义",
        align: "center",
        sortable: true
     },
    ```

### 9、设置字段自定义调用接口排序

    ```javascript
      {
        prop: "image",
        label: "自定义",
        align: "center",
        sortable: "custom",  // 通过传递的search查询函数中添加了orders排序字段
     }
    ```
