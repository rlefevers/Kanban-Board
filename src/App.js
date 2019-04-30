import React, { Component } from 'react';
import Naved from './components/nav';
import Home from './Home';
import Board from './components/board';
import Projects from './components/projects';
import firebase from './fire.js';
import './components/styles/syles.css';
import './App.css';
import SignUp from "./SignUp";
import LogIn from "./Login/index";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {

    state = { loading: true, authenticated: false, currentUser: null};

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: true,
                    loading: false
                });
            } else {
                this.setState( {
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }

    render() {
        // eslint-disable-next-line
        const { authenticated, loading, currentUser } = this.state;

        if  (loading) {
            return <p>Loading..</p>;
        }

        return (

            <Router>
                <div className="App">
                    <Naved />
                    <PrivateRoute exact path="/" component={Home} authenticated={authenticated}/>
                    <Route exact path="/login" component={(LogIn)}/>
                    <Route exact path="/signup" component={(SignUp)}/>
                    <PrivateRoute path='/projects' component={Projects} authenticated={authenticated}/>
                    <PrivateRoute path='/board' component={Board} authenticated={authenticated}/>
                    <PrivateRoute path='/board/:id' component={Board} authenticated={authenticated}/>
                </div>
            </Router>
        );
    }
}

export default App;
