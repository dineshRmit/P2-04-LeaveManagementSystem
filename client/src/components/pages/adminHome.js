import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminAccounts from "./admin/accounts/adminAccounts";
import AdminOverview from "./admin/overview/adminAccounts";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./navbar.css";

const { Header, Sider, Content } = Layout;

class AdminHome extends Component {
  state = {
    collapsed: false,
  };

  componentDidMount = () => {
    const { history } = this.props;
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleMenuClick = (menu) => {
    console.log(" Active key " + menu.key);
  };

  render() {
    return (
      <Router>
        <StyledLayout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" onSelect={this.handleMenuClick}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                Dashboard
                <Link to="/adminHome/Overview"></Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                Accounts
                <Link to="/adminHome/Accounts"></Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<HomeOutlined />}>
                Leaves
              </Menu.Item>
              <Menu.Item key="4" icon={<CalendarOutlined />}>
                Calendar
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <StyledHeader>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: "trigger",
                onClick: this.toggle,
              })}
              <AppName>Leave Manager</AppName>
              <LogoutDiv>
                <Button type="primary" danger>
                  Logout
                </Button>
              </LogoutDiv>
            </StyledHeader>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                {/* <Route path="/adminHome/Overview" component={AdminOverview} /> */}
                <Route path="/adminHome/Accounts" exact component={AdminAccounts} />
              </Switch>
            </Content>
          </Layout>
        </StyledLayout>
      </Router>
    );
  }
}

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const LogoutDiv = styled.div`
  justify-content: space-between;
  align: right;
`;

const StyledHeader = styled(Header)`
  padding: 0;
  padding-right: 1em;
  display: flex;
  background: #fff;
  justify-content: space-between;
`;

const GroupName = styled.div`
  fontcolor: black;
  font-size: 2em;
`;

const AppName = styled.div`
  font-size: 2em;
  font-family: auto;
`;

export default AdminHome;
