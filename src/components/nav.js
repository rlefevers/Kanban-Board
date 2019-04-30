import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './styles/bootstrap.css';
import './styles/bootstrap-grid.css';
import './styles/bootstrap-reboot.css';
import './styles/syles.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem

} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import firebase from "../fire";


class Naved extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }

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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    signOutUser = ()=> firebase.auth().signOut().then(function () {
        console.log("Logged Out");
    });

    render() {


        let isLoggedIn = firebase.auth().currentUser;


        return (
            <div>
                <div>

                </div>



                <Navbar color="light" light expand="sm">
                    <NavbarBrand href="/">Lately</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar >
                            {isLoggedIn ? [
                                <NavItem className="navItem"><NavLink tag={RRNavLink} className="nav-link" to="/" activeClassName="active" exact path="/">Home</NavLink>
                                </NavItem>,
                                <NavItem className="navItem">
                                    <NavLink tag={RRNavLink} className="nav-link" to="/projects" activeClassName="projects">Projects</NavLink>
                                </NavItem>,
                                <NavItem className="navItem">
                                    <NavLink tag={RRNavLink} className="nav-link" to="/board" activeClassName="board">Board</NavLink>
                                </NavItem>,
                                <NavItem className="navItem">
                                    <NavLink tag={RRNavLink} className="nav-link" to="/" activeClassName="active">Log Out</NavLink>
                                </NavItem>

                            ] : [
                                <NavItem className="navItem">
                                    <NavLink tag={RRNavLink} className="nav-link" to="/">Log In</NavLink>
                                </NavItem>,
                                <NavItem className="navItem">
                                    <NavLink tag={RRNavLink} className="nav-link" to="/signup">Sign Up</NavLink>
                                </NavItem>
                            ]}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Naved;
