import React, { Component } from 'react'
import CreateLabelComponenent from './createLabelComponenent';
import TrashComponent from './trashComponent';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Popper from '@material-ui/core/Popper';
import { Tooltip, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
class MoreOptionComponenent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            moreNotesId: '',
            data: [],
            qa: []
        }
    }

    handleOpenPopper(e) {
        console.log("yes");
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }

    delUp = (moreNotesId) => {
        this.setState({
            moreNotesId: moreNotesId
        })
        this.props.deleteUp(moreNotesId)
    }

    createLabelToMoreOption = (val) => {
        this.props.moreOptionLabelProps(val)
    }

    handleQA = () => {
        console.log("this.props", this.props.completeNote);
        this.state.data.push(this.props.completeNote.id);
        this.state.data.push(this.props.completeNote.title);
        this.state.data.push(this.props.completeNote.description);
        this.props.history.push('/editor', this.state.data);
    }

    handleSQA = () => {

    }

    render() {
        console.log("this.state.dat in more option component", this.props.completeNote);
        return (
            <div>
                <Tooltip title="More">
                    <MoreVertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)}
                        style={{ height: "0.7em" }} />
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} >
                    <Paper className="colorpalette-popper">
                        <TrashComponent trashProps={this.props.noteId}
                            delUp={this.delUp} />
                        <CreateLabelComponenent noteToLabel={this.props.noteId}
                            createLabelToMoreOption={this.createLabelToMoreOption} />
                        {this.props.completeNote.questionAndAnswerNotes.length !== undefined ?
                            this.props.completeNote.questionAndAnswerNotes.length > 0 ?
                                <Button onClick={this.handleQA}>Ask SQA</Button>
                                :
                                <Button onClick={this.handleQA}>Ask QA</Button>
                            : (null)
                        }
                    </Paper>
                </Popper>
            </div>
        )
    }
}
export default withRouter(MoreOptionComponenent)