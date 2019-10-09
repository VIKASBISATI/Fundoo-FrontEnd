import React, { Component } from 'react';
import { Divider, createMuiTheme } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiThemeProvider, Button, Card, Tooltip, InputBase } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import { getUserEmails } from '../services/userService'
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
            collaborators: [],
            trueIcon: false,
        }
    }
    componentWillMount = () => {
        this.getEmails();
    }
    getEmails = () => {
        getUserEmails().then((res) => {
            // console.log("res after hitting user api",res.data[0].email);    
            // for(let i=0;i<res.data.length;i++){
            //     this.state.collaborators[i]=res.data[i].email
            //     console.log("Email of Collab",this.state.collaborators[i]);
            // }
            //or
            let users = res.data.map((key) => {
                return key.email
            })
            this.setState({
                collaborators: users
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

    }
    handleSave = () => {

    }
    handleCollabChange = (e) => {
        this.setState({
            collabName: e.target.value
        })
    }
    handleTrueIcon = () => {
        this.setState({
            trueIcon: true
        })
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
                                <div className="collab-avatar">
                                    <div className="collab-secondAvatar">
                                        <Avatar style={{ width: "50px", height: "50px" }}>
                                            <PersonAddOutlinedIcon />
                                        </Avatar>
                                    </div>
                                    <div >
                                        <InputBase
                                            id="title"
                                            placeholder="person or email to share with"
                                            value={this.state.collabName}
                                            onKeyDown={this.handleTrueIcon}
                                            onChange={this.handleCollabChange}
                                        />
                                        {this.state.trueIcon ? <DoneOutlinedIcon />
                                            : (null)}
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