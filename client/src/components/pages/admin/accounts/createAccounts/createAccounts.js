import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { registerUser } from "../../../../../actions/authActions";
import { Layout, Breadcrumb } from "antd";
import Demo from "./form";

import styled from "styled-components";

const { Content, Header } = Layout;

class CreateAccount extends Component {
  state = {};

  onSubmit = (data) => {
    console.log("Hello world");
    console.log(data);
    const { registerUser } = this.props;

    registerUser(data, this.props.history);
  };

  render() {
    return (
      <StyledLayout>
        <StyledBreadcrum>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Accounts</Breadcrumb.Item>
          <Breadcrumb.Item>Create Account</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <h3 style={{ marginBottom: "1em" }}>
            <b>Create Account</b>
          </h3>
          <Demo onSubmit={(data) => this.onSubmit(data)} />
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

export default connect(mapStateToProps, { registerUser })(withRouter(CreateAccount));
