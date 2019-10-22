import { AppBar, createMuiTheme, IconButton, MuiThemeProvider, Toolbar, Tooltip, InputBase } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DrawerComponent from '../components/drawerComponent';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import { withRouter } from "react-router-dom";
import ProfilePicComponent from './profilePicComponent';
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "black",
                backgroundColor: "white",
            }
        },
        MuiToolbar: {
            regular: {
                width: "100%",
                display: "flex",
                justifyContent: "space-between"
            },
            gutters: {
                paddingLeft: 0,
                paddingRight: 0
            }
        },
        MuiIconButton: {
            root: {
                padding: 0
            }
        },
        MuiPaper: {
            elevation4: {
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
            }
        },
        // MuiSvgIcon: {
        //     root: {
        //         width:"0",
        //         height:"0.7em"
        //     }
        // }
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
            dashboardNameVariant: '',
            accountCard: false,
            bgClr: " #f0f0f0",
            refresh: false,
            name: '',
            view: false,
            a: ''
        }
        this.handleSearchText = this.handleSearchText.bind(this)
        this.changeToArchive = this.changeToArchive.bind(this);
    }
    componentDidMount = () => {
        try {
            var name = localStorage.getItem('FirstName')
            name = name.toUpperCase();
            this.setState({
                name: name.charAt(0),
                a: 1,
                dashboardNameVariant: "FundooNotes"
            })
            console.log("the path name is", window.location.pathname);

        } catch (err) {
            console.log("err", err);
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
        this.setState({
            searchText: e.target.value
        })
        console.log("search text event value", this.state.searchText);
        this.props.searchBar(this.state.searchText);
    }
    handleReload = () => {
        window.location.reload();
        this.setState({
            refresh: !this.state.refresh
        })
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
            bgClr: "#FFFAF0"

        })
    }
    handleMenu = async () => {
        await this.setState({
            menu: !this.state.menu
        })
        this.props.menuGet(this.state.menu)
    }
    handleAccount = () => {
        this.setState({
            accountCard: !this.state.accountCard
        })
    }


    handleClose = () => {
        this.setState({
            bgClr: "#f0f0f0"
        })
    }
    changeToTrash = async (trashed) => {
        console.log("yes trashed enterd", trashed);
        if (trashed) {
            console.log("yes trashed enterd", trashed);
            await this.setState({
                dashboardNameVariant: 'Trash'
            })
            console.log("dashboard varaint name is ", this.state.dashboardNameVariant);
        }
    }
    changeToNote = (noted) => {
        console.log("yes notes enterd", noted);
        if (noted) {
            console.log("yes notes enterd", noted);
            this.setState({
                dashboardNameVariant: "FundooNotes"
            })
            console.log("dashboard varaint name is ", this.state.dashboardNameVariant);

        }
    }
    changeToArchive = async (arc) => {
        console.log("yes archived enterd", arc);
        if (arc) {
            console.log("yes archived enterd", arc);
            await this.setState({
                dashboardNameVariant: "Archive"
            })
        }
    }

    handleListView = async () => {
        await this.setState({
            view: !this.state.view
        })
        console.log("this.state.0", this.state.view);

        this.props.listView(this.state.view)
    }

    handleGridView = async () => {
        await this.setState({
            view: !this.state.view
        })
        console.log("this.state.view in handle grid", this.state.view);
        this.props.listView(this.state.view)
    }

    handleShoppingIcon = () => {
        this.props.history.push('/shoppingCart')
    }

    render() {
        console.log("search after setstate====>", this.state.searchText);
        return (
            <div className="dashboard-container">
                <MuiThemeProvider theme={theme}>
                    <AppBar position="fixed" className="dashboard-appbar" style={{
                        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
                    }}>
                        <div id="dashboard-cont">
                            <Toolbar>
                                <div className="dashboard-logoSearch">
                                    <div className="dashboard-logo">
                                        <Tooltip title="Menu">
                                            <MenuIcon onClick={this.handleMenu} style={{ cursor: "pointer" }} />
                                        </Tooltip>
                                        <DrawerComponent menuSelect={this.state.menu}
                                            changeToNote={this.changeToNote}
                                            changeToTrash={this.changeToTrash}
                                            changeToArchive={this.changeToArchive}
                                        />
                                        <img src={require("../assets/images/keep.png")} alt="" width="30px"
                                            height="30px" />
                                        <p id="blinking">
                                            {/* {this.state.dashboardNameVariant === '' ? "Fundoonotes" :
                                            this.state.dashboardNameVariant} */}
                                            {
                                                (
                                                    this.props.location.state !== undefined &&
                                                        !window.location.pathname.startsWith('/quesAns') ?
                                                        <span style={{ color: "#5F6368", fontSize: "1.5vw" }}>
                                                            {this.props.location.state}
                                                        </span> :
                                                        <span style={{ color: "#5F6368", fontSize: "1.5vw" }}>
                                                            {"FundooNotes"}</span>)
                                                //     : (
                                                // <span style={{ color: "#5F6368", fontSize: "1.5vw" }}>
                                                //     {this.props.location.state}</span>)
                                            }

                                        </p>
                                    </div>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <div className="dashboard-card-div" style={{
                                            backgroundColor:
                                                this.state.bgClr
                                        }}>
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
                                </div>
                                <div className="dashboard-refresh">
                                    <ShoppingCartIcon onClick={this.handleShoppingIcon} />
                                    <Tooltip title="Refresh">
                                        <RefreshIcon onClick={this.handleReload} style={{ cursor: "pointer" }}
                                        // style={{
                                        //     transform: (this.state.refresh) ? " rotate(360deg)" : (null),
                                        //     transition: (this.props.menu) ? ("5s") : (null)
                                        // }} 
                                        />
                                    </Tooltip>
                                    {this.state.view ? (
                                        <Tooltip title="GridView">
                                            <AppsOutlinedIcon onClick={this.handleGridView}
                                                style={{ cursor: "pointer" }} />
                                        </Tooltip>
                                    ) : (
                                            <Tooltip title="ListView">
                                                <DnsOutlinedIcon onClick={this.handleListView}
                                                    style={{ cursor: "pointer" }} />
                                            </Tooltip>
                                        )}
                                    <ProfilePicComponent />
                                </div>
                            </Toolbar>
                        </div>
                    </AppBar>
                </MuiThemeProvider>

            </div>
        )
    }
}
export default withRouter(DashboardComponent)