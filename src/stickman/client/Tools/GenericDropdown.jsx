import React,{Component, PropTypes} from 'react';

/*
Generic dropdown to render menues for any name/value type.

*/
export default class GenericDropdown extends Component {
  constructor(){
    super();
      this.state = {
        selection: null,
    };
  }

// Create item for each state with name obj,name and value obj.value
  renderValues(){
      return this.props.values.map((obj) => (
            <li key={obj.value}>
                  <a href="" onClick={this.selectValue.bind(this,obj.value)}>{obj.name}</a>
            </li>
      ));
  }

//redirect to Tools component
  selectValue(value){
    this.setState({selection: value},()=>{
          this.props.selection(this.props.propName,this.state.selection);
    });

  }
// set start value as the value at index 0
  componentDidMount(){
    this.setState({
      selection: this.props.values[0].value,
    });
    this.props.selection(this.props.propName,this.props.values[0].value);
  }
// update selection according to tools component
  componentWillUpdate(nextProps){
    if(this.props.currentValue != this.state.selection){
      this.setState({selection: this.props.currentValue});
    }
  }




  render() {
    return (
        <div className="dropdown" style={{float:"left"}}>
        <button className="btn btn-primary dropdown-toggle"
                type="button" data-toggle="dropdown">
          {this.props.ddname}: {this.state.selection}
          <span className="caret"></span></button>

            <ul className="dropdown-menu">
              {this.renderValues()}

            </ul>
      </div>

    );
  }
}

GenericDropdown.propTypes = {
  selection: React.PropTypes.func,
};
