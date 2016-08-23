import React, { Component } from 'react';
import ReactDOM from 'react-dom';


/*
Wrapper for Default Login UI provided by account-ui package.
Wrapper makes the blaze template compatible with React
*/
export default class AccountsUIWrapper extends Component {

  componentDidMount() {
    // Meteor blaze is used to render loginUI
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));


  }

  componentWillUnmount() {
    // remove template
    Blaze.remove(this.view);
  }

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;

  }

}
