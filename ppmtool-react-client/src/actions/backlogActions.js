import axios from "axios";
import {GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK} from "./tyes";

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try{
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getBacklog = (backlogId) => async dispatch => {
    try {
        const response = await axios.get(`/api/backlog/${backlogId}`);
        dispatch({
            type: GET_BACKLOG,
            payload: response.data
        });
    }catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getProjectTask = (backlogId, pt_id, history) => async dispatch => {
    try {
        const response = await axios.get(`/api/backlog/${backlogId}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: response.data
        });
    }catch(error) {
        history.push("/dashboard");
    }
};

export const updateProjectTask = (backlogId, pt_id, projectTask,history) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${backlogId}/${pt_id}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deleteProjectTask = (backlogId, pt_id) => async dispatch => {
    try {
        if(window.confirm(`You are deleting project task ${pt_id}, this action cannot be undone`)) {
            axios.delete(`/api/backlog/${backlogId}/${pt_id}`);
            dispatch({
                type: DELETE_PROJECT_TASK,
                payload: pt_id
            });
        }
    }catch(error) {

    }
}
