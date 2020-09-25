import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";

const ErrorModal = (props) => {
  const { visible, handleOk } = props;

  return (
    <Modal
      title="Error!"
      visible={visible}
      onOk={() => handleOk()}
      footer={[
        <Button key="submit" type="primary" onClick={() => handleOk()}>
          Ok
        </Button>,
      ]}
    >
      <p>
        <WarningOutlined twoToneColor="#eb2f96" /> Error creating new account.
      </p>
    </Modal>
  );
};

export default ErrorModal;
