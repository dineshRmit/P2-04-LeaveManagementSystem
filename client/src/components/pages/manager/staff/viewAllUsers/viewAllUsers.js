import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout, Breadcrumb, Button } from "antd";
import styled from "styled-components";

import { getAllStaffUsers } from "../../../../../actions/authActions";
import ViewAllUsersTable from "./allUsersTable";

const { Content } = Layout;

class ViewAllStaffUsers extends Component {
  state = {
    userData: undefined,
    loading: true,
  };

  componentDidMount = () => {
    //fetch data
    this.fetchUserData(this.props.auth.user.email);
  };

  fetchUserData = (managerEmail) => {
    const { getAllStaffUsers } = this.props;

    if (this.state.loading == false) {
      this.setLoadingState();
    }

    getAllStaffUsers(managerEmail).then((res) => {
      console.log("displaying user data");
      console.log(res.data);
      this.setUserData(res.data);
      this.setLoadingState();
    });
  };

  setUserData = (allUserData) => {
    this.setState({
      userData: allUserData,
    });
  };

  setLoadingState = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  render() {
    return (
      <StyledLayout>
        <StyledBreadcrum>
          <Breadcrumb.Item>Manager</Breadcrumb.Item>
          <Breadcrumb.Item>Staff</Breadcrumb.Item>
          <Breadcrumb.Item>View all staff under management</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <StyledDiv>
            <h3 style={{ marginBottom: "1em" }}>
              <b>Displaying all staff users that you manage</b>
            </h3>
            <Button onClick={() => this.fetchUserData(this.props.auth.user.email)}>Refresh</Button>
          </StyledDiv>

          <ViewAllUsersTable userData={this.state.userData} loading={this.state.loading} />
        </StyledContent>
      </StyledLayout>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getAllStaffUsers,
})(withRouter(ViewAllStaffUsers));
