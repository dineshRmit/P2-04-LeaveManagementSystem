import React from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Modal, Button } from "antd";

const ConfirmationModal = (props) => {
  const { visible, handleOk, refreshList, successMessage } = props;

  return (
    <Modal
      title="Success!"
      visible={visible}
      onOk={() => {
        refreshList();
        handleOk();
      }}
      footer={[
        <Button key="submit" type="primary" onClick={() => handleOk()}>
          Ok
        </Button>,
      ]}
    >
      <p>
        <CheckCircleTwoTone twoToneColor="#52c41a" /> {successMessage}
      </p>
    </Modal>
  );
};

export default ConfirmationModal;
