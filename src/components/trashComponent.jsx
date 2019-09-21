import React, { Component } from 'react'
import { Tooltip, Card, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { trash } from '../services/userService';
class TrashComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            cardOpen: false
        }
    }
    handleMore = () => {
        this.setState({
            cardOpen: !this.state.cardOpen
        })
        var trashNoteId = this.props.trashNoteId;
        var data = {
            noteIdList: [trashNoteId],
            isDeleted: true
        }
        trash(data).then((res) => {
            console.log('res in trash after hitting', res);
        }).catch((err) => {
            console.log('error in trash ', err);

        })
    }
    render() {
        return (
            <div>
                <Tooltip title="More">
                    <MoreVertOutlinedIcon onClick={this.handleMore} />
                </Tooltip>
                {this.state.cardOpen ?
                    (<Card className="trash-card">
                        <MenuItem>
                            Delete Notes
                    </MenuItem>
                    </Card>) : (null)}
            </div>
        )
    }
}
export default withRouter(TrashComponent)