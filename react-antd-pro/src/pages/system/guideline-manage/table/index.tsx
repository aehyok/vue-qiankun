import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from 'antd'
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormRadio } from '@ant-design/pro-form';
// import ProCard from '@ant-design/pro-card';
const { TabPane } = Tabs;
type DataSourceType = {
  id: React.Key;
  parameterName?: string;
  displayTitle?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: '624748504',
    parameterName: '活动名称一',
    displayTitle: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: '624691229',
    parameterName: '活动名称二',
    displayTitle: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
];

const GuidelineTable = (props: any) => {
  const { guidelineData } = props
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(()=> {
    console.log('table-列表',guidelineData)
  },[guidelineData])
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '参数名',
      dataIndex: 'parameterName',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '参数名为必填项' }],
        };
      },
      width: '30%',
    },
    {
      title: '显示名称',
      key: 'displayTitle',
      dataIndex: 'displayTitle',
      valueType: 'select',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '显示名称为必填项' }],
        };
      },
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '类型',
      dataIndex: 'decs',
    },
    {
      title: '顺序',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== record.id),
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="参数定义" key="1">
        <ProForm<{
          table: DataSourceType[];
        }>
          formRef={formRef}
          initialValues={{
            table: defaultData,
          }}
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            maxLength={5}
            name="table"
            recordCreatorProps={
              position !== 'hidden'
                ? {
                    position: position as 'top',
                    record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                  }
                : false
            }
            columns={columns}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        </ProForm>
      </TabPane>
      <TabPane tab="显示结果字段定义" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  );
};

export default GuidelineTable;
