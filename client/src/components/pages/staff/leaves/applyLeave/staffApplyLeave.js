import React, { Component } from "react";
import { withRouter } from "react-router";
import { Layout, Breadcrumb } from "antd";
import styled from "styled-components";

import ActivateAccountForm from "./form";

const { Content } = Layout;

class StaffApplyLeave extends Component {
  state = {};
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
          <ActivateAccountForm onSubmit={(data) => this.onSubmit(data)} />
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

export default withRouter(StaffApplyLeave);
