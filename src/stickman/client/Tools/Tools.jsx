import React,{Component, PropTypes} from 'react';
import ColorPicker from './ColorPicker.jsx';
import GenericDropdown from './GenericDropdown';

/*
Component responsible for rendering the Toolbar
It generates a style object according to the chosen values in the Toolbar
and directs it to the App Component.

On the other side changes from the App component such as the current style
of a selected object can be passed to this component so that its menues
adapt to the given style
*/
export default class Tools extends Component{

  constructor() {
    super();

    this.state = {
      // style object to compare for changes
      style: "",
      //values for each style property
      stroke:"",
      fill:"",
      mode:"",
      "stroke-width":"",
      "font-size":"",
      // values for resuable dropdown menues
      selectionvalues:[
        {value:"select", name: "Selection"},
        {value:"line"  , name: "Draw Line"},
        {value:"circle", name: "Draw Ellipse"},
        {value:"rect",   name: "Draw Rect"},
        {value:"text",   name: "Draw Textbox"},
        {value:"delete", name: "Delete Shapes"},
        //{value:"layers", name: "Shift Layers"}
      ],
      strokewidthvalues:[
        {value:"3" , name: "3px"},
        {value:"4" , name: "4px"},
        {value:"6" , name: "6px"},
        {value:"8" , name: "8px"},
        {value:"10", name: "10px"},
        {value:"12", name: "12px"}
      ],
      fontsizevalues:[
        {value:"21" , name: "21px"},
        {value:"23" , name: "23px"},
        {value:"25" , name: "25px"},
        {value:"28" , name: "28px"},
        {value:"32" , name: "32px"},
        {value:"35" , name: "35px"},
        {value:"38" , name: "38px"},
      ],
    };
  }
/*

*/
    componentWillUpdate(nextProps){
        // object is empty at initialisation
        if(jQuery.isEmptyObject(nextProps.selectedstyle))return;
       // check if style has changed to limit updates
        if( JSON.stringify(this.state.style) !==  JSON.stringify(nextProps.selectedstyle)){
          this.setState({
            style: nextProps.selectedstyle,
            stroke: nextProps.selectedstyle.style.stroke,
            fill: nextProps.selectedstyle.style.fill,
            "stroke-width": nextProps.selectedstyle.style["stroke-width"],
            "font-size":nextProps.selectedstyle.style["font-size"],
          });
        }
    }

// create style object from state data
  getStyleData(){

    let result ={
          mode: this.state.mode,
          style: {
              stroke:this.state.stroke,
              fill: this.state.fill,
              "stroke-width": this.state["stroke-width"],
              "font-size": this.state["font-size"],
              "stroke-linecap": "butt",
            }
    };
    return result;
  }

/*Callback function called by all drowdown menues.
 It is called whenever the dropdown values change
*/
  setProperty(property,value){
    this.setState({ [property]:value},()=>{
      // direct changes to callbackfunction from App Component
      this.props.data(this.getStyleData());
    });
  }

  renderStyleTools(){
    if(this.state.mode == "delete" ||this.state.mode=="layers") return(<div></div>);
    return(  <div>         <ColorPicker ddname= "Line Color"
                            currentValue ={this.state.stroke}
                            propName="stroke"
                            color={this.setProperty.bind(this)}/>
               <ColorPicker ddname= "Fill Color"
                            currentValue={this.state.fill}
                            propName="fill"
                            color={this.setProperty.bind(this)}/>
               <GenericDropdown ddname= "Stroke Width"
                              values= {this.state.strokewidthvalues}
                              currentValue={this.state["stroke-width"]}
                              propName="stroke-width"
                              selection={this.setProperty.bind(this)}/>
                <GenericDropdown ddname= "Font Size"
                              values= {this.state.fontsizevalues}
                              currentValue={this.state["font-size"]}
                              propName="font-size"
                              selection={this.setProperty.bind(this)}/>
            </div>);
  }

  render(){
    return(
      <div id="Tools-main" className="container">
        <GenericDropdown ddname= "Mode"
                    values= {this.state.selectionvalues}
                    currentValue={this.state.mode}
                    propName="mode"
                    selection={this.setProperty.bind(this)}/>
                  {this.renderStyleTools()}

    </div>
    );
  }
}

Tools.propTypes = {
  data: React.PropTypes.func,
};
