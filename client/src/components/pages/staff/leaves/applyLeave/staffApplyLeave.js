import React, { Component } from "react";
import { withRouter } from "react-router";
import { Layout, Breadcrumb } from "antd";
import { connect } from "react-redux";
import ActivateAccountForm from "./form";
import { requestLeave } from "../../../../../actions/authActions";
import styled from "styled-components";

import ConfirmationModal from "./confirmationModal";
import ErrorModal from "./errorModal";

const { Content } = Layout;

class StaffApplyLeave extends Component {
  state = {
    confirmationModalVisible: false,
    errorModalVisible: false,
    errorMessage: undefined,
    clearForm: false,
  };

  handleClearForm = () => {
    this.setState({
      clearForm: !this.state.clearForm,
    });
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

  onSubmit = (data) => {
    const { requestLeave, auth } = this.props;

    const leaveRequestData = {
      name: auth.user.name,
      fromEmail: auth.user.email,
      toEmail: data.approvedBy,
      fromDate: data.fromDate,
      toDate: data.toDate,
      leaveType: data.leaveType,
      comments: data.reason,
    };

    requestLeave(leaveRequestData).then((res) => {
      console.log(res);
      if (res == false) {
        this.handleErrorMessage();
        this.handleErrorModalVisible();
      } else {
        this.handleModalVisible();
        this.handleClearForm();
      }
    });
  };

  render() {
    return (
      <StyledLayout>
        <StyledBreadcrum>
          <Breadcrumb.Item>Staff</Breadcrumb.Item>
          <Breadcrumb.Item>Leave</Breadcrumb.Item>
          <Breadcrumb.Item>Apply Leave</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <h3 style={{ marginBottom: "1em" }}>
            <b>Apply Leave</b>
          </h3>
          <ActivateAccountForm
            onSubmit={(data) => this.onSubmit(data)}
            clearForm={this.state.clearForm}
            clearFormFunc={() => this.handleClearForm()}
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

export default connect(mapStateToProps, { requestLeave })(withRouter(StaffApplyLeave));
