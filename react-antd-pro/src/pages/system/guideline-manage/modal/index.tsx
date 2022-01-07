import { Modal, Form,Input, Button } from 'antd';
import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
const GuidelineModal = (props: {modalVisible: boolean, hiddenModal: Function, selectGuidelineId: any}) => {
  const { modalVisible, hiddenModal, selectGuidelineId } = props
  console.log(props.modalVisible, modalVisible, 'ssss----ss')

  const handleOk = () => {
    hiddenModal()
  }

  const formRef = useRef(null);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields()
    hiddenModal()
  }

  const onSubmit = (values: any) => {
    console.log('submit--abb', selectGuidelineId,values)
  }
  return (
      <Modal title="添加指标" footer={null} visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={(values: any)=> onSubmit(values) } ref={formRef}>
          <Form.Item
            label="指标名称"
            name="GuideLineName"
            rules={[{ required: true, message: '请输入指标名称' }]}

          >
            <Input />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ marginRight :'20px'}} >
              确定
            </Button>
            <Button htmlType="button" onClick={ handleCancel }>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default GuidelineModal
