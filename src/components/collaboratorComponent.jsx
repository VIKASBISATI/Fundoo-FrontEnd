import React, { Component } from 'react';
import { Divider, createMuiTheme } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiThemeProvider, Button, Card, Tooltip, InputBase, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import { getUserEmails } from '../services/userService';
import { addCollaboratorNotes } from '../services/userService';
import { searchUserList } from '../services/userService';
import { getAllNotes } from '../services/userService'
const theme = createMuiTheme({
    overrides: {
        MuiDialogContent: {
            root: {
                padding: "0px 0px"
            }
        }
    }
})
class CollaboratorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            collabName: '',
            AllCollaborators: [],
            trueIcon: false,
            searchText: '',
            card: false,
            filteredEmails: '',
            searchData: [],
            notes: [],
        }
    }

    componentWillMount = () => {
        this.getEmails();
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {
        getAllNotes().then((res) => {
            console.log('response is', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }

    getEmails = () => {
        getUserEmails().then((res) => {
            // console.log("res after hitting user api",res.data[0].email);    
            // for(let i=0;i<res.data.length;i++){
            //     this.state.AllCollaborators[i]=res.data[i].email
            //     console.log("Email of Collab",this.state.AllCollaborators[i]);
            // }
            //or
            let users = res.data.map((key) => {
                return key.email
            })
            this.setState({
                AllCollaborators: users
            })
        }).catch(err => {
            console.log("err in hitting user api", err);
        })
    }

    handleEdit = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false,
        })
    }

    handleCancel = () => {
        this.setState({
            dialogOpen: false,
        })
    }

    handleSave = () => {
        var data1 = {}
        let data = {
            "searchWord": this.state.searchText
        }
        searchUserList(data).then((res) => {
            console.log("res in search user list is", res);
            this.setState({
                searchData: res.data.data.details
            })
            console.log("res.data in collab is ", res.data.data.details[0].email);
            data1 = {
                "email": res.data.data.details[0].email,
                "firstName": res.data.data.details[0].firstName,
                "lastName": res.data.data.details[0].lastName,
                "userId": res.data.data.details[0].userId
            }
            console.log("this.props.noteTo", data1);
            addCollaboratorNotes(data1, this.props.noteToCollab).then((res) => {
                console.log("res after hitting adding collaborator api is ", res);
            }).catch((err) => {
                console.log("err in hitting collaborator api", err);
            })
            console.log("data1---------->", data1);

        }).catch(err => {
            console.log("err in hitting search user api ", err);
        })

    }

    handleDone = () => {
    }

    handleCollabChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }

    handleTrueIcon = () => {
        this.setState({
            trueIcon: true
        })
    }

    handleSearch = () => {
        const filteredEmail = this.state.AllCollaborators.filter(email => {
            return email.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
        })
        if (this.searchText === '') {
            this.setState({
                trueIcon: false
            })
        }
        this.setState({
            card: true,
            filteredEmails: filteredEmail
        })
    }

    handleMenu = (e) => {
        this.setState({
            searchText: e.target.textContent,
            card: false
        })
        console.log("search text is ", this.state.searchText);

    }

    render() {
        return (
            <div>
                <Tooltip title="collaborator">
                    <PersonAddOutlinedIcon onClick={this.handleEdit} />
                </Tooltip>
                <MuiThemeProvider theme={theme}>
                    <Dialog position="static"
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                    >
                        <Card className="get-card2">
                            <DialogTitle>
                                Collaborators
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                <div className="avatar-container">
                                    <div className="collab-avatar">
                                        <div className="collab-secondAvatar">
                                            <Avatar style={{ width: "50px", height: "50px" }}>
                                                <img
                                                    style={{
                                                        width: "-webkit-fill-available",
                                                        height: "-webkit-fill-available",
                                                    }}
                                                    src={localStorage.getItem('profileimage')}
                                                />
                                            </Avatar>
                                        </div>
                                        <div>
                                            <div>
                                                <p style={{ fontFamily: 'Roboto' }}>
                                                    <b>{localStorage.getItem('FirstName')}
                                                        {localStorage.getItem('LastName')}
                                                    </b>
                                                    (owner)
                                                <br />
                                                    {localStorage.getItem('Email')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.notes.map(key => {
                                        console.log("this.porops.collab",this.props.noteToCollab);
                                        
                                        return (
                                            key === this.props.noteToCollab ?
                                                <div className="collab-avatar">
                                                    <div className="collab-secondAvatar">
                                                        {key.collaborators.map(col => {
                                                            return (
                                                                <Avatar style={{
                                                                    cursor: "pointer",
                                                                    width: "35px", height: "35px"
                                                                }}>
                                                                    {col.firstName.toUpperCase().charAt(0)}
                                                                </Avatar>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {key.collaborators.map(col => {
                                                                return (
                                                                    <p style={{ fontFamily: 'Roboto' }}>
                                                                        {col.email}
                                                                    </p>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                : (null))
                                    })
                                    }
                                    <div className="collab-avatar">
                                        <div className="collab-secondAvatar">
                                            <Avatar style={{ width: "50px", height: "50px" }}>
                                                <PersonAddOutlinedIcon />
                                            </Avatar>
                                        </div>
                                        <div className="collab-input">
                                            <InputBase
                                                id="title"
                                                placeholder="person or email to share with"
                                                style={{ width: "475px" }}
                                                value={this.state.searchText}
                                                onKeyDown={this.handleTrueIcon}
                                                onChange={this.handleCollabChange}
                                                onKeyUp={this.handleSearch}
                                            />
                                            {this.state.trueIcon ? <DoneOutlinedIcon onClick={this.handleDone} />
                                                : (null)}
                                            <div>
                                                {
                                                    this.state.card !== false && this.state.searchText !== '' ?
                                                        <Card className="collab-card">
                                                            {this.state.filteredEmails.map((key) => {
                                                                return (
                                                                    <div className="collab-map">
                                                                        <MenuItem onClick={this.handleMenu}>
                                                                            {key}
                                                                        </MenuItem>
                                                                    </div>
                                                                )
                                                            })}
                                                        </Card>
                                                        :
                                                        (null)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="collab-buttons">
                                    <Button onClick={this.handleSave}>Save</Button>
                                    <Button onClick={this.handleCancel}>Cancel</Button>
                                </div>
                            </DialogContent>
                        </Card>
                    </Dialog>
                </MuiThemeProvider>

            </div>
        )
    }
}
export default withRouter(CollaboratorComponent)