import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./navbar.css";

const { SubMenu } = Menu;
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
              <SubMenu icon={<UserOutlined />} title="Accounts">
                <Menu.Item key="/admin/accounts/createAccount">
                  Create Account
                  <Link to="/admin/accounts/createAccount"></Link>
                </Menu.Item>
              </SubMenu>

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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
