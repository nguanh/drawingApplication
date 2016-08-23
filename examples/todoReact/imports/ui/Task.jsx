import React, {Component, PropTypes} from 'react';

// defines task Component for a single to do item
//takes property task and reads text and ID from it
export default class Task extends Component{
  render(){
    return(
      <li>{this.props.task.text} ID:
      {this.props.task._id}</li>
    );
  }
}
// makes property mandatory
Task.propTypes = {
  task: PropTypes.object.isRequired,
};
