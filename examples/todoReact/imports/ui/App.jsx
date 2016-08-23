import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
//import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tasks} from '../api/tasks.js';

import Task from './Task.jsx';
//export default class App extends TrackerReact(Component){
export default class App extends Component{
  // Function returns array
  //json array containing id and text of a task
  getTasks(){
    return[
      {_id:1 ,text: 'This is task 1'},
      {_id:2 ,text: 'This is task 2'},
      {_id:3 ,text: 'This is task 3'},
    ];
  }

  handleSubmit(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Tasks.insert({
      text, createdAt: new Date(),
    });
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }
//Using Map and arrow function to loop through all tasks
// returned by gettask and putting them into the
//Task Component
// For every Task is a key for identification
// and the property task, which takes a task
  renderTasks(){
/*
    return this.getTasks().map((task)=>(
      <Task key={task._id} task={task} />
    ));*/

    return this.props.tasks.map((task)=>(
              <Task key={task._id} task={task} />
    ));
  }

// render html part and put in content from rendertask
  render(){
    return (
      <div className="container">
        <header>
          <h1>TODO list</h1>
          <form className="new-Task" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="textInput" placeholder="Type to add Tasks"/>
          </form>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}


App.propTypes ={
  tasks: PropTypes.array.isRequired,
};


// Wrapper that updatees App for every change in the Collection
export default createContainer(()=>{
    return{
      tasks: Tasks.find().fetch(),
    };
  },App);
