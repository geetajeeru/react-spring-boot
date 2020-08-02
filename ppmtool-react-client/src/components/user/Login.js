import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import {login} from "../../actions/userActions";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        if(nextProps.user.validToken) {
            this.props.history("/dashboard");
        }
    }

    onInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onFormSubmit(e) {
        e.preventDefault();
        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.login(loginRequest);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="login">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <input type="text" 
                                className={classNames("form-control form-control-lg ", {
                                    "is-invalid": errors.username
                                })} 
                                placeholder="Email Address (Username)" 
                                name="username"
                                value={this.state.username}
                                onChange={this.onInputChange} />
                            {errors.username && (
                                <div className="invalid-feedback">{errors.username}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <input type="password" 
                                className={classNames("form-control form-control-lg ", {
                                    "is-invalid": errors.password
                                })}
                                placeholder="Password" 
                                name="password"
                                value={this.state.password}
                                onChange={this.onInputChange} />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>

        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors
})

export default connect(mapStateToProps, {login})(Login);