import React, { Component } from 'react';
import firebase from './fire';
import Images from './components/images';
import {Button} from 'reactstrap';


class Home extends Component {

    signOutUser = ()=> firebase.auth().signOut().then(function () {
        console.log("Logged Out");
    });

    render() {
        let user = firebase.auth().currentUser;

        return (
            <div>
                <h1>
                    Lately
                    <div><h1></h1></div>
                </h1>
                <div></div>
                <Button onClick={this.signOutUser}>Sign Out</Button>
            </div>
        )
    }
};

export default Home;
