import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { connect as connectRedux } from "react-redux";
import { Layout, Menu, Button } from "antd";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
// import AdminHome from "./components/pages/adminHome";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";
import { connect } from "mongoose";

const { Header, Sider, Content, Footer } = Layout;

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <StyledLayout>
            {/* <div className="App"> */}
            <Navbar collapsed={this.state.collapsed} />
            <Layout>
              <StyledHeader>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: this.toggle,
                })}
                <AppName>Leave Manager</AppName>
                <LogoutDiv>
                  <Button type="primary" danger onClick={() => this.onLogoutClick()}>
                    Logout
                  </Button>
                </LogoutDiv>
              </StyledHeader>
              <Content>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  {/* <PrivateRoute exact path="/adminHome" component={AdminHome} /> */}
                  {/* <PrivateRoute exact path="/adminHome/Accounts" component={AdminAccounts} /> */}
                </Switch>
              </Content>
              <StyledFooter className="layout-footer">SEPM - Group P2-04 </StyledFooter>
            </Layout>
          </StyledLayout>
        </Router>
      </Provider>
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
  font-size: 2em;
  font-family: auto;
`;

const LogoutDiv = styled.div`
  justify-content: space-between;
  align: right;
`;

export default App;
