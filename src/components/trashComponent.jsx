import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { trash, forever } from "../services/userService";
class TrashComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: false,
      anchorEl: false
    };
  }
  handleButton = () => {
    console.log("trash note id in handle div", this.props.trashNoteId);
    var trashNoteId = this.props.trashProps;
    var data = {
      noteIdList: [trashNoteId],
      isDeleted: true
    };
    console.log("data in trash", data);
    console.log("");

    trash(data)
      .then(res => {
        console.log("res in trash after hitting", res);
        this.props.delUp(trashNoteId);
      })
      .catch(err => {
        console.log("error in trash ", err);
      });
  };

  handleForever = () => {
    var trashNoteId = this.props.trashProps;
    var data = {
      isDeleted: true,
      noteIdList: [trashNoteId]
    };
    console.log("data in trash", data);
    forever(data)
      .then(res => {
        console.log("res in forever after hitting", res);
        this.props.delUp(trashNoteId);
      })
      .catch(err => {
        console.log("error in trash ", err);
      });
  };

  handleCheck = () => {
    this.setState({
      check: !this.state.check
    });
  };
  handleRestore = () => {
    var trashNoteId = this.props.trashProps;
    var data = {
      noteIdList: [trashNoteId],
      isDeleted: false
    };
    console.log("data in trash", data);
    trash(data)
      .then(res => {
        console.log("res in trash after hitting", res);
        this.props.delUp(trashNoteId);
      })
      .catch(err => {
        console.log("error in trash ", err);
      });
  };
  render() {
    console.log("window", window.location.pathname);
    return (
      <div className="trash-del">
        {window.location.pathname === "/getTrash" ? (
          <div>
            <div onClick={this.handleForever}>Forever</div>
            <div onClick={this.handleRestore}>Restore</div>
          </div>
        ) : (
          <div onClick={this.handlediv}>Delete</div>
        )}
      </div>
    );
  }
}
export default withRouter(TrashComponent);
