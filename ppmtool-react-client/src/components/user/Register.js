import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createUser} from "../../actions/userActions";
import classNames from "classnames";

class Register extends Component {

    constructor() {
        super()
        this.state = {
            username:"",
            password:"",
            fullName:"",
            confirmPassword:"",
            errors: {}
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.user && this.props.user.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onFormSubmit(e) {
        e.preventDefault();
        const user = {
            username:this.state.username,
            password:this.state.password,
            fullName:this.state.fullName,
            confirmPassword:this.state.confirmPassword
        };
        this.props.createUser(user, this.props.history);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Account</p>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <input type="text" 
                                className={classNames("form-control form-control-lg ", {
                                    "is-invalid": errors.fullName
                                })} 
                                placeholder="Full Name" name="fullName"
                                value={this.state.fullName}
                                onChange={this.onInputChange} />
                            {errors.fullName && (
                                <div className="invalid-feedback">{errors.fullName}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <input type="email" 
                                className={classNames("form-control form-control-lg ", {
                                    "is-invalid": errors.username
                                })}
                                placeholder="Email Address (Username)" name="username"
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
                        <div className="form-group">
                            <input type="password" 
                                className={classNames("form-control form-control-lg ", {
                                    "is-invalid": errors.confirmPassword
                                })} 
                                placeholder="Confirm Password"
                                name="confirmPassword" 
                                value={this.state.confirmPassword}
                                onChange={this.onInputChange} />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">{errors.confirmPassword}</div>
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

Register.propTypes = {
    createUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {createUser})(Register);