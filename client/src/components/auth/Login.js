import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Layout } from "antd";
import { Button } from "antd";
import { Row, Col } from "antd";
import { loginUser } from "../../actions/authActions";
import { Form, Input, Checkbox } from "antd";

const { Content } = Layout;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
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
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    return (
      <StyledLayout>
        <StyledContent>
          {/* <Row style={{ width: "300px" }}>
            <Col span={24}>
              <StyledDiv>
                <b>Login</b> below
              </StyledDiv>
            </Col>
          </Row> */}
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
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

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </StyledContent>
      </StyledLayout>

      // <div className="container">
      //   <div style={{ marginTop: "4rem" }} className="row">
      //     <div className="col s8 offset-s2">
      //       <Link to="/" className="btn-flat waves-effect">
      //         <i className="material-icons left">keyboard_backspace</i> Back to home
      //       </Link>
      //       <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      //         <h4>
      //           <b>Login</b> below
      //         </h4>
      //         {/* <p className="grey-text text-darken-1">
      //           Don't have an account? <Link to="/register">Register</Link>
      //         </p> */}
      //       </div>
      //       <form noValidate onSubmit={this.onSubmit}>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.email}
      //             error={errors.email}
      //             id="email"
      //             type="email"
      //             className={classnames("", {
      //               invalid: errors.email || errors.emailnotfound,
      //             })}
      //           />
      //           <label htmlFor="email">Email</label>
      //           <span className="red-text">
      //             {errors.email}
      //             {errors.emailnotfound}
      //           </span>
      //         </div>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.password}
      //             error={errors.password}
      //             id="password"
      //             type="password"
      //             className={classnames("", {
      //               invalid: errors.password || errors.passwordincorrect,
      //             })}
      //           />
      //           <label htmlFor="password">Password</label>
      //           <span className="red-text">
      //             {errors.password}
      //             {errors.passwordincorrect}
      //           </span>
      //         </div>
      //         <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      //           <button
      //             style={{
      //               width: "150px",
      //               borderRadius: "3px",
      //               letterSpacing: "1.5px",
      //               marginTop: "1rem",
      //             }}
      //             type="submit"
      //             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      //           >
      //             Login
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>
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
