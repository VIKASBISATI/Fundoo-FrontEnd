import React, { Component } from 'react'
import { getAllNotes } from '../services/userService'
import { Card,InputBase } from '@material-ui/core';
export default class GetAllNoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }
    componentWillMount() {
        getAllNotes().then((res) => {
            console.log('response is', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
    render() {
        const allNotes = this.state.notes.map((key) => {
            return(
            <div className="get-contents">
            <Card className="get-card1" onClick={this.handleNoteClick}>
                <div className="input1">
                    <InputBase className="get-in2"
                        multiline
                        placeholder="Title"
                        id="title"
                        value={key.title}
                    />
                </div>
                <div className="input2">
                    <InputBase className="get-in1"
                        multiline
                        placeholder="Take a note ...."
                        id="description"
                        value={key.description}
                    />
                </div>
            </Card>
            </div>
            )
        })
        return (
            <div className="get-container">
                {allNotes}
            </div>
        )
    }
}