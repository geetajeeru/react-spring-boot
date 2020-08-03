import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddProject from './components/project/AddProject';
import {Provider} from 'react-redux';
import store from './store';
import UpdateProject from './components/project/UpdateProject';
import ProjectBoard from './components/projectboard/ProjectBoard';
import AddProjectTask from './components/projectboard/projecttasks/AddProjectTask';
import UpdateProjectTask from './components/projectboard/projecttasks/UpdateProjectTask';
import Home from './components/layout/Home';
import Register from './components/user/Register';
import Login from './components/user/Login';
import jwt_decode from "jwt-decode";
import setJWTToken from "./utils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/tyes";
import {logout} from "./actions/userActions";
import SecuredRoute from "./utils/SecuredRoute";

const jwtToken = localStorage.jwtToken;
if(jwtToken) {
  setJWTToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });
  const currentTime = Date.now()/1000;
  if(decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
          {
            //Public Routes
          }
          <Route exact path="/" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          {
            //Private Routes
          }
          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard}/>
            <SecuredRoute exact path="/addProject" component={AddProject}/>
            <SecuredRoute exact path="/updateProject/:id" component={UpdateProject}/>
            <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard}/>
            <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask}/>
            <SecuredRoute exact path="/updateProjectTask/:id/:sequenceId" component={UpdateProjectTask}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
