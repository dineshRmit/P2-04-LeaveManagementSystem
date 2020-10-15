import React, { useState } from "react";
import { Table, Button } from "antd";
import moment from "moment";

const UsersTable = (props) => {
  const { userData, loading } = this.props;

  const columns = [
    {
      title: () => <b>{"Name"}</b>,
      dataIndex: "name",
      render: (title) => <b>{title}</b>,
    },
    {
      title: () => <b>{"Email"}</b>,
      dataIndex: "fromEmail",
    },
    {
      title: () => <b>{"From"}</b>,
      dataIndex: "fromDate",
      render: (text) => moment(text).format("MMM Do YYYY"),
    },
    {
      title: () => <b>{"To"}</b>,
      dataIndex: "toDate",
      render: (text) => moment(text).format("MMM Do YYYY"),
    },
    {
      title: () => <b>{"Leave Type"}</b>,
      dataIndex: "leaveType",
    },
    {
      title: () => <b>{"Comments"}</b>,
      dataIndex: "comments",
    },
    {
      title: () => <b>{"Status"}</b>,
      dataIndex: "status",
    },
    {
      title: () => <b>{"Accept"}</b>,
      render: (record) => (
        <Button
          type="primary"
          onClick={() =>
            handleAcceptButton(record.fromEmail, record.fromDate, record.toDate, record.leaveType, record._id)
          }
          disabled={handleDisableButton(record._id, record.status)}
        >
          Accept
        </Button>
      ),
    },
    {
      title: () => <b>{"Reject"}</b>,
      render: (record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleRejectButton(record._id)}
          disabled={handleDisableButton(record._id, record.status)}
        >
          Reject
        </Button>
      ),
    },
  ];

  return <Table dataSource={leaveData} loading={loading} columns={columns}></Table>;
};

export default UsersTable;
