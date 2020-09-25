import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Layout } from "antd";
import { Button } from "antd";
import { loginUser } from "../../actions/authActions";
import { Form, Input } from "antd";

const { Content } = Layout;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      errors: undefined,
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }

    if (nextProps.errors) {
      if (nextProps.errors.accountDeactivated) {
        this.setState({
          errors: nextProps.errors.accountDeactivated,
        });
      } else if (nextProps.errors.emailnotfound) {
        this.setState({
          errors: nextProps.errors.emailnotfound,
        });
      } else {
        this.setState({
          errors: nextProps.errors.passwordincorrect,
        });
      }
    }
  }

  onSubmit = (data) => {
    const userData = {
      email: data.username,
      password: data.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <StyledLayout>
        <StyledContent>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={(data) => this.onSubmit(data)}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* <Form.Item>{this.state.errors ? this.state.errors : null}</Form.Item> */}
            <div style={{ marginBottom: "1em", color: "red" }}>
              {this.state.errors ? "Error:- " : ""}
              {JSON.stringify(this.state.errors)}
            </div>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
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
  font-size: 2.2em;
  text-align: center;
  margin-bottom: 1em;
`;

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
