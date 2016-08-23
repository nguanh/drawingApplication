import React,{Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DrawingBoard from './DrawingBoard/DrawingBoard.jsx';
import Frames from './Frames/Frames.jsx';
import Tools from './Tools/Tools.jsx';


//Local caches
ObjectCollection = new Mongo.Collection("objects");
FrameCollection = new Mongo.Collection("frames");

/*
Main Component, responsible for getting Backend data
can react to changes in meteor backend via TrackerReact
*/
export default class App extends TrackerReact(Component){

  constructor() {
    super();

    this.state = {
      styledata:{}, // style object provided by Tools Component
      selectedstyle:{}, // style object of current selected shape in DrawingBoard
      subscription:{
        allobjects: Meteor.subscribe("allShapeObjects"),
        userframes: Meteor.subscribe("userFrames"),
        contributorframes: Meteor.subscribe("contributorFrames"),
      },
      selectedframe: null, // currently active frame from Frames
    };
  }

/******************************************************************************
                            Meteor backend communication
******************************************************************************/

  // display shapes only from current selected frame  
  getObjectData(){
    return (ObjectCollection.find({frameId: this.state.selectedframe}).fetch());
  }
  getUserFrameData(){
    return (FrameCollection.find().fetch());
  }
  // Stop subscription on logout
  componentWillUnmount(){
    this.state.subscription.allobjects.stop();
    this.state.subscription.userframes.stop();
    this.state.subscription.contributorframes.stop();
  }

  /******************************************************************************
                              Component callback functions
  ******************************************************************************/
  getSelectedStyle(values){
    this.setState({
      selectedstyle: values,
    });
  }
  getFormData(values){
   //Meteor.call("removeAll");
    this.setState({
       styledata: values,
     });
  }

  getSelectedFrame(id){
    this.setState({
       selectedframe: id,
     });
  }
  /******************************************************************************
                              Render functions
  ******************************************************************************/

  // If user is logged in but has no frame available
  renderDrawingComponents(){
    if(this.getUserFrameData().length === 0){
      return(
        <div  className="alternate-tools">
        Please create a new frame first
        </div>
      );
    }
    // if available, render DrawingBoard and Tools
      return(
        <div>
          <Tools
            data={this.getFormData.bind(this)}
            selectedstyle={this.state.selectedstyle}
             />
            <DrawingBoard
              data={this.getObjectData()}
              styledata={this.state.styledata}
              selectedstyle= {this.getSelectedStyle.bind(this)}
              currentFrame= {this.state.selectedframe}
               />
        </div>

      );
  }

// Main render function
  render(){
    // Display Splashscreen until connection with Backend is established
    if (!this.state.subscription.userframes.ready()) return(
      <div className="jumbotron">
        <div className="container text-center">
          <h1>Please wait! Loading...</h1>
        </div>
      </div>
    );
  // Display Splashscreen for users without login
    if(Meteor.userId() === null) return(
      <div className="jumbotron">
        <div className="container text-center">
          <h1>Please login first</h1>
          <p>Then you will be able to draw</p>
        </div>
      </div>
    );

    return(
    <div className="main-container">
            {this.renderDrawingComponents()}

         <Frames
            data={this.getUserFrameData()}
            selection={this.getSelectedFrame.bind(this)}
          />
    </div>
    );
  }

}
