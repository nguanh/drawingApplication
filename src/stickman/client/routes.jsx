import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './layouts/MainLayout.jsx';
import App from './App.jsx';


//Router for main page
FlowRouter.route('/',{  // Kadira flow router
  action(){
        mount( // mount Mainlayout with content from AppComponent
            MainLayout,{
              content: (<App />)
            })

  }
});
