import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './layouts/MainLayout.jsx';
import ResolutionsMain from './resolutions/ResolutionsMain.jsx';
FlowRouter.route('/',{  // Kadira flow router
  action(){
        mount( // mounte die Layout Funktion mit dem Inhalt aus App
            MainLayout,{
              contento: (<ResolutionsMain />)
            })

  }
});
