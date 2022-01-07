import { Row, Col, Button } from 'antd';
import {PageContainer ,GridContent } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import GuidelineForm from './form'
import GuidelineTable from './table'
import GuidelineModal from './modal'
import GuidelineTree from './tree'
import { GetGuidelineDefine} from '@/services/guideline/api'
import { CheckCircleOutlined, CopyOutlined, DeleteOutlined, ExportOutlined, FileAddOutlined, ImportOutlined, ScissorOutlined } from '@ant-design/icons';

const GuidelineManage = () =>{

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [selectGuidelineId, setSelectGuidelineId] = React.useState([])
  const [guidelineData, setGuidelineData] = React.useState({})

  const loadTreeList = async (id: any = "1") => {
    console.log(id, 'id')
    const response = await GetGuidelineDefine(id)
    console.log(response, '--detail--response--')
    if(response.data) {
      setGuidelineData(response.data)
    }
  }

  useEffect(()=> {
    console.log(selectGuidelineId, '12345')
    loadTreeList(selectGuidelineId)
  },[selectGuidelineId])

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <PageContainer>
      <GuidelineModal modalVisible = {isModalVisible} hiddenModal = {setIsModalVisible} selectGuidelineId={selectGuidelineId} />
      <GridContent>
        <Row style={{margin: '5px'}} justify={'space-between'}>
          <Col>
            <Button icon={<FileAddOutlined />} onClick={() => showModal()}>添加指标</Button>
            <Button type="primary" icon={<DeleteOutlined />}>删除指标</Button>
            <Button type="dashed" icon={ <ExportOutlined />}>导入指标</Button>
            <Button type="dashed" icon={ <ImportOutlined />}>导出指标</Button>
           </Col>
           <Col>
            <Button icon={<FileAddOutlined />} type="primary">添加参数</Button>
            <Button type="dashed" icon={<DeleteOutlined />}>删除参数</Button>
            <Button type="dashed" icon={<CopyOutlined />}>复制参数</Button>
            <Button type='dashed' icon={<ScissorOutlined />}>粘贴参数</Button>
            <Button type="dashed" icon={<CheckCircleOutlined />}>保存</Button>
            <Button type='dashed' icon={<DeleteOutlined />}>取消</Button>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <div>
              <GuidelineTree setDefault= {setSelectGuidelineId} />
            </div>
          </Col>
          <Col lg={17} md={24}>
            <Row gutter={24}>
              <Col span={24} style={{height:'300px', border: '1px solid black'}}>
                <GuidelineForm  guidelineData= {guidelineData} />
              </Col>
              <Col span={24} style={{height:'300px', border: '1px solid black'}}>
                <GuidelineTable  guidelineData= {guidelineData} />
              </Col>
            </Row>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
}

export default GuidelineManage;
