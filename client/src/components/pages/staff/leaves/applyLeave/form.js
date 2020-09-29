import React, { useState } from "react";
import moment from "moment";
import { Form, Input, Button, DatePicker, Select } from "antd";
import "antd/dist/antd.css";

const tailLayout = {
  wrapperCol: {
    span: 16,
  },
};

const ActivateAccountForm = (props) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();
  const [error, setErrorValue] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const onResetClick = () => {
    form.resetFields();
  };

  const setError = () => {
    //setError("You do not have enough leave balance ");
    setErrorValue(!error);
  };

  const setErrorMessageFunc = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  return (
    <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        name="fromDate"
        label="From date"
        rules={[
          {
            required: true,
            message: "Please select from date.",
          },
        ]}
      >
        <DatePicker disabledDate={disabledDate} />
      </Form.Item>

      <Form.Item
        name="toDate"
        label="To date"
        rules={[
          {
            required: true,
            message: "Please select to date.",
          },
        ]}
      >
        <DatePicker disabledDate={disabledDate} style={{ marginLeft: "1.3em" }} />
      </Form.Item>

      <Form.Item
        name="leaveType"
        label="Select"
        rules={[
          {
            required: true,
            message: "Please select leave type",
          },
        ]}
      >
        <Select placeholder="Select leave type" style={{ width: "200px", marginLeft: "1.8em" }}>
          <Select.Option value="annual">Annual leave</Select.Option>
          <Select.Option value="carer">Carer’s leave</Select.Option>
          <Select.Option value="blood">Blood donor leave</Select.Option>
          <Select.Option value="sickCert">Sick leave(certificate)</Select.Option>
          <Select.Option value="sickNoCert">Sick leave(w/o certificate)</Select.Option>
          <Select.Option value="unpaid">Unpaid leave</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="reason"
        label="Reason"
        rules={[
          {
            required: true,
            message: "Please enter leave information",
          },
        ]}
      >
        <Input placeholder="Enter leave information" style={{ width: "300px", marginLeft: "1.2em" }} />
      </Form.Item>
      {error ? (
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div>Hello</div>
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
