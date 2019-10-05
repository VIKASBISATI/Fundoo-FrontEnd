import React, { Component } from "react";
import ProfilePicPage from "../components/profilePicComponent";
class profilePic extends Component {
    render() {
        return (
            <ProfilePicPage props={this.props} />
        );
    }
}
export default profilePic;