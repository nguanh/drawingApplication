
// all methods are executed on the server
// allows more safety

Meteor.methods({

  addResolutionEntry(text){
    ResolutionCol.insert({ // define own entries for record
        text: text,
        date : new Date(),
        checked: false,
        bla:  "",
    });

  },
  toggleResolution(id,status){
    ResolutionCol.update(id,{
      $set:{ checked: !status }
    });
  },

  deleteResolution(id){
    ResolutionCol.remove(id);
  }


});
