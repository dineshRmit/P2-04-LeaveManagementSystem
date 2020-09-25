import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./navbar.css";

const { SubMenu } = Menu;
const { Sider } = Layout;
const lastPath = window.location.pathname;

class Navbar extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      console.log(this.props.auth.user.userType1);
    }
  };

  handleMenuClick = (menu) => {
    console.log(" Active key " + menu.key);
  };

  AdminRender = () => {
    return (
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
            <Menu.Item key="/admin/accounts/activateAccount">
              Activate Account
              <Link to="/admin/accounts/activateAccount"></Link>
            </Menu.Item>
            <Menu.Item key="/admin/accounts/deactivateAccount">
              Deactivate Account
              <Link to="/admin/accounts/deactivateAccount"></Link>
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
    );
  };

  StaffRender = () => {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" onSelect={this.handleMenuClick} defaultSelectedKeys={[lastPath]}>
          <Menu.Item key="/staff/dashboard" icon={<DashboardOutlined />}>
            Dashboard
            <Link to="/staff/dashboard"></Link>
          </Menu.Item>
          <SubMenu icon={<UserOutlined />} title="Accounts">
            <Menu.Item key="/staff/accounts/changePassword">
              Change password
              <Link to="/staff/accounts/changePassword"></Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu icon={<HomeOutlined />} title="Leaves">
            <Menu.Item key="/staff/leave">
              View leave balance
              <Link to="/staff/leaves"></Link>
            </Menu.Item>
            <Menu.Item key="/staff/leave">
              Apply leave
              <Link to="/staff/leave"></Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/calendar" icon={<CalendarOutlined />}>
            Calendar
            <Link to="/admin/calendar"></Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  };

  render() {
    return (
      <>
        {this.props.auth.user.userType1 === "admin" ? (
          this.AdminRender()
        ) : this.props.auth.user.userType1 === "staff" ? (
          this.StaffRender()
        ) : this.props.auth.user.userType1 === "manager" ? (
          this.ManagerRender()
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
