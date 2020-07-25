import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AddProject from './components/project/AddProject';
import {Provider} from 'react-redux';
import store from './store';
import UpdateProject from './components/project/UpdateProject';
import ProjectBoard from './components/projectboard/ProjectBoard';
import AddProjectTask from './components/projectboard/projecttasks/AddProjectTask';
import UpdateProjectTask from './components/projectboard/projecttasks/UpdateProjectTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/addProject" component={AddProject}/>
          <Route exact path="/updateProject/:id" component={UpdateProject}/>
          <Route exact path="/projectBoard/:id" component={ProjectBoard}/>
          <Route exact path="/addProjectTask/:id" component={AddProjectTask}/>
          <Route exact path="/updateProjectTask/:id/:sequenceId" component={UpdateProjectTask}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
