import React, {Component} from "react";
import {Link} from "react-router-dom";
import {addProjectTask} from "../../../actions/backlogActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

class AddProjectTask extends Component {
    constructor(props){
        super(props);
        const {id} = props.match.params;
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            errors: {}
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onFormSubmit(e) {
        e.preventDefault();
        const projectTask = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
        }
        this.props.addProjectTask(this.state.projectIdentifier, projectTask, this.props.history);
    }

    render() {
        const {id} = this.props.match.params;
        const {errors} = this.state;
        return (
            <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Add Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <input type="text" 
                            className={classNames("form-control form-control-lg ", {
                                "is-invalid": errors.summary
                            })}
                            name="summary"
                            value={this.state.summary}
                            onChange={this.onInputChange} 
                            placeholder="Project Task summary" />
                            {errors.summary && (
                                <div className="invalid-feedback">{errors.summary}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" 
                            placeholder="Acceptance Criteria" 
                            name="acceptanceCriteria"
                            value={this.state.acceptanceCriteria}
                            onChange={this.onInputChange}/>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" 
                            className="form-control form-control-lg" 
                            name="dueDate"
                            value={this.state.dueDate}
                            onChange={this.onInputChange} />
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" 
                                name="priority"
                                value={this.state.priority}
                                onChange={this.onInputChange} >
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control form-control-lg" 
                                name="status"
                                value={this.state.status}
                                onChange={this.onInputChange}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
        );
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {addProjectTask})(AddProjectTask);