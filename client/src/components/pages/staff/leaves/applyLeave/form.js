import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import "antd/dist/antd.css";

const tailLayout = {
  wrapperCol: {
    span: 16,
  },
};

const Demo = (props) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let firstAccountType, secondAccountType, thirdAccountType;
    console.log("Success:", values);

    if (values.accountType.length == 1) {
      console.log("length is 1");
      firstAccountType = values.accountType[0];
      secondAccountType = "none";
      thirdAccountType = "none";
    } else if (values.accountType.length == 2) {
      console.log("length is 2");
      firstAccountType = values.accountType[0];
      secondAccountType = values.accountType[1];
      thirdAccountType = "none";
    } else {
      console.log("length is 3");
      firstAccountType = values.accountType[0];
      secondAccountType = values.accountType[1];
      thirdAccountType = values.accountType[2];
    }

    const newUser = {
      name: values.user.name,
      email: values.user.email,
      password: values.password,
      password2: values.password,
      userType1: firstAccountType,
      userType2: secondAccountType,
      userType3: thirdAccountType,
    };

    onSubmit(newUser);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onResetClick = () => {
    form.resetFields();
  };

  return (
    <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name={["user", "name"]} label="Name" rules={[{ required: true, message: "Please input name!" }]}>
        <Input placeholder="Enter name" style={{ width: "200px" }} />
      </Form.Item>

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
        label="Password"
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
        label="Account Type"
        name="accountType"
        rules={[
          {
            required: true,
            message: "Please select type",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Select account type" style={{ width: "200px" }}>
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

export default Demo;
