import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ResolutionsForm from './ResolutionsForm.jsx';
import Task from './ResolutionsElement.jsx';
//import ResolutionCol from './server/publish.js';
// Collection speichert alle Todos

// wird nochmal auf server seite deklariert
ResolutionCol = new Mongo.Collection("rescol");

export default class ResolutionsMain extends TrackerReact(React.Component){

  resolutions(){ // return collection query  und das als objekt, durch fetch()
    return ResolutionCol.find().fetch();

  }

  // returns task list
renderTasks(){
  return this.resolutions().map((task)=>(
    <Task  key={task._id} taski={task} />
  ));
}

  render(){
  //  let res = this.resolutions();
/*
    if(res.length < 1){ // hack
      return(<div>Temporary loading</div>)
    }*/
    return(

      <div>
        <h1>TODO LIST</h1>
        <ResolutionsForm />
        <ul className="resolutions">
          {this.renderTasks()}

        </ul>
      </div>
    )
  }
}
//        /*  <Task  taski={res[0]} />*/
// Componente Resolutionsform kann einfach als Html tag hinzugefügt werden
/*bei onsubmit rufen wir die addResolution funktion in der gleichen klasse aus, daher this
wir übergeben das Formular mittels bind(this)*/
