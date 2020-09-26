import React, { Component } from "react";
import { withRouter } from "react-router";
import { Layout, Breadcrumb } from "antd";
import { Row, Col } from "antd";
import { Table } from "antd";
import styled from "styled-components";

const { Content } = Layout;

const columns = [
  {
    title: "Leave type",
    dataIndex: "leaveType",
  },
  {
    title: "Balance (Hours)",
    dataIndex: "balance",
  },
];

class StaffLeaves extends Component {
  state = {
    annualLeaveBalance: 10,
    carerLeaveBalance: 10,
    bloodDonorLeaveBalance: 10,
    sickLeaveCertBalance: 10,
    sickLeaveNoCertBalance: 10,
    parentalLeaveBalance: 10,
    unpaidLeaveBalance: 10,
  };

  componentDidMount = () => {};

  setLeaveBalance = (leaveBalanceData) => {
    this.setState({
      annualLeaveBalance: leaveBalanceData.annualLeave,
      carerLeaveBalance: leaveBalanceData.carerLeave,
      bloodDonorLeaveBalance: leaveBalanceData.bloodDonorLeave,
      sickLeaveCertBalance: leaveBalanceData.sickCertLeave,
      sickLeaveNoCertBalance: leaveBalanceData.sickNoCertLeave,
      parentalLeaveBalance: leaveBalanceData.parentalLeave,
      unpaidLeaveBalance: leaveBalanceData.unpaidLeave,
    });
  };

  render() {
    const data = [
      {
        key: "1",
        leaveType: "Annual Leave",
        balance: this.state.annualLeaveBalance,
      },
      {
        key: "2",
        leaveType: "Carer’s leave",
        balance: this.state.carerLeaveBalance,
      },
      {
        key: "3",
        leaveType: "Blood donor leave",
        balance: this.state.bloodDonorLeaveBalance,
      },
      {
        key: "4",
        leaveType: "Sick leave (with certificate)",
        balance: this.state.sickLeaveCertBalance,
      },
      {
        key: "5",
        leaveType: "Sick leave (without a certificate)",
        balance: this.state.sickLeaveNoCertBalance,
      },
      {
        key: "6",
        leaveType: "Parental leave",
        balance: this.state.parentalLeaveBalance,
      },
      {
        key: "7",
        leaveType: "Unpaid leave",
        balance: this.state.unpaidLeaveBalance,
      },
    ];

    return (
      <StyledLayout>
        <StyledBreadcrum>
          <Breadcrumb.Item>Staff</Breadcrumb.Item>
          <Breadcrumb.Item>Leave</Breadcrumb.Item>
          <Breadcrumb.Item>Leave Balance</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <h3 style={{ marginBottom: "1em" }}>
            <b>Leave Balance</b>
          </h3>
          <TableDiv>
            <StyledTable columns={columns} dataSource={data} size="small" />
          </TableDiv>
        </StyledContent>
      </StyledLayout>
    );
  }
}

const StyledTable = styled(Table)`
  .ant-table-thead {
    font-weight: bold;
  }
`;

const TableDiv = styled.div`
  width: 50%;
`;

const StyledLayout = styled(Layout)`
  padding: 0 24px 24px;
`;

const StyledBreadcrum = styled(Breadcrumb)`
  margin: 16px 0;
  margin-left: 16px;
`;

const StyledContent = styled(Content)`
  margin: 16px 16px;
  margin-top: 0;
  padding: 24px;
  min-height: 280px;
  background-color: white;
`;

export default withRouter(StaffLeaves);
