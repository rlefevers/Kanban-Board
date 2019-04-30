import React, { Component } from 'react';
import Images from './images';
import firebase from "../fire";
import {NavLink as RRNavLink} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import './styles/syles.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';


class Projects extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('project1tasks');
        this.state = {
            project1tasks: [],
            name: '',
            key: '',
        }
    };


    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({item:state});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { name,  } = this.state;

        const updateRef = firebase.firestore().collection('project1tasks').doc(this.state.key);
        updateRef.set({
            name,



        }).then((itemRef) => {
            this.setState({
                key: '',
                name: '',

            });
            this.props.history.push("/show/"+this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('project1tasks').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    item: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });



        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

    }

    onCollectionUpdate = (querySnapshot) => {
        const project1tasks = [];
        querySnapshot.forEach((doc) => {
            const { name, } = doc.data();
            project1tasks.push({
                key: doc.id,
                doc, // DocumentSnapshot
                name,

            });
        });

        this.setState({
            project1tasks
        });
    };

    delete(id){
        firebase.firestore().collection('project1tasks').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {

        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Projects - Looks like you should get started...
                        </h3>
                    </div>
                    <div className="panel-body">
                        <table className="table table-stripe">
                            <tbody>
                            {this.state.project1tasks.map(item =>
                                <tr>
                                    <td>{item.name}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;
