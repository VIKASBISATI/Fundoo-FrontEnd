import React, { Component } from 'react'
import CreateLabelComponenent from './createLabelComponenent';
import TrashComponent from './trashComponent';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Popper from '@material-ui/core/Popper';
import { Tooltip } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
class MoreOptionComponenent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            moreNotesId:''
        }
    }
    handleOpenPopper(e) {
        console.log("yes");
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }
    delUp=(moreNotesId)=>{
        this.setState({
            moreNotesId:moreNotesId
        })
        this.props.deleteUp(moreNotesId)
    }
    render() {
        return (
            <div>
                <Tooltip title="More">
                    <MoreVertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)} />
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} >
                    <Paper className="colorpalette-popper">
                        <TrashComponent trashProps={this.props.noteId} 
                        delUp={this.delUp}/>
                        <CreateLabelComponenent />
                    </Paper>
                </Popper>
            </div>
        )
    }
}
export default withRouter(MoreOptionComponenent)