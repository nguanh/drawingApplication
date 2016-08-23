import React,{Component, PropTypes} from 'react';
import BeerItem from './beeritem.jsx';

export default class BeerList extends Component{
  renderBeers(){
    return this.props.data.map((beer)=>{
      return <BeerItem beer={beer} />;
    });
  }
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel heading">
          <h3 className="panel-title">History
          <small> click to remove</small>
          </h3>
        </div>
        <div className="panel-body">
          <ul>
            {this.renderBeers()}
          </ul>
        </div>
      </div>
    );
  }


}

BeerList.propTypes = {
  data: PropTypes.object.isRequired,
};
