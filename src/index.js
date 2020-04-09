import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import "./index.css";
import { getCurrentIssueId, getIssue, getIssues } from "./api.js";

function Dropdown(props) {
  let options = ["Unknown", "Done", "In progress", "To Do"];
  let selected = props.status;
  return (
    <div>
      <select className="status-menu">
        {options.map((choice, i) => {
          if (selected === choice)
            return (
              <option value={choice} selected>
                {choice}
              </option>
            );
          return <option value={choice}>{choice}</option>;
        })}
      </select>
      <div className="assignee-box mt-4">
        <h5>{props.assignee ? "Asignee" : "No Asignee Listed"}</h5>
        <h5 className="text-muted">{props.assignee}</h5>
      </div>
    </div>
  );
}

// subTaskList

class SubTaskList extends React.Component {
  constructor(props) {
    super(props);
    this.subtaskListRef = React.createRef();
    this.state = {
      subTasks: [],
    };
  }

  async getSubtaskIssues(ids) {
    // here we're not getting ids
    let subTaskIssues = await getIssues(ids);
    this.setState({
      subTasks: subTaskIssues,
      subTaskList: "hidden",
    });
  }

  componentDidUpdate() {
    // invoke getCurrentIssue
    let tasks = this.props.tasks || [];
    this.getSubtaskIssues(tasks);
  }

  handleClick() {
    this.subtaskListRef.current.classList.toggle("hide");
  }

  render() {
    let assignColorClassNames = {
      "In progress": "text-primary",
      Done: "text-success",
      Todo: "text-secondary",
      Unknown: "text-secondary",
      null: "text-secondary",
    };
    return (
      <div>
        <a onClick={this.handleClick.bind(this)}> Show subtasks </a>
        <ol className="task-list hide" ref={this.subtaskListRef}>
          {this.state.subTasks.map((subTask, i) => (
            <li key={i} className="task-list-item">
              <span>{subTask.title}</span>
              <span
                className={`subtask-status ${
                  assignColorClassNames[subTask.status]
                }`}
              >
                {subTask.status ? subTask.status : "Unknown"}
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

class CurrentIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
    };
  }

  async getCurrentIssue() {
    let id = await getCurrentIssueId();
    id = id || 5;
    let currentIssueObject = await getIssue(id);
    this.setState({
      issue: currentIssueObject,
    });
  }

  componentDidMount() {
    // invoke getCurrentIssue
    this.getCurrentIssue();
  }
  render() {
    return (
      <div>
        <div class="container">
          <div class="row justify-content-lg-space-between">
            <div class="col-8">
              <h3> {this.state.issue.title} </h3>
            </div>
            <div class="col-4">
              <Dropdown
                status={this.state.issue.status}
                assignee={this.state.issue.assignee}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-8">
              <SubTaskList tasks={this.state.issue.subtasks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="issue-component">
        <div>
          <CurrentIssue />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Container />, document.getElementById("root"));
