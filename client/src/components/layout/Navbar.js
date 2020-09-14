import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Landing from "./Landing";
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

// import AdminAccounts from "./admin/accounts/adminAccounts";
// import AdminOverview from "./admin/overview/adminAccounts";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./navbar.css";

const { Header, Sider, Content } = Layout;
const lastPath = window.location.pathname;

class Navbar extends Component {
  componentDidMount = () => {};

  handleMenuClick = (menu) => {
    console.log(" Active key " + menu.key);
  };

  render() {
    return (
      // <Router>
      //   <StyledLayout>
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

      // <Layout className="site-layout">
      //   <StyledHeader>
      //     {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      //       className: "trigger",
      //       onClick: this.toggle,
      //     })}
      //     <AppName>Leave Manager</AppName>
      //     <LogoutDiv>
      //       <Button type="primary" danger>
      //         Logout
      //       </Button>
      //     </LogoutDiv>
      //   </StyledHeader>
      //  <Content
      //         className="site-layout-background"
      //         style={{
      //           margin: "24px 16px",
      //           padding: 24,
      //           minHeight: 280,
      //         }}
      //       >
      //         <Switch>
      //           <Route exact path="/" component={Landing} />
      //           <Route path="/adminHome/Overview" component={AdminOverview} />
      //           <Route path="/adminHome/Accounts" exact component={AdminAccounts} />
      //         </Switch>
      //       </Content>
      //  </Layout>
      //   </StyledLayout>
      // </Router>
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

export default Navbar;

// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// class Navbar extends Component {
//   render() {
//     return (
//       <div className="navbar-fixed">
//         <nav className="z-depth-0">
//           <div className="nav-wrapper white">
//             <Link
//               to="/"
//               style={{
//                 fontFamily: "monospace",
//               }}
//               className="col s5 brand-logo center black-text"
//             >
//               <i className="material-icons">code</i>
//               P2-04
//             </Link>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }

// export default Navbar;
