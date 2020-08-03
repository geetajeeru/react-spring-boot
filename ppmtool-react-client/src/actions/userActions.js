import axios from "axios";
import {SET_CURRENT_USER, GET_ERRORS} from "./tyes";
import setJWTToken from "../utils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createUser = (user, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", user);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const login = loginRequest => async dispatch => {
    try {
        //post login request
        const response = await axios.post("/api/users/login", loginRequest);

        //extract token from response data
        const {token} = response.data;

        //store the token in local storage
        localStorage.setItem("jwtToken", token);

        //set the token in headers
        setJWTToken(token);

        //decode the token
        const decodedToken = jwt_decode(token);

        //dispatch to user reducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decodedToken
        });

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};