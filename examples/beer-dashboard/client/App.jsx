
import React,{Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import BeerForm from './beerform.jsx';
import BeerList from './beerlist.jsx';
import BarChart from './barchart.jsx';
//Beers = new Mongo.Collection("Beers");

export default class App extends TrackerReact(Component){
//  mixins:[ReactMeteorData],
  getBeerData(){
    return (Beers.find().fetch());
  }

  getBeerList(){ // geht das nur als funktion ???
      return (<BeerList data={this.getBeerData()} />);
  }

  getBarChart(){
      return (<BarChart data={this.mapData()} width="480" height="320"/>);
  }

  mapData(){
    var datas =[
      {qty: 0, xLabel: "Sun"},
      {qty: 0, xLabel: "Mon"},
      {qty: 0, xLabel: "Tue"},
      {qty: 0, xLabel: "Wed"},
      {qty: 0, xLabel: "Thu"},
      {qty: 0, xLabel: "Fri"},
      {qty: 0, xLabel: "Sat"},
    ];
    this.getBeerData().map((d)=>{
      datas[moment(d.date).weekday()].qty += d.beers;
    });

    return datas;
  }


  render(){
    return(
      <div>
        <div className="page-header">
          <center>
            <h1><i className="fa fa-beer"></i> Beer
            <small>Dashboard</small>
            </h1>
          </center>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
                  <BeerForm />
                  {this.getBeerList()}
            </div>
            <div className="col-md-offset-2 col-md-6">
                {this.getBarChart()}
            </div>
          </div>
        </div>

      </div>
    );
  }

}
