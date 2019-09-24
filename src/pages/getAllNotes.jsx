import React, { Component } from "react";
import GetAllNotes from "../components/getAllNoteComponent";
export default class GetAllNotesPage extends Component {
    render() {
        return (
            <GetAllNotes props={this.props}
            getNewNote={this.displayNote}/>
        );
    }
}