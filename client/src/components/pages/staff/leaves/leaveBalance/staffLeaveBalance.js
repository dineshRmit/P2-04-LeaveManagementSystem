import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout, Breadcrumb, Spin } from "antd";
import { Row, Col } from "antd";
import { Table } from "antd";
import styled from "styled-components";

import { findUserDetails } from "../../../../../actions/authActions";

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
    annualLeaveBalance: this.props.auth.user.leave.annualLeave,
    carerLeaveBalance: this.props.auth.user.leave.carersLeave,
    bloodDonorLeaveBalance: this.props.auth.user.leave.bloodDonorLeave,
    sickLeaveCertBalance: this.props.auth.user.leave.sickLeaveWC,
    sickLeaveNoCertBalance: this.props.auth.user.leave.sickLeaveWOC,
    parentalLeaveBalance: this.props.auth.user.leave.parentalLeave,
    unpaidLeaveBalance: this.props.auth.user.leave.unpaidLeave,
    spinState: true,
  };

  componentDidMount = () => {
    this.findLeaveBalance();
  };

  findLeaveBalance = () => {
    const { findUserDetails } = this.props;

    let userData = {
      email: this.props.auth.user.email,
    };

    findUserDetails(this.props.auth.user.email)
      .then((res) => {
        if (res != false) {
          this.setLeaveBalance(res.data);
        }
      })
      .catch((err) => {
        console.log("Couldnt find new leave balance");
        this.setSpinState();
      });
  };

  setLeaveBalance = (leaveBalanceData) => {
    this.setState(
      {
        annualLeaveBalance: leaveBalanceData.annualLeave,
        carerLeaveBalance: leaveBalanceData.carersLeave,
        bloodDonorLeaveBalance: leaveBalanceData.bloodDonorLeave,
        sickLeaveCertBalance: leaveBalanceData.sickLeaveWC,
        sickLeaveNoCertBalance: leaveBalanceData.sickLeaveWOC,
        parentalLeaveBalance: leaveBalanceData.parentalLeave,
        unpaidLeaveBalance: leaveBalanceData.unpaidLeave,
      },
      () => {
        this.setSpinState();
      }
    );
  };

  setSpinState = () => {
    this.setState({
      spinState: !this.state.spinState,
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
          <Spin spinning={this.state.spinState}>
          <TableDiv>
            <StyledTable columns={columns} dataSource={data} size="small" />
          </TableDiv>
          </Spin>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {findUserDetails})(withRouter(StaffLeaves));
