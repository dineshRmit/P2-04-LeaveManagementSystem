import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import { logoutUser } from "./actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
// import AdminHome from "./components/pages/adminHome";
import Landing from "./components/layout/Landing";
// import Register from "./components/auth/Register";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";
import CreateAccount from "./components/pages/admin/accounts/createAccounts/createAccounts";
import DeactivateAccount from "./components/pages/admin/accounts/deactivateAccounts/deactivateAccounts";
import ActivateAccount from "./components/pages/admin/accounts/activateAccounts/activateAccounts";
import ChangeAccountType from "./components/pages/admin/accounts/changeAccountType/changeAccountType";
import ViewAllUsers from "./components/pages/admin/accounts/viewAllUsers/viewAllUsers";
import AdminOverview from "./components/pages/admin/overview/adminOverview";
import AdminLeaves from "./components/pages/admin/leaves/adminLeaves";
import AdminCalendar from "./components/pages/admin/calendar/adminCalendar";

import StaffDashboard from "./components/pages/staff/dashboard/staffDashboard";
import StaffLeaveBalance from "./components/pages/staff/leaves/leaveBalance/staffLeaveBalance";
import StaffApplyLeave from "./components/pages/staff/leaves/applyLeave/staffApplyLeave";
import StaffChangePassword from "./components/pages/staff/accounts/changePassword";

import ChangePassword from "./components/pages/manager/accounts/changePassword";
import ManagerDashboard from "./components/pages/manager/dashboard/managerDashboard";
import ManagerApplyLeave from "./components/pages/manager/leaves/applyLeave/managerApplyLeave";
import ManagerLeaveBalance from "./components/pages/manager/leaves/leaveBalance/managerLeaveBalance";
import ManagerManageLeaves from "./components/pages/manager/leaves/manageLeaves/managerReviewLeave";
import ViewAllStaffUsers from "./components/pages/manager/staff/viewAllUsers/viewAllUsers";

const { Header, Sider, Content, Footer } = Layout;

class Routes extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onLogoutClick = () => {
    // Logout user
    store.dispatch(logoutUser());

    // setTimeout(() => {
    //   // Redirect to login
    //   window.location.href = "../";
    // }, 1000);
  };

  render() {
    return (
      <Router>
        <StyledLayout>
          <Navbar collapsed={this.state.collapsed} />
          <Layout>
            <StyledHeader>
              {this.props.auth.isAuthenticated ? (
                React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: this.toggle,
                })
              ) : (
                <div />
              )}

              <AppName>
                <b>Leave Manager</b>
              </AppName>
              {this.props.auth.isAuthenticated ? (
                <LogoutDiv>
                  <Button type="primary" danger onClick={() => this.onLogoutClick()}>
                    Logout
                  </Button>
                </LogoutDiv>
              ) : (
                <div />
              )}
            </StyledHeader>
            <Content>
              <Route exact path="/" component={Landing} />
              {/* <Route exact path="/register" component={Register} /> */}
              <Route exact path="/login" component={Login} />
              <Switch>
                {/* Admin routes */}
                <PrivateRoute exact path="/admin/dashboard" component={AdminOverview} />
                <PrivateRoute exact path="/admin/accounts/createAccount" component={CreateAccount} />
                <PrivateRoute exact path="/admin/accounts/activateAccount" component={ActivateAccount} />
                <PrivateRoute exact path="/admin/accounts/deactivateAccount" component={DeactivateAccount} />
                <PrivateRoute exact path="/admin/accounts/changeAccountType" component={ChangeAccountType} />
                <PrivateRoute exact path="/admin/accounts/viewAllUsers" component={ViewAllUsers} />
                <PrivateRoute exact path="/admin/leaves" component={AdminLeaves} />
                <PrivateRoute exact path="/admin/calendar" component={AdminCalendar} />

                {/* Staff routes */}
                <PrivateRoute exact path="/staff/dashboard" component={StaffDashboard} />
                <PrivateRoute exact path="/staff/leave/leaveBalance" component={StaffLeaveBalance} />
                <PrivateRoute exact path="/staff/leave/applyLeave" component={StaffApplyLeave} />
                <PrivateRoute exact path="/staff/accounts/changePassword" component={StaffChangePassword} />

                {/* Manager routes */}
                <PrivateRoute exact path="/manager/dashboard" component={ManagerDashboard} />
                <PrivateRoute exact path="/manager/accounts/changePassword" component={ChangePassword} />
                <PrivateRoute exact path="/manager/leave/leaveBalance" component={ManagerLeaveBalance} />
                <PrivateRoute exact path="/manager/leave/applyLeave" component={ManagerApplyLeave} />
                <PrivateRoute exact path="/manager/leave/manageLeaves" component={ManagerManageLeaves} />
                <PrivateRoute exact path="/manager/staff/viewAllStaff" component={ViewAllStaffUsers} />
              </Switch>
            </Content>
            <StyledFooter className="layout-footer">SEPM - Group P2-04 </StyledFooter>
          </Layout>
        </StyledLayout>
      </Router>
    );
  }
}

const StyledHeader = styled(Header)`
  padding: 0;
  padding-right: 1em;
  display: flex;
  background: #fff;
  justify-content: space-between;
`;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledFooter = styled(Footer)`
  display: flex;
  justify-content: center;
  height: 6%;
  text-align: center;
  vertical-align: middle;
  padding: 20px 0;
`;

const AppName = styled.div`
  font-size: 1.7em;
`;

const LogoutDiv = styled.div`
  justify-content: space-between;
  align: right;
`;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routes);
