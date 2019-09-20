import { AppBar, createMuiTheme, IconButton, MuiThemeProvider, Toolbar, Tooltip, InputBase } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import DrawerComponent from '../components/drawerComponent'
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
export default class dashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            notes: '',
            title: '',
            noteOpen: false,
            bgColor: '',
            searchText: '',
            clr: false,
            menu: true,
            slideCards: false
        }
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
        const searchText = e.target.value
        console.log(searchText)
        this.setState({
            searchText: searchText
        })
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
            clr: true
        })
    }
    handleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    render() {
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
                                    <h4 style={{ fontFamily: "TimesNewRoman" }}><span>FundooNotes</span></h4>
                                </div>
                                <div className="dashboard-card-div">
                                    <IconButton>
                                        <Tooltip title="search">
                                            <SearchIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <InputBase style={{ width: "100%" }}
                                        autoComplete="off" placeholder="Search"
                                        onClick={this.handleSearchClick}
                                        onKeyDown={this.handleKeyDown}
                                        onChange={this.handleSearchText}
                                        value={this.state.searchText}
                                    />
                                    {(this.state.clr) ? (
                                        <IconButton>
                                            <ClearIcon onClick={this.handleClearText} />
                                        </IconButton>
                                    ) : (null)}
                                </div>
                                <div className="dashboard-refresh">
                                    <IconButton>
                                        <Tooltip title="Refresh">
                                            <RefreshIcon onClick={this.handleReload} />
                                        </Tooltip>
                                    </IconButton>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}