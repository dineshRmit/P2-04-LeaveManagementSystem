import React, { Component } from "react";
import { withRouter } from "react-router";
import { Layout, Breadcrumb } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";

const { Content } = Layout;
class AdminOverview extends Component {
  state = {};
  render() {
    const { user } = this.props.auth;
    return (
      <StyledLayout>
        <StyledBreadcrum>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="landing-copy col s12 center-align">
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                  <p className="flow-text grey-text text-darken-1">
                    You are logged in as <span style={{ fontFamily: "monospace" }}>ADMIN</span> 👏
                  </p>
                </h4>
                {/* <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button> */}

                {/* <button
              style={{
                width: "auto",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={() => this.onDashboardClick()}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Go to dashboard
            </button> */}
              </div>
            </div>
          </div>
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
});

export default connect(mapStateToProps)(withRouter(AdminOverview));
