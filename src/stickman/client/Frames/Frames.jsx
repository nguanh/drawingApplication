import React,{Component, PropTypes} from 'react';
import SingleFrame from './SingleFrame';

/*
Component for storing frames and adding new frames
*/
export default class Frames extends Component{
  drawFrames(){
    return this.props.data.map((frame) => (
      <SingleFrame
        key={frame._id}
        frame={frame} // frame data from backend
        selected = {this.frameSelected.bind(this)} //callback function to select this frame
        next = {this.getNextFrame.bind(this)} //callback function to select first frame
        stylename = { // style to highlight frame if selected
          Session.get("currentSelectedFrame")==frame._id?"panel panel-info":
          "panel panel-primary"}

        />
    ));
  }


// set first frame as selected by default
  componentDidMount(){
    Session.set("currentSelectedFrame",null);
    if(this.props.data.length> 0){
      this.frameSelected(this.props.data[0]._id);
    }
  }

  componentWillUpdate(nextProps){
    if(nextProps.data.length== 1){
      this.frameSelected(nextProps.data[0]._id);
    }
  }


  // select first frame
  getNextFrame(id){
      //get index of id in data
      //only if delete frame is currently selected
      if(Session.get("currentSelectedFrame")!== id) return;
      if(this.props.data.length ===0){
        Session.set("currentSelectedFrame",null);
        console.log("no frame available");
        return; // no frame available
      }
        // select first frame
        this.frameSelected(this.props.data[0]._id);
  }


  createFrame(event){
    let regex = /^([a-zA-Z0-9-\s_-]){3,16}$/;
    bootbox.prompt("Please enter a name for the frame", (result)=> {
      if (regex.test(result)) {
        Meteor.call("insertFrame",result,(err,id)=>{
          //select newly created frame
          this.frameSelected(id);
        });
      }
      else{
        bootbox.alert("Invalid Input! Name must have 3 and 16 alphanumeric characters");
      }
});

  }
  // select frame
  frameSelected(id){
      //only update if status changes
       if(Session.get("currentSelectedFrame")!=id){
         Session.set("currentSelectedFrame",id);
          //forward to App component
         this.props.selection(id);
       }
  }

  render(){
    return(
      <div className="Frames-main">
        <div id="frame-container" className="container">
          {this.drawFrames()}
        </div>
          <button  type="button" ref="createbutton"
                   className="btn btn-primary btn-lg"
                   onClick={this.createFrame.bind(this)} >+</button>


      </div>
    );
  }
}

Frames.propTypes = {
  selection: React.PropTypes.func,
};
