import React from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Modal, Button } from "antd";

const ConfirmationModal = (props) => {
  const { visible, handleOk } = props;

  return (
    <Modal
      title="Success!"
      visible={visible}
      onOk={() => handleOk()}
      footer={[
        <Button key="submit" type="primary" onClick={() => handleOk()}>
          Ok
        </Button>,
      ]}
    >
      <p>
        <CheckCircleTwoTone twoToneColor="#52c41a" /> Password changed successfully!
      </p>
    </Modal>
  );
};

export default ConfirmationModal;
