import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./navbar.css";

const { Header, Sider } = Layout;
const lastPath = window.location.pathname;

class Navbar extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      console.log();
    }
  };

  handleMenuClick = (menu) => {
    console.log(" Active key " + menu.key);
  };

  render() {
    return (
      <>
        {this.props.auth.isAuthenticated ? (
          <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" onSelect={this.handleMenuClick} defaultSelectedKeys={[lastPath]}>
              <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
                Dashboard
                <Link to="/admin/dashboard"></Link>
              </Menu.Item>
              <Menu.Item key="/admin/accounts" icon={<UserOutlined />}>
                Accounts
                <Link to="/admin/accounts"></Link>
              </Menu.Item>
              <Menu.Item key="/admin/leaves" icon={<HomeOutlined />}>
                Leaves
                <Link to="/admin/leaves"></Link>
              </Menu.Item>
              <Menu.Item key="/admin/calendar" icon={<CalendarOutlined />}>
                Calendar
                <Link to="/admin/calendar"></Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
          <div></div>
        )}
      </>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
