/******************************************************************************
* @Purpose : Fundoo
* @file : App.js
* @overview :
* @author : BISATI SAI VENKATA VIKAS
* @version : v8.15.0
* @since : 26/09/2019
******************************************************************************/
import React from 'react';
//React Router Dom contains Router Route and switch
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/login';
import './App.css';
import './App.scss';
import Register from './pages/register';
import Forgot from './pages/forgotPassword';
import DashBoard from '../src/pages/dashboard';
import CreateNotes from '../src/pages/createNotes';
import GetAllNotesPage from '../src/pages/getAllNotes'
//App class extends React.Component this can also be done by React.CreatClass this also serves the same functionality
//Here in react component is nothing but a class
import ServiceCard from './pages/serviceCard'
import Card from '../src/components/card'
import ColorPaletteComponent from './components/colorPaletteComponent';
import EditComponent from '../src/pages/edit';
import GetArchiveComponent from '../src/pages/getArchive';
import GetDeletedComponent from '../src/pages/getDeleted';
import GetReminders from './pages/getAllReminder';
import WysiwygPage from './pages/wysiwyg';
import DisplayLabel from './pages/displayLabel'
import ShoppingCartPage from './pages/shopping'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/forgotPassword" component={Forgot}></Route>
          <Route path="/" exact component={ServiceCard}></Route>
          <Route path="/serviceCard" component={ServiceCard}></Route>
          <Route path="/dashboard" component={DashBoard}></Route>
          <Route path="/create" component={CreateNotes}></Route>
          <Route path="/getAll" component={GetAllNotesPage}></Route>
          <Route path="/color" component={ColorPaletteComponent}></Route>
          <Route path="/card" component={Card}></Route>
          <Route path="/edit" component={EditComponent}></Route>
          <Route path="/getArchive" component={GetArchiveComponent}></Route>
          <Route path="/getTrash" component={GetDeletedComponent}></Route>
          <Route path="/getReminders" component={GetReminders}></Route>
          <Route path="/shoppingCart" component={ShoppingCartPage}></Route>
          <Route path="/quesAns/:id" component={WysiwygPage}></Route>
          <Route path="/dispLabel/:label" component={DisplayLabel}></Route>
        </Switch>
      </Router>
    );
  }
}
export default App;