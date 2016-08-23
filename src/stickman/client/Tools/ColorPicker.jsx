import React,{Component, PropTypes} from 'react';


/*
Componet for rendering the Color picker.
Other that GenericDropdown it can every item has the background color
of its color
*/
export default class ColorPicker extends Component {
  constructor(){
    super();
      this.state = {
    colors: ["#ff0000","#00ff00", "#0000ff","#000000","#ffffff","#ffff00","#ff9900",
  "#ff00ff","#00ffff","#663300","#9900cc","#808080","#008080"],
    selectedcolor: "#000000"
    };
  }

// create one item for each Color state
  renderColors(){
      return this.state.colors.map((color) => (
            <li key={color} style={{background:color}}>
                  <a href="" onClick={this.selectColor.bind(this,color)}>&nbsp;</a>
            </li>
      ));
  }
 // redirect color to Tools component by calling callback function
  selectColor(color){
    this.setState({selectedcolor: color},()=>{
          this.props.color(this.props.propName,color);
    }
  );

  }

//set default color at initialisation
  componentDidMount(){
    this.props.color(this.props.propName,this.state.selectedcolor);
  }

// adapt selected color according current value from Tools
  componentWillUpdate(nextProps){
      if(this.props.currentValue != this.state.selectedcolor){
        this.setState({selectedcolor: this.props.currentValue});
      }
    }


  render() {
    return (
        <div className="dropdown" style={{float:"left"}}>
        <button className="btn btn-primary dropdown-toggle"
                style={{background:this.state.selectedcolor}}
                type="button" data-toggle="dropdown">
          {this.props.ddname}
          <span className="caret"></span></button>

            <ul className="dropdown-menu">
              {this.renderColors()}

            </ul>
      </div>

    );
  }
}

ColorPicker.propTypes = {
  color: React.PropTypes.func,
};
