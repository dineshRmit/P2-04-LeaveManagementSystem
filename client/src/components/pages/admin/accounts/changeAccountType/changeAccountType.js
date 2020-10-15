import React, { Component } from "react";
import { withRouter } from "react-router";
import { Layout, Breadcrumb } from "antd";
import { connect } from "react-redux";
import ChangeAccountTypeForm from "./form";
import { updateUser } from "../../../../../actions/authActions";
import styled from "styled-components";

import ConfirmationModal from "./confirmationModal";
import ErrorModal from "./errorModal";

const { Content } = Layout;

class ChangeAccountType extends Component {
  state = {
    confirmationModalVisible: false,
    errorModalVisible: false,
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

  onSubmit = (data) => {
    const { updateUser } = this.props;

    updateUser(data).then((res) => {
      console.log(res);
      //this.handleModalText(res[0]);
      if (res == false) {
        this.handleErrorModalVisible();
      } else {
        this.handleModalVisible();
      }
    });
  };

  render() {
    return (
      <StyledLayout>
        <StyledBreadcrum>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Accounts</Breadcrumb.Item>
          <Breadcrumb.Item>Change Account Type</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <h3 style={{ marginBottom: "1em" }}>
            <b>Change Account Type</b>
          </h3>
          <p style={{ color: "GrayText" }}>
            <i>Enter the email of the user you want to change the role and select a new role </i>
          </p>
          <ChangeAccountTypeForm onSubmit={(data) => this.onSubmit(data)} />
          <ConfirmationModal visible={this.state.confirmationModalVisible} handleOk={() => this.handleModalVisible()} />
          <ErrorModal visible={this.state.errorModalVisible} handleOk={() => this.handleErrorModalVisible()} />
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

export default connect(mapStateToProps, { updateUser })(withRouter(ChangeAccountType));
