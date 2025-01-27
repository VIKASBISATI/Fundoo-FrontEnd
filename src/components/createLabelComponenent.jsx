import React, { Component } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { withRouter } from "react-router-dom";
import { Tooltip, InputBase, Button, Menu } from "@material-ui/core";
import { label } from "../services/userService";
import Checkbox from "@material-ui/core/Checkbox";
import { getLabel } from "../services/userService";
import { noteLabel } from "../services/userService";
class CreateLabelComponenent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: false,
      anchorEl: null,
      cardOpen: false,
      label: false,
      check: false,
      create: false,
      editData: "",
      labels: [],
      labelText: "",
      openPop: false
    };
  }
  componentDidMount() {
    this.getLabels();
  }

  getLabels = () => {
    getLabel().then(res => {
      console.log("response from label", res);
      this.setState({
        labels: res.data.data.details
      });
      console.log("labels dtaa", this.state.labels);
    });
  };
  handleOpenPopper(e) {
    console.log("yes");
    this.setState({
      anchorEl: this.state.anchorEl ? false : e.target
    });
  }
  handleAddLabel = event => {
    console.log("in click" + this.state.label);
    const { currentTarget } = event;
    this.setState({
      label: !this.state.label,
      openPop: !this.state.openPop,
      anchorEl: currentTarget
    });
    console.log("in click2 " + this.state.label);
  };
  handleAway = e => {
    console.log("yes key down");
    this.setState({
      label: false,
      anchorEl: null
    });
  };
  handleKeyDown = () => {
    this.setState({
      create: true
    });
  };
  handleLabelText = e => {
    this.setState({
      labelText: e.target.value
    });
  };
  handleLabel = () => {
    var data = {
      label: this.state.labelText,
      isDeleted: false,
      userId: localStorage.getItem("userId")
    };
    label(data)
      .then(res => {
        console.log("res after hitting api label", res.data);
        this.setState({
          editData: res.data
        });
        this.getLabels();
        this.props.editUp(this.state.editData);
      })
      .catch(err => {
        console.log("err in hitting api label", err);
      });
  };
  handleCheck = labelId => {
    console.log("label in handle check", this.props.noteToLabel);
    var data = {
      labelId: labelId,
      noteId: this.props.noteToLabel
    };
    console.log("id and label", data);
    noteLabel(data)
      .then(response => {
        console.log("response in note label", response);
        this.props.createLabelToMoreOption(true);
      })
      .catch(err => {
        console.log("err in hitting api label", err);
      });
  };
  render() {
    const labelMap1 = this.state.labels.map(key => {
      return (
        <div>
          <Checkbox
            checked={this.state.check}
            onChange={() => this.handleCheck(key.id)}
          />
          {key.label}
        </div>
      );
    });
    return (
      <div>
        <div className="label-button">
          <div onClick={event => this.handleAddLabel(event)}>Add Label</div>
        </div>
        {this.state.label ? (
          <ClickAwayListener onClickAway={this.handleAway}>
            <Menu
              open={this.state.openPop}
              anchorEl={this.state.anchorEl}
              style={{ zIndex: "10000" }}
              onKeyDown={this.handleKeyDown}
              onClose={this.handleAway}
            >
              <div className="label-content" style={{padding: "1em"}}>
                <p>Label Note</p>
                <InputBase
                  className="get-in2"
                  placeholder="Enter label name"
                  id="title"
                  value={this.state.title}
                  onChange={this.handleLabelText}
                />
                <div className="trash-checkbox">{labelMap1}</div>
                {this.state.create ? (
                  <div>
                    <p onClick={this.handleLabel}>
                      + create {this.state.labelText}
                    </p>
                  </div>
                ) : null}
              </div>
            </Menu>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  }
}
export default withRouter(CreateLabelComponenent);
