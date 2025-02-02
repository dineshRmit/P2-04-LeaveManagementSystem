import React from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

const tailLayout = {
  wrapperCol: {
    span: 16,
  },
};

const DeactivateAccountForm = (props) => {
  const { onSubmit } = props;

  const onFinish = (values) => {
    const details = {
      email: values.user.email,
      isAccountActive: false,
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
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please enter valid email!",
          },
        ]}
      >
        <Input placeholder="Enter email" style={{ width: "200px" }} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeactivateAccountForm;
