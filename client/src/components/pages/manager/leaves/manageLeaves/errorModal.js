import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";

const ErrorModal = (props) => {
  const { visible, handleOk, errorMessage, refreshList } = props;

  return (
    <Modal
      title="Error!"
      visible={visible}
      onOk={() => {
        refreshList();
        handleOk();
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            handleOk();
          }}
        >
          Ok
        </Button>,
      ]}
    >
      <p>
        <WarningOutlined style={{ color: "red" }} twoToneColor="#eb2f96" /> {errorMessage}
      </p>
    </Modal>
  );
};

export default ErrorModal;
