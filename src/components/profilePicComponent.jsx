import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { Button, ClickAwayListener, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
// import storage from '../services/firebase.config'
// import database from '../services/firebase.config'
// import Firebase from '../services/firebase.config'
// import firebase from "firebase";
// import { abc } from '../services/shoppingService';
import { uploadProfile } from '../services/userService'
// var firestore = require('../services/firebase.config');
// var collection = firestore.collection('fundoo').doc('image');
var Url = "http://fundoonotes.incubation.bridgelabz.com/"
class ProfilePicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            file: '',
            profileUrl: '',
            profile: false,
            pic: null,
            open: false,
            imageSet: false,
            selected: '',
        }
    }
    // componentDidMount = () => {
    //     var name = localStorage.getItem('FirstName')
    //     name = name.toUpperCase();
    //     this.setState({
    //         name: name.charAt(0),
    //         url: localStorage.getItem('UserImageUrl')
    //     })
    // }

    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        });
    }
    handleSignOut = () => {
        this.props.history.push('/login')
    }
    handleClickAway = () => {
        this.setState({
            anchorEl: null
        })
    }
    // downloadImage() {
    //     firebase.database.ref('fundoo').orderByChild('GeZ09hJUtQFkuO9RlBmM').on("value", (snap) => {
    //         snap.forEach(snap => {
    //             let imgUrl = snap.child('databaseURL').val();
    //             console.log("image url ", imgUrl);
    //             this.setState({ url: imgUrl })

    //         })
    //     })
    // }
    // handleUploadImage = (e) => {
    //     if (e.target.files[0]) {
    //         var image = e.target.files[0];
    //         var currentUser = localStorage.getItem('Email')
    //         console.log("current user " + currentUser);
    //     Firebase.database.ref('fundoo'). .on('value',(snap)=>{
    //         snap.forEach(snap=>{
    //             snap.datat
    //         })
    //     })
    //        const uploadImage = Firebase.storage.ref(currentUser + `images/${image.name}`).put(image)
    //         uploadImage.on('state_changed',
    //             (snap) => {
    //                 console.log(snap);
    //             },
    //             (err) => {
    //                 console.log(err);
    //             },
    //             () => {
    //                 Firebase.storage.ref('images').child(image.name).getDownloadURL().then(url => {
    //                     console.log("url firebase", url);
    //                     if(url){
    //                         this.downloadImage();
    //                     }
    //                     // localStorage.setItem('UserImageUrl', url);
    //                 }).catch(err => {
    //                     console.log(err);
    //                 })
    //             }
    //         )
    //     }
    //     console.log("in 1");
    //     abc().then(
    //         res => {
    //             console.log("r4ew in profile ", res);
    //             this.setState({
    //                 url: res

    //             })
    //         }
    //     )
    //      ref().child('image').on("value",(snap)=>{
    //         console.log("in 2");
    //         snap.forEach(snap=>{
    //             let imgUrl=snap.child('databaseURL').val();
    //             console.log("image url ",imgUrl);
    //             this.setState({ url: imgUrl })
    //         })
    //     })
    //     let getDoc = firestore.get()
    //         .then(doc => {
    //             if (!doc.exists) {
    //                 console.log('No such document!');
    //             } else {
    //                 console.log('Document data:', doc.data());
    //             }            
    //         })
    //         .catch(err => {
    //             console.log('Error getting document', err);
    //         });
    // }
    handleUploadImage = async (e) => {
        let data = new FormData();
        data.append('file', e.target.files[0]);
        await uploadProfile(data)
            .then((result) => {
                console.log('data after hitting upload profile', result);
                localStorage.setItem('profileimage', Url + result.data.status.imageUrl);
                var image = localStorage.getItem("profileimage");
                console.log("link of the image", image);
                this.setState({
                    // pic: image,
                    imageSet: true,
                    selected: Url + result.data.status.imageUrl
                })
                console.log('image that is selected', this.state.selected);
                localStorage.setItem('profileimage', this.state.selected);
            }).catch(err => {
                console.log("err in hitting api", err);

            })
    }
    render() {
        return (
            <div>
                <Avatar onClick={(e) => this.handleOpenPopper(e)} style={{
                    cursor: "pointer",
                    width: "35px", height: "35px"
                }}>
                    {this.state.name}
                    <img
                        style={{
                            width: "-webkit-fill-available",
                            height: "-webkit-fill-available",
                        }}
                        src={localStorage.getItem('profileimage')}
                    />
                </Avatar>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "9999" }}>
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <Paper style={{ width: "auto", height: "auto" }}>
                            <label className="label">
                                <div className="profile-avatar">
                                    <div className="profile-secondAvatar">
                                        <Avatar style={{ width: "90px", height: "90px" }}>
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
                                            {localStorage.getItem('FirstName')}
                                        </div>
                                        <div>
                                            {localStorage.getItem('Email')}
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type='file' id='file'
                                    onChange={(e) => this.handleUploadImage(e)}
                                    style={{ display: 'none' }}
                                />
                                <Divider />
                                <div className="profile-buttons">
                                    <Button>Add Account</Button>
                                    <Button onClick={this.handleSignOut}>Signout</Button>
                                </div>
                            </label>
                        </Paper>
                    </ClickAwayListener>
                </Popper>
            </div >
        )
    }
}
export default withRouter(ProfilePicComponent)