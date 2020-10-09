import React from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

const tailLayout = {
  wrapperCol: {
    span: 16,
  },
};

const ActivateAccountForm = (props) => {
  const { onSubmit } = props;

  const onFinish = (values) => {
    const details = {
      email: values.user.email,
      isAccountActive: true,
    };

    onSubmit(details);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Enter current password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter password" style={{ width: "200px" }} />
      </Form.Item>

      <Form.Item
        label="Enter new password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter password" style={{ width: "200px" }} />
      </Form.Item>

      <Form.Item
        label="Confirm new password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter password" style={{ width: "200px" }} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ActivateAccountForm;
