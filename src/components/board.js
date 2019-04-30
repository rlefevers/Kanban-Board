import React, { Component } from 'react';
import './styles/bootstrap.css';
import './styles/bootstrap-grid.css';
import './styles/bootstrap-reboot.css';
import './styles/syles.css';
import './js/dnd.js';
import Images from './images';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from "../fire";
import './styles/syles.css';
import styled from 'styled-components';


class Board extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users');
        this.ref = firebase.firestore().collection('project1');
        this.state = {
            users: [],
            project1: [],
            name: {},
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

        const updateRef = firebase.firestore().collection('project1').doc(this.state.key);
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
        const ref = firebase.firestore().collection('project1').doc(this.props.match.params.id);

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
        const project1 = [];
        querySnapshot.forEach((doc) => {
            const { name, price, stock, image } = doc.data();
            project1.push({
                key: doc.id,
                doc, // DocumentSnapshot
                name,

            });
        });

        this.setState({
            project1
        });
    };

    delete(id){
        firebase.firestore().collection('ShopItems').doc(id).delete().then(() => {
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
            <div>
                <div className="container-fluid">
                    <div className="row project-head">
                        <div className="p-title nav-text"><span className="project">Collection: </span> Procrastinate
                        </div>
                    </div>
                    <div className="margin-help">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body card-body-height" id="div1" onDrop="drop(event)"
                                         onDragOver="allowDrop(event)">
                                        <h5 className="card-title">To Do: Avoid Making a To-Do List (2)<img className="tools plus pointer" src={Images.plus}/></h5>
                                        <div className="underline"></div>

                                        <div className="col list-item pointer" onClick={this.toggle}
                                             draggable="true" onDragStart="drag(event)" id="drag1">

                                            <div className="col">
                                                <div className="list-title">
                                                    Avoid Listing Tasks
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="list-description">
                                                    I'll do this tomorrow
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Start: </span> 05/05/2020
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Due: </span> 05/05/2020
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacing"></div>
                                        <div className="col list-item pointer" onClick={this.toggle}
                                             draggable="true" onDragStart="drag(event)" id="drag2">

                                            <div className="col">
                                                <div className="list-title">
                                                    Avoid Creating Deadlines
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="list-description">
                                                    One more episode
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Start: </span> 05/05/2020
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Due: </span> 05/05/2020
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body card-body-height" id="div2" onDrop="drop(event)"
                                         onDragOver="allowDrop(event)">
                                        <h5 className="card-title">In Progress: Avoid Assigned Tasks (1)<img className="tools plus pointer" src={Images.plus}/></h5>
                                        <div className="underline"></div>
                                        <div className="col list-item pointer" onClick={this.toggle}
                                             draggable="true" onDragStart="drag(event)" id="drag3">

                                            <div className="col">
                                                <div className="list-title">
                                                    Refuse to acknowledge todo list
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="list-description">
                                                    I don't wanna do this right now
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Start: </span> 05/05/2020
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Due: </span> 05/05/2020
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacing"></div>



                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body card-body-height" onDrop="drop(event)"
                                         onDragOver="allowDrop(event)">
                                        <h5 className="card-title">Complete: Panic (2)<img className="tools plus pointer" src={Images.plus}/></h5>
                                        <div className="underline"></div>
                                        <div className="col list-item pointer" onClick={this.toggle}
                                             draggable="true" onDragStart="drag(event)" id="drag4">

                                            <div className="col">
                                                <div className="list-title">
                                                    Assume fetal posistion
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="list-description">
                                                    Should've started this a week ago
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Start: </span> 05/05/2020
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Due: </span> 05/05/2020
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacing"></div>
                                        <div className="col list-item" onClick={this.toggle}
                                             draggable="true" onDragStart="drag(event)" id="drag6">

                                            <div className="col">
                                                <div className="list-title pointer">
                                                    Fake illness
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="list-description">
                                                    *Cough*Sorry boss...*Cough*
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Start: </span> 05/05/2020
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="list-date">
                                                        <span className="date">Due: </span> 05/05/2020
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        );
    }
}

export default Board;
