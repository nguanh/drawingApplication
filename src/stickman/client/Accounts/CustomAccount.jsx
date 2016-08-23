import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/*
Implementation for CUstom Login UI
unused

*/
export default class CustomAccount extends Component {
  constructor() {
    super();

    this.state = {
      status: "none",
    };
  }


componentDidMount(){
}

formLogin(event){

 event.preventDefault();


 //login if no UserId defined
 if(Meteor.userId()=== null){
   let email = this.refs.email.value;
   let password = this.refs.password.value;
   Meteor.loginWithPassword(email, password, (err)=>{
     if (err){}
     else{
       this.hideSignIn();
       this.setState({
          status: "loggedin",
        });
     }
     // The user has been logged in.
   });
  }else {
    console.log("Already logged in");
  }
}



formRegister(event){
    event.preventDefault();
    if(Meteor.userId()!== null){
      console.log("Cannot create new Account, when logged in");
      return;
    }


    let email = this.refs.emailcreate.value;
    let password = this.refs.passwordcreate.value;

    //TODO evaluate email and password
    Accounts.createUser({email: email, password : password}, (err)=>{
         if (err) {
         } else {
          this.hideCreate();
          this.setState({
             status: "accountcreated",
           });
         }

    });

}

formLogout(event){
event.preventDefault();
  if(Meteor.userId()!== null){

      Meteor.logout(()=>{
        this.hideSignOut();
        this.setState({
           status: "loggedout",
         });

        this.removeAllObjects();
      });
  }

}

removeAllObjects(){
  d3.select("svg").html("");
}




start(){


  if(Meteor.userId()=== null){
    return(
      <a href="" onClick={this.showSignIn.bind(this)}>Sign in</a>
    );
  }else {
    return(
      <a href="" onClick={this.showSignOut.bind(this)}>
        Welcome!</a>
    );
    //TODO Display Email
  }
}

showSignIn(){
  ReactDOM.findDOMNode(this.refs.signinform).style.display="inline";
}

hideSignIn(){
  ReactDOM.findDOMNode(this.refs.signinform).style.display="none";
}

showSignOut(){
  ReactDOM.findDOMNode(this.refs.signoutform).style.display="inline";
}

hideSignOut(){
  ReactDOM.findDOMNode(this.refs.signoutform).style.display="none";
}

showCreate(){
  ReactDOM.findDOMNode(this.refs.createform).style.display="inline";
}

hideCreate(){
  ReactDOM.findDOMNode(this.refs.createform).style.display="none";
}

toggleCreate(){
  this.hideSignIn();
  this.showCreate();
}
toggleSignIn(){
  this.hideCreate();
  this.showSignIn();
}




render(){
  return(
    <div>
      {this.start()}


      <div  ref="signinform" className="sign-in-form">
        <a href="" onClick={this.hideSignIn.bind(this)}> Close</a>
        <form ref="login-form" onSubmit={this.formLogin.bind(this)}>
            <div>
              Email:    <input type="email"  ref="email" id="login-email" />
              Password: <input type="password" ref="password" id="login-password" />
           </div>
              <input type="submit" id="login-button" value="Sign in" />
              <a href="" onClick={this.toggleCreate.bind(this)}> Create Account</a>

       </form>

    </div>


  <div ref="signoutform" className="sign-in-form" >
    <a href="" onClick={this.hideSignOut.bind(this)}> Close</a>
    <form onSubmit={this.formLogout.bind(this)}>
        <div>
          <input type="submit" id="logout-button" value="Sign Out" />
       </div>
   </form>
 </div>


   <div ref="createform" className="sign-in-form"  >
     <a href="" onClick={this.hideCreate.bind(this)}> Close</a>
     <form onSubmit={this.formRegister.bind(this)}>
         <div>
           Enter Email:<input type="email"  ref="emailcreate" id="account-email" />
           Enter Password:<input type="password" ref="passwordcreate" id="account-password" />
        </div>
           <input type="submit" id="account-button" value="create" />
           <a href="" onClick={this.toggleSignIn.bind(this)}> Sign In</a>

    </form>
 </div>


  </div>


  );


}

}
