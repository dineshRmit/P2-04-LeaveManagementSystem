import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

const tailLayout = {
  wrapperCol: {
    span: 16,
  },
};

const ActivateAccountForm = (props) => {
  const [error, setError] = useState(undefined);
  const [form] = Form.useForm();
  const { onSubmit } = props;

  const onFinish = (values) => {
    console.log(values);

    if (values.password === values.password2) {
      onSubmit(values.password);
    } else {
      setError("Passwords do not match");
    }

    // onSubmit(details);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onResetClick = () => {
    form.resetFields();
    setError(undefined);
  };

  return (
    <Form
      name="basic"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
        name="password2"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter password" style={{ width: "200px" }} />
      </Form.Item>

      {error ? (
        <Form.Item label="Error: ">
          <div style={{ color: "red" }}>{error}</div>
        </Form.Item>
      ) : (
        <div />
      )}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{ marginLeft: "2em", minWidth: "53px" }} type="secondary" onClick={() => onResetClick()}>
          {" "}
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ActivateAccountForm;
