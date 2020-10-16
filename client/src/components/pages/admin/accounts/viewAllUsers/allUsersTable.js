import React from "react";
import { Table } from "antd";

import moment from "moment";

const UsersTable = (props) => {
  const { loading, userData } = props;

  const columns = [
    {
      title: () => <b>{"Name"}</b>,
      dataIndex: "name",
      render: (text) => <b>{text}</b>,
      key: "name",
    },
    {
      title: () => <b>{"Email"}</b>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: () => <b>{"Reporting Manager"}</b>,
      dataIndex: "reportingManager",
      key: "reportingManager",
    },
    {
      title: () => <b>{"User Type"}</b>,
      dataIndex: "userType1",
      key: "userType1",
    },
    {
      title: () => <b>{"Account Status"}</b>,
      dataIndex: "isAccountActive",
      key: "isAccountActive",
      render: (text) => <span style={{ textAlign: "center" }}>{`${text}`}</span>,
    },
    {
      title: () => <b>{"Leave Balance"}</b>,
      children: [
        {
          title: () => <b>{"Annual"}</b>,
          dataIndex: "annualLeave",
          key: "annualLeave",
        },
        {
          title: () => <b>{"Carers"}</b>,
          dataIndex: "carersLeave",
          key: "carersLeave",
        },
        {
          title: () => <b>{"Blood Donor"}</b>,
          dataIndex: "bloodDonorLeave",
          key: "bloodDonorLeave",
        },
        {
          title: () => <b>{"Sick Cert"}</b>,
          dataIndex: "sickLeaveWC",
          key: "sickLeaveWC",
        },
        {
          title: () => <b>{"Sick w/o Cert"}</b>,
          dataIndex: "sickLeaveWOC",
          key: "sickLeaveWOC",
        },
        {
          title: () => <b>{"Unpaid Leave"}</b>,
          dataIndex: "unpaidLeave",
          key: "unpaidLeave",
        },
      ],
    },
    {
      title: () => <b>{"Date Created"}</b>,
      dataIndex: "date",
      render: (text) => moment(text).format("MMM Do YYYY"),
      key: "date",
    },

    // {
    //   title: () => <b>{"Accept"}</b>,
    //   render: (record) => (
    //     <Button
    //       type="primary"
    //       onClick={() =>
    //         handleAcceptButton(record.fromEmail, record.fromDate, record.toDate, record.leaveType, record._id)
    //       }
    //       disabled={handleDisableButton(record._id, record.status)}
    //     >
    //       Accept
    //     </Button>
    //   ),
    // },
    // {
    //   title: () => <b>{"Reject"}</b>,
    //   render: (record) => (
    //     <Button
    //       type="primary"
    //       danger
    //       onClick={() => handleRejectButton(record._id)}
    //       disabled={handleDisableButton(record._id, record.status)}
    //     >
    //       Reject
    //     </Button>
    //   ),
    // },
  ];

  return <Table dataSource={userData} loading={loading} columns={columns}></Table>;
};

export default UsersTable;
