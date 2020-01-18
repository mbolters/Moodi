import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }
componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
      

    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    const { errors } = this.state;
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    toast.success("Successfully logged in!")
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    
};
render() {
    const { errors } = this.state;
return (
      <div className="container-fluid" style={{ margin: "auto" }}>
        <div className= "card">
          <div className="row">
            <div className="col s8 offset-s2" style={{ padding: "50px 0px 50px 0px"}}>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b className= "purple-text text-darken-2">Login</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Don't have an account? <Link className= "purple-text text-darken-1" to="/register">Register</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    className={classnames("", {
                      invalid: errors.username || errors.usernamenotfound
                    })}
                  />
                  <label htmlFor="username">Username</label>
                  <span className="red-text">
                    {errors.username}
                    {errors.usernamenotfound}
                  </span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable purple darken-2">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);