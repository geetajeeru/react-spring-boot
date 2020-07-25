import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import classNames from "classnames";
import {getProjectTask, updateProjectTask} from "../../../actions/backlogActions";
import PropTypes from "prop-types";


class UpdateProjectTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: "",
            projectSequence: "",
            created_At: "",
            errors: {}
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const {id, sequenceId} = this.props.match.params;
        this.props.getProjectTask(id, sequenceId, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        const {
            id,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            projectSequence,
            created_At
        } = nextProps.projectTask;
        this.setState({
            id,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            projectSequence,
            created_At
        });
    }

    onInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onFormSubmit(e) {
        e.preventDefault();
        const task = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            projectSequence: this.state.projectSequence,
            created_At: this.state.created_At
        };
        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, task, this.props.history);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Update Project Task</h4>
                        <p className="lead text-center">Project ID: {this.state.projectIdentifier} | Project Task ID: {this.state.projectSequence}</p>
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <input type="text"
                                className={classNames("form-control form-control-lg ", {
                                    "is-invalid": errors.summary
                                })} 
                                name="summary" 
                                value={this.state.summary}
                                onChange = {this.onInputChange}
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
                                onChange = {this.onInputChange}/>
                            </div>
                            <h6>Due Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                className="form-control form-control-lg" 
                                name="dueDate"
                                value={this.state.dueDate}
                                onChange = {this.onInputChange} />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg" 
                                    name="priority"
                                    value={this.state.priority}
                                    onChange = {this.onInputChange}>
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
                                    onChange = {this.onInputChange}>
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

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    projectTask: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    projectTask: state.backlog.projectTask,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectTask, updateProjectTask})(UpdateProjectTask);