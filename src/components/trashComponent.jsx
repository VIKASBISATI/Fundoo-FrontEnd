import React, { Component } from 'react';
import { Tooltip, Button, InputBase } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { getLabel } from '../services/userService'
import { trash } from '../services/userService';
import Checkbox from '@material-ui/core/Checkbox';
import { label } from '../services/userService';
class TrashComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            anchorEl: false,
            cardOpen: false,
            label: false,
            check: false,
            create: false,
            labels: [],
            labelText: ''
        }
    }
    componentDidMount() {
        this.getLabels();
    }

    getLabels = () => {
        getLabel().then((res) => {
            console.log('response from label', res);
            this.setState({
                labels: res.data.data.details
            })
            console.log("labels dtaa", this.state.labels);
        })
    }
    handleOpenPopper(e) {
        console.log("yes");
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }
    handleButton = () => {
        var trashNoteId = this.props.trashNoteId;
        var data = {
            noteIdList: [trashNoteId],
            isDeleted: true
        }
        console.log('data in trash', data);
        trash(data)
            .then((res) => {
                console.log('res in trash after hitting', res);
                this.props.delUp(trashNoteId)
            }).catch((err) => {
                console.log('error in trash ', err);
            })
    }
    handleAddLabel = () => {
        this.setState({
            label: !this.state.label
        })
    }
    handleAway = (e) => {
        console.log('yes key down');
        this.setState({
            label: false
        })
    }
    handleKeyDown = () => {
        this.setState({
            create: true
        })
    }
    handleLabelText = (e) => {
        this.setState({
            labelText: e.target.value
        })
    }
    handleLabel = () => {
        var data = {
            "label": this.state.labelText,
            "isDeleted": false,
            "userId": localStorage.getItem('userId')
        }
        label(data).then((res) => {
            console.log('res after hitting api label', res.data);
        }).catch((err) => {
            console.log('err in hitting api label', err);
        })
    }
    handleCheck = () => {
        this.setState({
            check: !this.state.check
        })
    }
    render() {
        const labelMap = this.state.labels.map((key) => {
            return (
                <div >
                    <Checkbox checked={this.state.check}
                        onChange={this.handleCheck}
                    />
                    {key.label}
                </div>
            )
        })
        return (
            <div>
                <Tooltip title="More">
                    <MoreVertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)} />
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} >
                    <Paper className="colorpalette-popper">
                        <Button onClick={this.handleButton}>Delete</Button>
                        <Button onClick={this.handleAddLabel}>Add Label</Button>
                    </Paper>
                </Popper>
                {this.state.label ?
                    <ClickAwayListener onClickAway={this.handleAway}>
                        <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                            onKeyDown={this.handleKeyDown}>
                            <Paper className="label-popper">
                                <p>Label Note</p>
                                <InputBase className="get-in2"
                                    placeholder="Enter label name"
                                    id="title"
                                    value={this.state.title}
                                    onChange={this.handleLabelText}
                                />
                                <Tooltip title="search">
                                    <SearchIcon />
                                </Tooltip>
                                <div className="trash-checkbox">{labelMap}</div>
                                {this.state.create ? (<p onClick={this.handleLabel}>+ create {this.state.labelText}</p>) : (null)}
                            </Paper>
                        </Popper>
                    </ClickAwayListener>
                    : (null)
                }
            </div>
        )
    }
}
export default withRouter(TrashComponent)