import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import App from '../imports/ui/App.jsx';

// render content of App Component in body tag with render-target ID
Meteor.startup(()=>{
render(<App />,document.getElementById("render-target"));

});
