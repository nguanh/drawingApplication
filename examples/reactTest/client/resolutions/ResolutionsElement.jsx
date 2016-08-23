import React,{Component, PropTypes} from 'react';

/*
Klasse definiert ein Element in der To Do Liste als Listenelement
Zusätzlich besitzt es als tag das Attribut "Eigenschaft"
Dieses nimmt ein Collection Objekt entgegen und kann den Text und bool ausgeben
*/

// defines task Component for a single to do item
//takes property task and reads text and ID from it
export default class Task extends Component{
  toggleChecked(){
    Meteor.call('toggleResolution', this.props.taski._id, this.props.taski.checked);
  }
  deleteEntry(){
    Meteor.call('deleteResolution', this.props.taski._id);
  }

  render(){
    // we can add classes depending on the state of the entry
    const resolutionsClass = this.props.taski.checked ? "checked": "";
    // as well as html
    const status = this.props.taski.checked ? <span className="completed"> Beendet</span> : "";
    // Checkbox is readonly, so the status is set by the system not by the user direct
    return(
      <li className ={resolutionsClass}>
        <input type="checkbox" readOnly={true}
          checked={this.props.taski.checked}
          onClick={this.toggleChecked.bind(this)} />
        {this.props.taski.text}

        <button className="btn-cancel" onClick={this.deleteEntry.bind(this)} >
          &times;
        </button>
        {status}
      </li>
    );
  }
}
// makes property mandatory
Task.propTypes = {
  task: PropTypes.object.isRequired,
};
