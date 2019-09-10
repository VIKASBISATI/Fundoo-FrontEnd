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
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/login';
import CardComponent from './components/card';
import './App.css';
//App class extends React.Component this can also be done by React.CreatClass this also serves the same functionality
//Here in react component is nothing but a class
class App extends React.Component { 
  render() {
    return (
      <div>
        <Router>
          <Route path="/login" component={Login}></Route>
          <Route path="/card" component={CardComponent}></Route>
          <Route path="/" exact component={CardComponent}></Route>
        </Router>
      </div>
    );
  }
}
export default App;