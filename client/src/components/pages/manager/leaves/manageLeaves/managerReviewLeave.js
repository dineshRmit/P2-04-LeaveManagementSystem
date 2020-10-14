import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout, Breadcrumb, Button } from "antd";
import { getLeaveRequest } from "../../../../../actions/authActions";

import LeaveTable from "./leaveTable";
import ConfirmationModal from "./confirmationModal";
import ErrorModal from "./errorModal";

import moment from "moment";
import styled from "styled-components";

const { Content } = Layout;

class ManagerManageLeaves extends Component {
  state = {
    loading: true,
    confirmationModalVisible: false,
    errorModalVisible: false,
    errorMessage: undefined,
  };

  componentDidMount = () => {
    console.log(this.props.auth.user.email);
    this.fetchData(this.props.auth.user.email);
  };

  handleModalVisible = () => {
    this.setState({
      confirmationModalVisible: !this.state.confirmationModalVisible,
    });
  };

  handleErrorModalVisible = () => {
    console.log(this.props.errors);
    this.setState({
      errorModalVisible: !this.state.errorModalVisible,
    });
  };

  handleErrorMessage = () => {
    if (this.props.errors) {
      if (this.props.errors.accountDeactivated) {
        this.setErrorMessage(this.props.errors.accountDeactivated);
      }
    }
  };

  setErrorMessage = (errorText) => {
    this.setState({
      errorMessage: errorText,
    });
  };

  //Fetch data
  fetchData = (managerEmail) => {
    const { getLeaveRequest } = this.props;

    getLeaveRequest(managerEmail)
      .then((leaveData) => {
        console.log(leaveData.data);
        this.setLeaveData(leaveData.data);
        this.setLoadingState();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Set leave data
  setLeaveData = (leaveRequestData) => {
    //console.log(leaveRequestData);
    this.setState(
      {
        leaveData: leaveRequestData,
      },
      () => {
        console.log(this.state.leaveData);
      }
    );
  };

  //Set loading state
  setLoadingState = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  //Referesh button
  refreshList = () => {
    this.setLoadingState();
    this.fetchData(this.props.auth.user.email);
  };

  handleAcceptButton = (fromDate, toDate, leaveType, id) => {
    let hoursToDeduct = this.calculateNumberOfHours(fromDate, toDate, leaveType);
    console.log("Displaying the hours to deduct " + hoursToDeduct);
    let newLeaveBalanceHours = parseInt(this.props.auth.user.leave[`${leaveType}`]) - hoursToDeduct;
    console.log("newLeaveBalanceHours " + newLeaveBalanceHours);
  };

  handleRejectButton = (fromDate, toDate, leaveType, id) => {};

  calculateNumberOfHours = (fromDate, toDate, leaveType) => {
    let numberOfHoursofLeave = 0;
    let leaveHoursAvailable = parseInt(this.props.auth.user.leave[`${leaveType}`]);
    if (leaveHoursAvailable >= 8) {
      let a = moment(fromDate);
      let b = moment(toDate);
      let diff = a.diff(b, "days");
      if (diff > 0) {
        numberOfHoursofLeave = 8 * diff;
        console.log(numberOfHoursofLeave);
        return numberOfHoursofLeave;
      } else {
        numberOfHoursofLeave = 8;
        console.log(numberOfHoursofLeave);
        return numberOfHoursofLeave;
      }
    } else {
      this.setErrorMessage("User does not have sufficient leave balance");
      this.handleErrorModalVisible();
    }
  };

  render() {
    return (
      <StyledLayout>
        <StyledBreadcrum>
          <Breadcrumb.Item>Manager</Breadcrumb.Item>
          <Breadcrumb.Item>Leave</Breadcrumb.Item>
          <Breadcrumb.Item>Manage Leaves</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <StyledDiv>
            <h3 style={{ marginBottom: "1em" }}>
              <b>Manage Leaves</b>
            </h3>
            <Button onClick={() => this.refreshList()}>Refresh</Button>
          </StyledDiv>

          <LeaveTable
            leaveData={this.state.leaveData}
            loading={this.state.loading}
            handleAcceptButton={(fromDate, toDate, leaveType, id) =>
              this.handleAcceptButton(fromDate, toDate, leaveType, id)
            }
          />
          <ConfirmationModal visible={this.state.confirmationModalVisible} handleOk={() => this.handleModalVisible()} />
          <ErrorModal
            visible={this.state.errorModalVisible}
            handleOk={() => this.handleErrorModalVisible()}
            errorMessage={this.state.errorMessage}
          />
        </StyledContent>
      </StyledLayout>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
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

export default connect(mapStateToProps, { getLeaveRequest })(withRouter(ManagerManageLeaves));
