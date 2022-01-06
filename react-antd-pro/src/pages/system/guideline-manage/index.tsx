import { Row, Col, Button } from 'antd';
import {PageContainer ,GridContent } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import GuidelineForm from './form'
import GuidelineTable from './table'
import GuidelineModal from './modal'
import GuidelineTree from './tree'

import { CheckCircleOutlined, CopyOutlined, DeleteOutlined, ExportOutlined, FileAddOutlined, ImportOutlined, ScissorOutlined } from '@ant-design/icons';

const GuidelineManage = () =>{


  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [defaultSelectedKeys, setDefaultSelectedKeys] = React.useState([])

  useEffect(()=> {
    console.log(defaultSelectedKeys, '12345')
  },[defaultSelectedKeys])
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <PageContainer>
            <GuidelineModal modalVisible = {isModalVisible} hiddenModal = {setIsModalVisible} />
            {/* <Modal title="Basic Modal" visible={isModalVisible}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal> */}
      <GridContent>
        <Row style={{margin: '5px'}}>
          <Col span={24}>
            <Button type="primary" icon={<DeleteOutlined />}>删除指标</Button>
            <Button icon={<FileAddOutlined />} onClick={showModal}>添加指标</Button>
            <Button type="dashed" icon={ <ExportOutlined />}>导入指标</Button>
            <Button type="primary" icon={ <ImportOutlined />}>导出指标</Button>｜
            <Button icon={<FileAddOutlined />}>添加参数</Button>
            <Button type="dashed" icon={<DeleteOutlined />}>删除参数</Button>
            <Button type="dashed" icon={<CopyOutlined />}>复制参数</Button>
            <Button type='dashed' icon={<ScissorOutlined />}>粘贴参数</Button>｜
            <Button type="dashed" icon={<CheckCircleOutlined />}>保存</Button>
            <Button type='dashed' icon={<DeleteOutlined />}>取消</Button>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <div>
              <GuidelineTree setDefault= {setDefaultSelectedKeys} />
            </div>
          </Col>
          <Col lg={17} md={24}>
            <Row gutter={24}>
              <Col span={24} style={{height:'300px', border: '1px solid black'}}>
                <GuidelineForm  guidelineId = {defaultSelectedKeys} />
              </Col>
              <Col span={24} style={{height:'300px', border: '1px solid black'}}>
                <GuidelineTable />
              </Col>
            </Row>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
}

export default GuidelineManage;
