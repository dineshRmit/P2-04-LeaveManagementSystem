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
        <div className="logo" style={{textAlign: "center", color: "white", fontSize: '1em', textTransform: 'uppercase'}}> {this.props.auth.user.userType1}</div>
        <Menu
          theme="dark"
          mode="inline"
          onSelect={this.handleMenuClick}
          defaultOpenKeys={["sub1", "sub2"]}
          defaultSelectedKeys={[lastPath]}
        >
          <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
            Dashboard
            <Link to="/admin/dashboard"></Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Accounts">
            <Menu.Item key="/admin/accounts/viewAllUsers">
              View all users
              <Link to="/admin/accounts/viewAllUsers"></Link>
            </Menu.Item>
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
            <Menu.Item key="/admin/accounts/changeAccountType">
              Account Role
              <Link to="/admin/accounts/changeAccountType"></Link>
            </Menu.Item>
          </SubMenu>

          {/* <Menu.Item key="/admin/leaves" icon={<HomeOutlined />}>
            Leaves
            <Link to="/admin/leaves"></Link>
          </Menu.Item>
          <Menu.Item key="/admin/calendar" icon={<CalendarOutlined />}>
            Calendar
            <Link to="/admin/calendar"></Link>
          </Menu.Item> */}
        </Menu>
      </Sider>
    );
  };

  StaffRender = () => {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
       <div className="logo" style={{textAlign: "center", color: "white", fontSize: '1em', textTransform: 'uppercase'}}> {this.props.auth.user.userType1}</div>
        <Menu
          theme="dark"
          mode="inline"
          onSelect={this.handleMenuClick}
          defaultOpenKeys={["sub1", "sub2"]}
          defaultSelectedKeys={[lastPath]}
        >
          <Menu.Item key="/staff/dashboard" icon={<DashboardOutlined />}>
            Dashboard
            <Link to="/staff/dashboard"></Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="Accounts">
            <Menu.Item key="/staff/accounts/changePassword">
              Change password
              <Link to="/staff/accounts/changePassword"></Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<HomeOutlined />} title="Leaves">
            <Menu.Item key="/staff/leave/leaveBalance">
              View leave balance
              <Link to="/staff/leave/leaveBalance"></Link>
            </Menu.Item>
            <Menu.Item key="/staff/leave/applyLeave">
              Apply leave
              <Link to="/staff/leave/applyLeave"></Link>
            </Menu.Item>
          </SubMenu>
          {/* <Menu.Item key="/admin/calendar" icon={<CalendarOutlined />}>
            Calendar
            <Link to="/admin/calendar"></Link>
          </Menu.Item> */}
        </Menu>
      </Sider>
    );
  };

  ManagerRender = () => {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo" style={{textAlign: "center", color: "white", fontSize: '1em', textTransform: 'uppercase'}}> {this.props.auth.user.userType1}</div>
        <Menu
          theme="dark"
          mode="inline"
          onSelect={this.handleMenuClick}
          defaultOpenKeys={["sub1", "sub2"]}
          defaultSelectedKeys={[lastPath]}
        >
          <Menu.Item key="/manager/dashboard" icon={<DashboardOutlined />}>
            Dashboard
            <Link to="/manager/dashboard"></Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Accounts">
            <Menu.Item key="/manager/accounts/changePassword">
              Change password
              <Link to="/manager/accounts/changePassword"></Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<HomeOutlined />} title="Leaves">
            <Menu.Item key="/manager/leave/leaveBalance">
              View leave balance
              <Link to="/manager/leave/leaveBalance"></Link>
            </Menu.Item>
            <Menu.Item key="/manager/leave/applyLeave">
              Apply leave
              <Link to="/manager/leave/applyLeave"></Link>
            </Menu.Item>
            <Menu.Item key="/manager/leave/manageLeaves">
              Manage leave
              <Link to="/manager/leave/manageLeaves"></Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Staff">
            <Menu.Item key="/manager/staff/viewAllStaff">
              View all staff
              <Link to="/manager/staff/viewAllStaff"></Link>
            </Menu.Item>
          </SubMenu>
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
