import React from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";

const tailLayout = {
  wrapperCol: {
    span: 16,
  },
};

const DeactivateAccountForm = (props) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const details = {
      email: values.user.email,
      accountType: values.accountType,
    };

    console.log(values);

    onSubmit(details);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onResetClick = () => {
    form.resetFields();
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

      <Form.Item
        label="Account Type"
        name="accountType"
        rules={[
          {
            required: true,
            message: "Please select type",
          },
        ]}
      >
        <Select placeholder="Select new account type" style={{ width: "200px" }}>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="staff">Staff</Select.Option>
          <Select.Option value="manager">Manager</Select.Option>
        </Select>
      </Form.Item>

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

export default DeactivateAccountForm;
