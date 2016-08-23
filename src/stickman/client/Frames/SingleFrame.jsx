import React,{Component, PropTypes} from 'react';


export default class SingleFrame extends Component{


  componentWillUnmount(){
      // select new frame when current frame is about to be deleted
      this.props.next(this.props.frame._id);
  }

  deleteFrame() {
    if(this.props.frame.owner !=Meteor.userId()) return;
    bootbox.confirm("Are you sure?",(result)=>{
      if(result){
        Meteor.call("removeFrame",this.props.frame._id);
      }
    });

  }
 // display content from frame
  displayFrame(){
    this.props.selected(this.props.frame._id);
  }

  inviteUser(){
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    bootbox.prompt("Please enter the Email of the user to add", (result)=> {
      if (regex.test(result)) {
        Meteor.call("addUsertoFrame",result,this.props.frame._id,(err,success)=>{
                if(success){
                  bootbox.alert("Successfully added "+ result);
                }else {
                  bootbox.alert("User could not be added");
                }
        });
      }
      else{
        bootbox.alert("Invalid Email Address");
      }
  });
}


// render invite and delete button, only visible for owner
renderOptions(){
  if(this.props.frame.owner ==Meteor.userId()){
      return(
        <div id="single-frame-header" className="btn-group">
        <button className="btn btn-danger btn-md" onClick={this.deleteFrame.bind(this)} >
                 &times;
        </button>
        <button className="btn btn-info btn-md" onClick={this.inviteUser.bind(this)} >
           invite
        </button>
      </div>
      );
  }else {
    return(
      <div id="single-frame-header">Participate</div>
    );
  }
}


deleteContributor(){
  bootbox.confirm("Are you sure you want to remove " +
                  this.props.frame.contributorEmail +
                  " from "+ this.props.frame.name+ " ?",(result)=>{
                  if (result) {
                      Meteor.call("removeContributor",
                                  this.props.frame.contributor,
                                  this.props.frame._id);
                  }
                  });
}


renderContributor(){
  if(this.props.frame.contributor !== 0){
    return(
        <li  id="list-item-contributor" className="list-group-item">
          <span className="badge" onClick={this.deleteContributor.bind(this)} >&times;</span>

          {Meteor.userId()== this.props.frame.owner?
                             this.props.frame.contributorEmail:
                             this.props.frame.ownerEmail}
        </li>
      );
  }else {
    return(
      <div id="list-item-contributor">{this.props.frame.contributorEmail}</div>
    );
  }
}


  render(){
    return(
      <div  id="single-frame" className={this.props.stylename}>
        <div className="panel-heading" onClick={this.displayFrame.bind(this)}>
            {this.renderOptions()}
            <div className="panel-heading-name">{this.props.frame.name}</div>
        </div>
        <div id="single-frame-content" className="panel-body" >
          <ul className="list-group">
              {this.renderContributor()}
          </ul>
       </div>

      </div>
    );

  }
}

SingleFrame.propTypes = {
  selected: React.PropTypes.func,
  next: React.PropTypes.func,
};
