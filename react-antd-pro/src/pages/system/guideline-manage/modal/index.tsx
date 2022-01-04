import { Modal, Form,Input } from 'antd';

// eslint-disable-next-line @typescript-eslint/ban-types
const guidelineModal = (props: {modalVisible: boolean, hiddenModal: Function }) => {
  const { modalVisible, hiddenModal } = props
  console.log(props.modalVisible, modalVisible, 'ssss----ss')

  const handleOk = () => {
    hiddenModal()
  }

  const handleCancel = () => {
    hiddenModal()
  }
  return (
      <Modal title="添加指标" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form.Item
        label="指标名称"
        name="GuideLineName"
        rules={[{ required: true, message: '请输入指标名称' }]}
      >
        <Input />
      </Form.Item>
      </Modal>
  );
};

export default guidelineModal
