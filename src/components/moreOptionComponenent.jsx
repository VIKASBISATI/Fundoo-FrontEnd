import React, { Component } from "react";
import CreateLabelComponenent from "./createLabelComponenent";
import TrashComponent from "./trashComponent";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Popper from "@material-ui/core/Popper";
import { Tooltip, Button, Menu, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
class MoreOptionComponenent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: false,
      moreNotesId: "",
      data: [],
      qa: []
    };
  }

  handleOpenPopper(e) {
    console.log("yes");
    this.setState({
      anchorEl: this.state.anchorEl ? false : e.target
    });
  }
  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  delUp = moreNotesId => {
    this.setState({
      moreNotesId: moreNotesId
    });
    this.props.deleteUp(moreNotesId);
  };

  createLabelToMoreOption = val => {
    this.props.moreOptionLabelProps(val);
  };

  handleQA = id => {
    console.log("this.props", this.props.completeNote);
    this.state.data.push(this.props.completeNote.id);
    this.state.data.push(this.props.completeNote.title);
    this.state.data.push(this.props.completeNote.description);
    this.props.history.push(`/quesAns/${id}`, this.state.data);
  };

  handleSQA = id => {
    console.log("this.props", this.props.completeNote);
    this.state.data.push(this.props.completeNote.id);
    this.state.data.push(this.props.completeNote.title);
    this.state.data.push(this.props.completeNote.description);
    this.state.data.push(true);
    this.state.data.push(this.props.completeNote.questionAndAnswerNotes);
    this.props.history.push(`/quesAns/${id}`, this.state.data);
  };

  render() {
    // console.log("this.state.dat in more option component", this.props.completeNote);
    return (
      <div>
        <Tooltip title="More">
          <MoreVertOutlinedIcon
            onClick={e => this.handleOpenPopper(e)}
            style={{ height: "0.7em" }}
          />
        </Tooltip>
        <Menu
          open={this.state.anchorEl}
          anchorEl={this.state.anchorEl}
          onClose={this.handleMenuClose}
          placement="bottom-start"
        >
            <MenuItem>
              <TrashComponent
                trashProps={this.props.noteId}
                delUp={this.delUp}
              />
            </MenuItem>
            <MenuItem>
              <CreateLabelComponenent
                noteToLabel={this.props.noteId}
                createLabelToMoreOption={this.createLabelToMoreOption}
              />
            </MenuItem>
            {this.props.completeNote.questionAndAnswerNotes.length !==
            undefined ? (
              this.props.completeNote.questionAndAnswerNotes.length > 0 ? (
                <MenuItem
                  onClick={() => this.handleSQA(this.props.completeNote.id)}>
                  Show QA
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => this.handleQA(this.props.completeNote.id)}> Ask
                  QA
                </MenuItem>
              )
            ) : null}
        </Menu>
      </div>
    );
  }
}
export default withRouter(MoreOptionComponenent);
