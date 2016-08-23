import React,{Component,PropTypes} from 'react';

export default class BeerItem extends Component{
  handleClick(){
    let id = this.props.beer._id;
    Meteor.call("removeBeer",id);
  }
  render(){
    let date = moment(this.props.beer.date).format("DD/MM/YYYY");
    let tail = this.props.beer.beers > 1? " beers": " beer";
    //return (<li>hi</li>);
    return(
      <li onClick={this.handleClick.bind(this)}>
        <strong>{date} </strong>
        <strong>{this.props.beer.beers}</strong>
        {tail}
        </li>
    );
  }
}
