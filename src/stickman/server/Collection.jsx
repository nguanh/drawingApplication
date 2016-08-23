import { check } from 'meteor/check';

ObjectCollection = new Mongo.Collection("objects");
FrameCollection = new Mongo.Collection("frames");



/*******************************************************************************
                          Publish functions
*******************************************************************************/
Meteor.publish("allShapeObjects", function(){

  this.onStop(()=>{
    // if user leaves page, all selected objects are available for selection
    if(this.userId!== null){
          let selection= ObjectCollection.find({selected: this.userId}).fetch();
          for(i = 0; i< selection.length; i++){
              Meteor.call("setObjectDeselected", "XX"+ selection[i]._id);
          }
    }

  });
  return ObjectCollection.find();

});

// all frames owned by user
Meteor.publish("userFrames",function(){
  return FrameCollection.find({owner: this.userId});
});
// all frames where user is contributing
Meteor.publish("contributorFrames",function(){
  return FrameCollection.find({contributor: this.userId});
});

/*******************************************************************************
                          METEOR METHODS
*******************************************************************************/


Meteor.methods({

  /*******************************************************************************
                            FRAME METHODS
  *******************************************************************************/
insertFrame(name){
  check(name,String);
  if(!Meteor.userId()) throw new Meteor.error("not-authorized");


  return FrameCollection.insert(
      {
          owner: Meteor.userId(), // creator of the frame
          //ownerEmail:Meteor.user().emails[0].address,
          ownerEmail: Meteor.user().services.google.email,
          name:  name,
          contributor:0,      // userId of people who are allowed to access
          contributorEmail:null,      // userId of people who are allowed to access
          previousFrame: 0,   //unused
      }
    );
},

// if frame has contributor, the contributor is the new owner
// otherwise delete frame
removeFrame(id){
  check(id,String);
  if(!Meteor.userId())throw new Meteor.error("not-authorized");


  let frame            = FrameCollection.find({_id: id}).fetch();
  let owner            = frame[0].owner;
  let contributor      = frame[0].contributor;
  let contributorEmail = frame[0].contributorEmail;
  if(owner != Meteor.userId()) return false;
  //If there is no contributor, delete frame
  if(contributor === 0){
      //remove all related shapes as well
    ObjectCollection.remove({frameId: id});
    FrameCollection.remove(id);
    return true;
  }

  //Otherwise make contributor the new owner
  FrameCollection.update(id,{
      $set: {
              owner: contributor,
              ownerEmail: contributorEmail,
              contributor: 0,
              contributorEmail: null,
            }
    });
    return true;
},

  removeContributor(contributorId,frameId){
    FrameCollection.update(frameId,{
        $set: {
                contributor: 0,
                contributorEmail: null,
              }
      });
  },
/*******************************************************************************
                          USER METHODS
*******************************************************************************/
addUsertoFrame(email,frameId){
  //let ownerEmail =Meteor.user().emails[0].address;
  let ownerEmail = Meteor.user().services.google.email;

  //prevent user from adding own email
  if(ownerEmail == email) return false;
  //check for valid user
//  let contributor = Accounts.findUserByEmail(email);
  let contributor = Meteor.users.find( {"services.google.email": email}).fetch()[0];
  if(!contributor) return false;
  //only allow one collaborateur
  if(FrameCollection.findOne({_id: frameId}).contributor !==0) return;
    //add user to frame
  FrameCollection.update(frameId,{
      $set: {
              contributor: contributor._id,
              contributorEmail: email,
            }
    });

  return true;

},
/*******************************************************************************
                          SHAPE METHODS
*******************************************************************************/

setObjectSelected(id){
  check(id,String);
  if(!Meteor.userId())throw new Meteor.error("not-authorized");

  let realID = id.slice(2);
  let shape = ObjectCollection.findOne({_id:realID});
  //Object is already selected by someone else
  if(shape.selected !==null) return false;

  ObjectCollection.update(realID,{
      $set: {
              selected: Meteor.userId(),
            }
    });
   return true;

},
setObjectDeselected(id){
  if(id===null) return;

  let realID = id.slice(2);
  ObjectCollection.update(realID,{
      $set: {selected: null }
    });

},

/*
frameId:      frame the object belongs to
objType:      specifies the svg tag
coordinates:  provide all data to draw object (x,y,width,height)
style:        any data related to the style of the object
text:         text for <text> elements
*/
insertObject (frameId,objType,coordinates,style,text=null){
  //typechecking
   check(frameId, String);
   check(objType,String);
   check(coordinates,Object);
   check(style,Object);
   if(!Meteor.userId())  throw new Meteor.error("not-authorized");

   return ObjectCollection.insert(
      {
        frameId     : frameId,
        objType     : objType,
        coordinates : coordinates,
        style       : style,
        creator     : Meteor.userId(),
        selected    : null,
        text        : text,
      }

  );
},

updateObjectStyle(id,style){
  check(id, String);
  check(style,Object);
  if(!Meteor.userId())throw new Meteor.error("not-authorized");

  let realID = id.slice(2);
  ObjectCollection.update(realID,{
      $set: {
              style       : style,
            }
    });
},

updateObjectCoordinates(id,coordinates){
   check(id, String);
   check(coordinates,Object);
   if(!Meteor.userId())throw new Meteor.error("not-authorized");

   let realID = id.slice(2);
    ObjectCollection.update(realID,{
      $set: {
              coordinates : coordinates,
            }
    });
},

removeObject(id){
  check(id, String);
  if(!Meteor.userId())throw new Meteor.error("not-authorized");

  let realID = id.slice(2);
  ObjectCollection.remove(realID);
},

//TEST method
removeAll(){
    ObjectCollection.remove({});
  },
});
