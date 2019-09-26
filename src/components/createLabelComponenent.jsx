import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';
import { Tooltip, InputBase, Button } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { label } from '../services/userService';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox'

import { getLabel } from '../services/userService';
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
            labels: [],
            labelText: '',
            openPop: false
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
    handleAddLabel = (event) => {
        console.log("in click" + this.state.label);
        const { currentTarget } = event
        this.setState({
            label: !this.state.label,
            openPop: !this.state.openPop,
            anchorEl: currentTarget
        })
        console.log("in click2 " + this.state.label);

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
        const labelMap1 = this.state.labels.map((key) => {
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
                <Button onClick={(event) => this.handleAddLabel(event)}>Add Label</Button>
                {this.state.label ? (
                    <ClickAwayListener onClickAway={this.handleAway}>
                        <Popper open={this.state.openPop} anchorEl={this.state.anchorEl}
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
                                <div className="trash-checkbox">{labelMap1}</div>
                                {this.state.create ? (<p onClick={this.handleLabel}>+ create {this.state.labelText}</p>) : (null)}
                            </Paper>
                        </Popper>
                    </ClickAwayListener>
                )

                    : (null)
                }
            </div>
        )
    }
}
export default withRouter(CreateLabelComponenent)