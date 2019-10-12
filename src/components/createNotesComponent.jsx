import React, { Component } from 'react'
import { Card, InputBase, Tooltip, Button } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { addNotes } from '../services/userService';
import ColorPaletteComponent from './colorPaletteComponent';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Checkbox from '@material-ui/core/Checkbox';
export default class createNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteClick: false,
            title: '',
            desc: '',
            note: {},
            color: '',
            checkedState: false,
            list: '',
            checkList: [],
            currentItem: {
                text: '',
                key: ''
            }
        }
        this.inputRef = React.createRef();
    }
    // handleClickAway = () => {
    //     var data = {
    //         title: this.state.title,
    //         description: this.state.desc,
    //         color: this.state.color,
    //         isArchived: this.state.archive
    //     }
    //     console.log("create notes data", data)
    //     addNotes(data).then((res) => {
    //         console.log(res);
    //         this.setState({
    //             note: res.data.status.details
    //         });
    //         this.props.getNew(this.state.note)
    //         this.setState({
    //             noteClick: false,
    //             title: '',
    //             desc: '',
    //             color:''
    //         })
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    //     this.setState({
    //         noteClick: false,
    //         title: '',
    //         desc: ''
    //     })
    // }
    componentDidMount() {
        this.inputRef.current.focus()
        console.log("this.input current", this.inputRef);
    }
    handleCards = () => {
        this.setState({
            noteClick: true
        })
    }
    handleTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleDescription = (e) => {
        var desc = e.target.value;
        this.setState({
            desc: desc
        })
    }
    handleList = (e) => {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now()
            }
        })
    }
    handleClose = () => {
        this.setState({
            noteClick: false,
            title: '',
            description: ''
        })
        var data = {
            title: this.state.title,
            description: this.state.desc,
            color: this.state.color,
            isArchived: this.state.archive
        }
        console.log("create notes data", data)
        addNotes(data).then((res) => {
            console.log(res);
            this.setState({
                note: res.data.status.details
            });
            this.props.getNew(this.state.note)
            this.setState({
                noteClick: false,
                title: '',
                desc: '',
                color: ''
            })
        }).catch((err) => {
            console.log(err);
        })

    }
    handleColor = async (col) => {
        console.log('col', col);
        await this.setState({
            color: col
        })
    }
    // handleEnter=(e)=>{
    //     if(e.key==='Enter'){
    //         e.preventDefault();
    //         this.handleClose();
    //         onKeyPresss={()=>this.handleEnter}
    //     }
    // }
    handleCheckBox = () => {
        console.log("triggered");
        this.setState({
            checkedState: !this.state.checkedState
        })

    }

    handleCheckClose = () => {
        this.setState({
            noteClick: false,
            checkedState: false
        })
        const addCheckList = this.state.checkList.map(data => {
            return data.text
        })
        console.log("add check list is ", addCheckList);

        // var data = {
        //     title: this.state.title,
        //     isArchived: this.state.archive,
        //     color: this.state.color,
        //     noteCheckLists: addCheckList,
        // }
        console.log("title", this.state.title);

        var data = new FormData();
        data.append('title', this.state.title);
        data.append('isArchived', this.state.archive);
        data.append('color', this.state.color);
        data.append('noteCheckLists', addCheckList);
        for (var pair of data.entries()) {
            console.log("data in form data", pair[0] + ', ' + pair[1]);
        }

        addNotes(data).then((res) => {
            console.log(res);
            this.setState({
                note: res.data.status.details
            });
            this.props.getNew(this.state.note)
            this.setState({
                noteClick: false,
                title: '',
                desc: '',
                color: ''
            })
        }).catch((err) => {
            console.log(err);
        })
        this.setState({
            title: '',
        })
    }

    handleAddItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem.text !== '') {
            const newItems = [...this.state.checkList, newItem];
            this.setState({
                checkList: newItems,
                currentItem: {
                    text: '',
                    key: ''
                }
            })
        }
    }

    handleDeleteItem = (keyId) => {
        const filteredItems = this.state.checkList.filter((data) => {
            return data.key !== keyId
        })
        this.setState({
            checkList: filteredItems
        })
    }

    handleUpdateItem = (text, keyId) => {
        const updatedItems = this.state.checkList;
        updatedItems.map(item => {
            if (item.key === keyId) {
                item.text = text
            }
        })
        this.setState({
            checkList: updatedItems
        })
    }

    render() {
        return (
            <div className="create-container">
                {this.state.noteClick ? (
                    <Card className="create-card2" style={{ boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)", backgroundColor: this.state.color }} >
                        <div className="input1">
                            <InputBase className="in2"
                                multiline
                                placeholder="Title"
                                id="title"
                                style={{ width: "100%" }}
                                onChange={this.handleTitle}
                                value={this.state.title}
                            />
                        </div>
                        <div className="input2">
                            <InputBase className="in3"
                                multiline
                                placeholder="Take a note ...."
                                style={{ width: "100%" }}
                                id="description"
                                onChange={this.handleDescription}
                                value={this.state.desc}
                            />
                        </div>
                        <div className="notes-icons">
                            <div className="notes-icon-div">
                                <Tooltip title="Remind me">
                                    <AddAlertOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <Tooltip title="collaborator">
                                    <PersonAddOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <ColorPaletteComponent
                                    paletteProps={this.handleColor}
                                    notesId={""}
                                />
                                <Tooltip title="Add image">
                                    <ImageOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <Tooltip title="Archive">
                                    <ArchiveOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <Tooltip title="More">
                                    <MoreVertOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                            </div>
                            <div>
                                <Button onClick={this.handleClose}>
                                    close
                                </Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                        (null)
                    )
                }
                {this.state.checkedState && !this.state.noteClick ?
                    <Card className="create-card2"
                        style={{ boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)", backgroundColor: this.state.color }} >
                        <div className="input1">
                            <InputBase className="in2"
                                multiline
                                placeholder="Title"
                                id="title"
                                style={{ width: "100%" }}
                                onChange={this.handleTitle}
                                value={this.state.title}
                            />
                        </div>
                        {this.state.checkList.map(data => {
                            return (
                                <div className="check-map">
                                    <InputBase className="in3"
                                        multiline
                                        value={data.text}
                                        style={{ width: "100%" }}
                                        onChange={(e) => this.handleUpdateItem(e.target.value, data.key)}
                                    />
                                    <DeleteOutlineIcon onClick={() => this.handleDeleteItem(data.key)} />
                                </div>
                            )
                        })}
                        <hr style={{ margin: "0" }} />
                        <div className="check-input2">
                            <span style={{ color: "gray" }}>+</span>
                            <InputBase className="in3"
                                multiline
                                placeholder="List item"
                                id="description"
                                onChange={this.handleList}
                                style={{ width: "100%" }}
                                value={this.state.currentItem.text}
                            />
                            <Button onClick={this.handleAddItem}>AddItem</Button>
                        </div>
                        <hr style={{ margin: "0" }} />
                        <div className="notes-icons">
                            <div className="notes-icon-div">
                                <Tooltip title="Remind me">
                                    <AddAlertOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <Tooltip title="collaborator">
                                    <PersonAddOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <ColorPaletteComponent
                                    paletteProps={this.handleColor}
                                    notesId={""}
                                />
                                <Tooltip title="Add image">
                                    <ImageOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <Tooltip title="Archive">
                                    <ArchiveOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                                <Tooltip title="More">
                                    <MoreVertOutlinedIcon style={{height:"0.7em"}}/>
                                </Tooltip>
                            </div>
                            <div>
                                <Button onClick={this.handleCheckClose}>
                                    close
                            </Button>
                            </div>
                        </div>
                    </Card> : (
                        !this.state.noteClick ?
                            <div>
                                <Card className="create-card1" onClick={this.handleNoteClick}
                                    style={{ boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" }}>
                                    <div className="input2" style={{ width: "100%" }}>
                                        <InputBase className="in1"
                                            multiline
                                            placeholder="Take a note ...."
                                            id="description"
                                            ref={this.inputRef}
                                            style={{ width: "100%" }}
                                            onChange={this.handleDescription}
                                            onClick={this.handleCards}
                                            value={this.state.desc}
                                        />
                                    </div>
                                    <div>
                                        <Checkbox
                                            checked
                                            color="White"
                                            onChange={this.handleCheckBox}
                                        />
                                    </div>
                                </Card>
                            </div> :
                            (null))}
            </div>
        )
    }
}