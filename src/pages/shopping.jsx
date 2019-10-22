import React, { Component } from "react";
import ShoppingComponent from "../components/shoppingCart";
import DashBoardComponent from '../components/dashboardComponent';
class ShoppingCartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            list: false,
            menu: false,

        }
        this.newNote = React.createRef()
    }

    searchBar = (searchText) => {
        console.log('search text in dash', searchText);
        this.setState({
            searchText: searchText
        })
    }
    display = (upCard) => {
        console.log('upcard', upCard);
        this.newNote.current.updatedCard(upCard)
    }
    listView = (value) => {
        this.setState({
            list: value
        })
    }
    menuGet = (menu) => {
        this.setState({
            menu: menu
        })
    }
    render() {
        console.log("props in shopping ",this.props);
        
        return (
            <div >
                <DashBoardComponent props={this.props}
                    searchBar={this.searchBar}
                    menuGet={this.menuGet}
                    listView={this.listView} />
                <div className="get-archive">
                    <ShoppingComponent props={this.props}
                        ref={this.newNote}
                        searchText={this.state.searchText}
                        list={this.state.list}
                        menu={this.state.menu} />
                </div>

            </div>);
    }
}
export default ShoppingCartPage;