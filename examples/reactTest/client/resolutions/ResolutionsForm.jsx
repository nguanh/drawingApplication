import React, {Component} from 'react';

// Tracker rect nicht benötigt, weil keine Daten aus Collection gelesen weren
export default class ResolutionsForm extends Component{

  addResolution(event){ // wir können innerhalb der komponente eigene Funktionien definieren
    event.preventDefault(); // verhindert, dass bei jedem submit seite neu geladen wird
    // add value to Collection
    let text = this.refs.resolution.value.trim();
    // Call Server Function safely and passs parameter text
    // Add callback arrow funktion to clear textfield.
    // has to be Arrow as they also send the right context other than function()
    Meteor.call('addResolutionEntry',text,()=>{
      this.refs.resolution.value="";
    });

  }


  render(){
    return(
      <form className="newResolutions" onSubmit={ this.addResolution.bind(this)}>
        <input type="text" ref="resolution" placeholder="bla" />
      </form>
    )

  }


}
