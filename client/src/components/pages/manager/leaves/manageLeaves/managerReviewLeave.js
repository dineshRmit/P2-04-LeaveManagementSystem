import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout, Breadcrumb, Button } from "antd";

import { getLeaveRequest } from "../../../../../actions/authActions";
import {
  updateUnpaidLeaveBalance,
  updateParentalLeaveBalance,
  updateSickLeaveWOCBalance,
  updateSickLeaveWCBalance,
  updateBloodDonorLeaveBalance,
  updateCarersLeaveBalance,
  updateAnnualLeaveBalance,
  updateLeaveStatus,
  findUserDetails,
} from "../../../../../actions/authActions";

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
    newLeaveBalanceState: {},
  };

  componentDidMount = () => {
    console.log(this.props.auth.user.email);
    this.fetchData(this.props.auth.user.email);
    this.getLeaveBalance();
  };

  //get the latest leave balance hours
  getLeaveBalance = () => {
    const { findUserDetails } = this.props;

    findUserDetails(this.props.auth.user.email)
      .then((res) => {
        if (res != false) {
          this.setLeaveBalanceState(res.data);
        }
      })
      .catch((err) => {
        alert("Couldnt find new leave balance");
      });
  };

  setLeaveBalanceState = (data) => {
    this.setState({
      newLeaveBalanceState: data,
    });
  };

  handleModalVisible = () => {
    this.setState({
      confirmationModalVisible: !this.state.confirmationModalVisible,
    });
  };

  handleErrorModalVisible = () => {
    this.setState({
      errorModalVisible: !this.state.errorModalVisible,
    });
  };

  handleErrorMessage = () => {
    if (this.props.errors) {
      if (this.props.errors.emailnotfound) {
        this.setErrorMessage(this.props.errors.emailnotfound);
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

  //Referesh buttons
  refreshList = () => {
    this.setLoadingState();
    this.fetchData(this.props.auth.user.email);
  };

  //handle accept button
  handleAcceptButton = async (fromEmail, fromDate, toDate, leaveType, id) => {
    const {
      updateUnpaidLeaveBalance,
      updateParentalLeaveBalance,
      updateSickLeaveWOCBalance,
      updateSickLeaveWCBalance,
      updateBloodDonorLeaveBalance,
      updateCarersLeaveBalance,
      updateAnnualLeaveBalance,
      updateLeaveStatus,
    } = this.props;

    let hoursToDeduct = this.calculateNumberOfHours(fromDate, toDate, leaveType);

    let currentLeaveBalance = parseInt(this.state.newLeaveBalanceState[`${leaveType}`]);
    let newLeaveBalanceHours = currentLeaveBalance - hoursToDeduct;
    if (newLeaveBalanceHours < 0) {
      this.setErrorMessage("User does not have sufficient leave balance");
      this.handleErrorModalVisible();
    } else {
      console.log("newLeaveBalanceHours " + newLeaveBalanceHours);

      console.log(fromEmail);

      let leaveBalanceData = {
        userEmail: fromEmail,
        leaveBalanceHours: newLeaveBalanceHours,
      };

      console.log(leaveType);

      //for annual leave
      if (leaveType === "annualLeave") {
        updateAnnualLeaveBalance(leaveBalanceData).then((res) => {
          console.log(res);
          if (res == false) {
            this.handleErrorMessage();
            this.handleErrorModalVisible();
          } else {
            this.handleModalVisible();
          }
        });
      } else if (leaveType === "carersLeave") {
        updateCarersLeaveBalance(leaveBalanceData).then((res) => {
          console.log(res);
          if (res == false) {
            this.handleErrorMessage();
            this.handleErrorModalVisible();
          } else {
            this.handleModalVisible();
          }
        });
      } else if (leaveType === "bloodDonorLeave") {
        updateCarersLeaveBalance(leaveBalanceData).then((res) => {
          console.log(res);
          if (res == false) {
            this.handleErrorMessage();
            this.handleErrorModalVisible();
          } else {
            this.handleModalVisible();
          }
        });
      } else if (leaveType === "sickLeaveWC") {
        updateSickLeaveWCBalance(leaveBalanceData).then((res) => {
          console.log(res);
          if (res == false) {
            this.handleErrorMessage();
            this.handleErrorModalVisible();
          } else {
            this.handleModalVisible();
          }
        });
      } else if (leaveType === "sickLeaveWOC") {
        updateSickLeaveWOCBalance(leaveBalanceData).then((res) => {
          console.log(res);
          if (res == false) {
            this.handleErrorMessage();
            this.handleErrorModalVisible();
          } else {
            this.handleModalVisible();
          }
        });
      } else if (leaveType === "parentalLeave") {
        updateParentalLeaveBalance(leaveBalanceData).then((res) => {
          console.log(res);
          if (res == false) {
            this.handleErrorMessage();
            this.handleErrorModalVisible();
          } else {
            this.handleModalVisible();
          }
        });
      } else if (leaveType === "unpaidLeave") {
        updateUnpaidLeaveBalance(leaveBalanceData).then((res) => {
          console.log(res);
          if (res == false) {
            this.handleErrorMessage();
            this.handleErrorModalVisible();
          } else {
            this.handleModalVisible();
          }
        });
      } else {
        console.log(alert("Wrong leave type"));
      }

      //call to update status
      this.updateLeaveStatus(id, "Approved");
    }
  };

  handleRejectButton = (fromDate, toDate, leaveType, id) => {};

  //update status
  updateLeaveStatus = (leaveId, newStatus) => {
    const { updateLeaveStatus } = this.props;

    let leaveData = {
      id: leaveId,
      status: newStatus,
    };

    updateLeaveStatus(leaveData)
      .then((res) => {
        if (res == true) {
          this.handleModalVisible();
        } else {
          this.handleErrorMessage();
          this.handleErrorModalVisible();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //calculate number of hours
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
            handleAcceptButton={(fromEmail, fromDate, toDate, leaveType, id) =>
              this.handleAcceptButton(fromEmail, fromDate, toDate, leaveType, id)
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

export default connect(mapStateToProps, {
  findUserDetails,
  getLeaveRequest,
  updateUnpaidLeaveBalance,
  updateParentalLeaveBalance,
  updateSickLeaveWOCBalance,
  updateSickLeaveWCBalance,
  updateBloodDonorLeaveBalance,
  updateCarersLeaveBalance,
  updateAnnualLeaveBalance,
  updateLeaveStatus,
})(withRouter(ManagerManageLeaves));
