
import React,{Component} from 'react';

export default class BeerForm extends Component{
  handleSubmit(event){
    event.preventDefault();
    let numBeers = this.refs.numBeers.value.trim();
    let beerDate = this.refs.beerDate.value;

    Meteor.call("insertBeer", numBeers,moment(beerDate).toDate(), function(event,r){
      if(event) alert(event.reason);
      numBeers.value = "";
      beerDate.value = "";
    });

  }
// Classes are for bootstrap styling
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title"> Beer consumption </h3>
        </div>
        <div className="panel-body">
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <div className="col-sm-10">
                  <input type="number" className="form-control" placeholder="How many beers" ref="numBeers" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-10">
                  <input type="date" className="form-control" ref="beerDate"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary btn-block"> Add </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    );
  }

}
