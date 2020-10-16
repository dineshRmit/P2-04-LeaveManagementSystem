import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout, Breadcrumb, Button } from "antd";
import styled from "styled-components";

import { getAllUsers } from "../../../../../actions/authActions";
import ViewAllUsersTable from "./allUsersTable";

const { Content } = Layout;

class ViewAllUsers extends Component {
  state = {
    userData: undefined,
    loading: true,
  };

  componentDidMount = () => {
    //fetch data
    this.fetchUserData();
  };

  fetchUserData = () => {
    const { getAllUsers } = this.props;

    if (this.state.loading == false) {
      this.setLoadingState();
    }

    getAllUsers().then((res) => {
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
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Leaves</Breadcrumb.Item>
        </StyledBreadcrum>
        <StyledContent>
          <StyledDiv>
            <h3 style={{ marginBottom: "1em" }}>
              <b>All Users</b>
            </h3>
            <Button onClick={() => this.fetchUserData()}>Refresh</Button>
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
  getAllUsers,
})(withRouter(ViewAllUsers));
