import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";

const SecuredRoute = ({component: Component, user, ...otherProps}) => (
    <Route {...otherProps} render={
        props => user.validToken === true ? (<Component {...props}/>) : 
        (<Redirect to ="/login"/>)
    }/>
);

SecuredRoute.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(SecuredRoute);