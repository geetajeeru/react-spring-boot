import axios from "axios";
import {GET_ERRORS} from "./tyes";

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try{
        await axios.post(`api/backlog/${backlogId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            errors: {}
        })
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            errors: error.response.data
        })
    }
};