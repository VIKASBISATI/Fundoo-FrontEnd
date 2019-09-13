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
import Login from './pages/login';
import './App.css';
import Register from './pages/register';
import Forgot from './pages/fogotPassword'
//App class extends React.Component this can also be done by React.CreatClass this also serves the same functionality
//Here in react component is nothing but a class
import ServiceCard from './pages/serviceCard'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/forgotPassword" component={Forgot}></Route>
        {/* <Route path="/card" component={CardComponent}></Route> */}
        <Route path="/" exact component={ServiceCard}></Route>
        <Route path="/serviceCard" component={ServiceCard}></Route>
      </Router>
    );
  }
}
export default App;