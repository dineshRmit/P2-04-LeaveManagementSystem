import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Button } from "antd";

const { Content } = Layout;

class Landing extends Component {
  componentDidMount = () => {
    const { history } = this.props;
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.userType1 === "admin") {
        history.push("/admin/dashboard");
      } else if (this.props.auth.user.userType1 === "staff") {
        history.push("/staff/dashboard");
      } else {
        history.push("/manager/dashboard");
      }
    }
  };

  handleButtonClick = () => {
    const { history } = this.props;

    history.push("/login");
  };
  render() {
    return (
      <StyledLayout>
        <StyledContent>
          <Row>
            <Col span={24}>
              <StyledDiv>Welcome to Leave Manager</StyledDiv>
            </Col>
          </Row>

          <Row style={{ marginTop: "2em" }}>
            <Col span={24}>
              <Button size="large" type="primary" onClick={() => this.handleButtonClick()}>
                Log in
              </Button>
            </Col>
          </Row>
        </StyledContent>
      </StyledLayout>
    );
  }
}

const StyledLayout = styled(Layout)`
  display: flex;
  justify-content: center;
  height: 70vh;
`;

const StyledContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  font-size: 2.5em;
  text-align: center;
`;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Landing));
