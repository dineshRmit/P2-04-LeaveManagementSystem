import React, { useState } from "react";
import { Table, Button } from "antd";
const { Column, ColumnGroup } = Table;

const LeaveTable = (props) => {
  const { leaveData, loading, handleAcceptButton } = props;
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
    },
    {
      title: () => <b>{"To"}</b>,
      dataIndex: "toDate",
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
          onClick={() => handleAcceptButton(record.fromDate, record.toDate, record.leaveType, record._id)}
        >
          Accept
        </Button>
      ),
    },
    {
      title: () => <b>{"Reject"}</b>,
      render: (record) => (
        <Button type="primary" danger onClick={() => console.log(JSON.stringify(record._id))}>
          Reject
        </Button>
      ),
    },
  ];

  return (
    <Table dataSource={leaveData} loading={loading} columns={columns}>
      {/* <Column title={<b>{"Name"}</b>} dataIndex="name" key="name" />
      <Column title={<b>{"Email"}</b>} dataIndex="fromEmail" key="fromEmail" />
      <Column title={<b>{"From"}</b>} dataIndex="fromDate" key="fromDate" />
      <Column title={<b>{"To"}</b>} dataIndex="toDate" key="toDate" />
      <Column title={<b>{"Leave Type"}</b>} dataIndex="leaveType" key="leaveType" />
      <Column title={<b>{"Comments"}</b>} dataIndex="comments" key="comments" />
      <Column title={<b>{"Status"}</b>} dataIndex="status" key="status" />
      <Column title={<b>{"Accept"}</b>} key="accept" render={() => <Button type="primary">Accept</Button>} />
      <Column
        title={<b>{"Reject"}</b>}
        key="reject"
        render={() => (
          <Button type="primary" danger >
            Reject
          </Button>
        )}
      /> */}
    </Table>
  );
};

export default LeaveTable;
