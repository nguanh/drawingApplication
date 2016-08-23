
import { Template } from 'meteor/templating';
// importiere den exportieren tasks
import { Tasks } from '../api/tasks.js';

// use html file
import './body.html';
import './task.js';

/*
Helper mit Namen tasks, dieser enthält einen array

*/
// statischer inhalt
/*

Template.body.helpers({

  tasks: [

    { text: 'This is task 1' },

    { text: 'This is task 2' },

    { text: 'This is task 3' },
    { text: 'Bla'}

  ],

});*/

// Enthält alles, was wir in unserer Collection ablegen

Template.body.helpers({
tasks(){
  return Tasks.find();
}
  });



  Template.body.events({
    //new task is form name, submit is the event that happens
'submit .new-task'(event){
  event.preventDefault();
  //read value of input type
const target = event.target;
const text = target.text.value;
// Füge Json in Tasks Collection ein
// bestehend aus dem eingefügten Text und dem Datum
// Datum wird in variable created at gespeichert
Tasks.insert({text,createdAt: new Date()});

// Lösche Feld Inhalt
target.text.value= '';

} ,

// nächstes kann hier definiert werden

    });
