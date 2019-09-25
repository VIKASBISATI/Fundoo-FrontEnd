import { AppBar, createMuiTheme, IconButton, Button, MuiThemeProvider, Toolbar, Tooltip, InputBase } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DrawerComponent from '../components/drawerComponent'
import { withRouter } from "react-router-dom";
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "black",
                backgroundColor: "white"
            }
        }
    }
})
class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: '',
            title: '',
            noteOpen: false,
            bgColor: '',
            searchText: '',
            clr: false,
            menu: false,
            slideCards: false,
            accountCard: false,
            bgClr: " #f0f0f0"
        }
        this.handleSearchText = this.handleSearchText.bind(this)
    }
    handleNotes = (e) => {
        const notes = e.target.value;
        this.setState({
            notes: notes
        })
    }
    handleSlideCard = () => {
        this.setState({
            slideCards: !this.state.slideCards
        })
    }

    handleTitle = (e) => {
        const title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleNoteClick = () => {
        this.setState({
            noteOpen: !this.state.noteOpen
        })
    }
    handleSearchText = (e) => {
        this.setState({
            searchText: e.target.value
        })
        console.log("search text event value", this.state.searchText);
        this.props.searchBar(this.state.searchText);
    }
    handleReload = () => {
        window.location.reload();
    }
    handleClearText = () => {
        this.setState({
            searchText: ''
        })
    }
    handleKeyDown = () => {
        this.setState({
            clr: false
        })
    }
    handleSearchClick = () => {
        this.setState({
            clr: true,
            bgClr:"	#FFFAF0"

        })
    }
    handleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    handleAccount = () => {
        this.setState({
            accountCard: !this.state.accountCard
        })
    }
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        });
    }
    handleSignOut = () => {
        this.props.history.push('/login')
    }
    handleClose=()=>{
        this.setState({
            bgClr:"#f0f0f0"
        })
    }   
    render() {
        console.log("search after setstate====>", this.state.searchText);
        const slidingCards = this.state.slideCards ? "before" : "after"
        return (
            <div className={slidingCards}>
                <div className="dashboard-container">
                    <MuiThemeProvider theme={theme}>
                        <AppBar position="fixed">
                            <Toolbar>
                                <div className="dashboard-logo">
                                    <IconButton>
                                        <Tooltip title="Menu">
                                            <MenuIcon onClick={this.handleMenu} />
                                        </Tooltip>
                                    </IconButton>
                                    <DrawerComponent menuSelect={this.state.menu}
                                        slideCards={this.slideCards}
                                    />
                                    <IconButton color="inherit" aria-label="Open drawer">
                                    </IconButton>
                                    <img src={require("../assets/images/keep.png")} alt="" width="30px" height="30px" />
                                    <h3 ><span>FundooNotes</span></h3>
                                </div>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                <div className="dashboard-card-div" style={{ backgroundColor: this.state.bgClr }}>
                                    <IconButton>
                                        <Tooltip title="search">
                                            <SearchIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <InputBase style={{ width: "100%" }}
                                        autoComplete="off" placeholder="Search"
                                        onClick={this.handleSearchClick}
                                        // onKeyDown={this.handleKeyDown}
                                        value={this.state.searchText}
                                        onChange={this.handleSearchText}
                                    />
                                    {this.state.clr ? (
                                        <IconButton>
                                            <ClearOutlinedIcon onClick={this.handleClearText} />
                                        </IconButton>
                                    ) : (null)}
                                </div>
                                </ClickAwayListener>
                                <div className="dashboard-refresh">
                                    <IconButton>
                                        <Tooltip title="Refresh">
                                            <RefreshIcon onClick={this.handleReload} />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton>
                                        <AccountCircleRoundedIcon onClick={(e) => this.handleOpenPopper(e)} />
                                    </IconButton>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </MuiThemeProvider>
                    <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: 9999 }}>
                        <Paper>
                            <Button>Add Account</Button>
                            <Button onClick={this.handleSignOut}>Signout</Button>
                        </Paper>
                    </Popper>
                </div>
            </div>
        )
    }
}
export default withRouter(DashboardComponent)