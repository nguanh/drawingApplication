import { Template } from 'meteor/templating'; // weil wir template verwenden
import { Tasks } from '../api/tasks.js'; // weil wir auf die coll. zugreifen
import './task.html'; // inhalte werden in das html template geschrieben


Template.task.events({
  'click .toggle-checked123'() { // wenn wir auf checkbox klicken mit klasse toggle-checked
    // Set the checked property to the opposite of its current value
    //this  = task objekt
    //_id   = id eines eingefügten elements in Collection
    Tasks.update(this._id, {
      $set: { checked: ! this.checked }, // toggle check
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
});
