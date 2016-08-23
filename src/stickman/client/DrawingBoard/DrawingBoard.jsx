import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {drawLineDrag, drawCircleDrag, drawRectDrag, drawTextDrag} from './drag.js';
import {moveSelectionToForeground, moveObjectToForeground} from './layers.js';
import {getStyle} from './shapeCoordinates.js';
import {removeTemporary, selectObject, deleteObject} from './clickEvents.js';

/*
component responsible for rendering the svg shapes with d3
The shapes are stored in this.props.data
The id of the currentframe is stored in currentframe.
THe styledata of the current selected shape can be return via the callback
function selectedstyle().
The style data for new objects to be created are stored in this.props.styledata
*/

export default class DrawingBoard extends Component {
    constructor() {
        super();

        this.state = {
            styledata: {},
            currentFrame: null
        };
    }

/******************************************************************************
                              Lifecycle Methods
*******************************************************************************/
// add onlick event for clicking anywhere in the svg but shapes
    componentDidMount() {
        var svgContainer = d3.select(this.refs.svg).on("click", () => {
            this.mouseClick();
        });
        this.updateShapes(this.props.data);
    }

componentWillUpdate(nextProps) {


  // clear frame if selected frame has changed
  if (nextProps.currentFrame != this.state.currentFrame) {
        this.setState({currentFrame: nextProps.currentFrame});
        this.clearFrame();
  }


  if (nextProps.styledata.mode == "select") {
    // remove drag handler
      d3.select(this.refs.svg).on('mousedown.drag', null);
      // if style data has changed while in select mode
      if (nextProps.styledata != this.state.styledata) {
          // change style of all selected shapes according to the style data
        this.updateStyle(nextProps.styledata.style);
        this.setState({styledata: nextProps.styledata});
      }
      // rerender shapes
      this.updateShapes(nextProps.data);
      // move seletioncircles to foreground
      moveSelectionToForeground();
      return;
  }

  // if mode != select
  let drawDragHandler = null;
  removeTemporary();
  switch(nextProps.styledata.mode){
    // add drag handler for creating new shapes according to mode
    case "line":    drawDragHandler = drawLineDrag(nextProps.styledata.style, this.refs.svg);
                    break;
    case "circle": drawDragHandler = drawCircleDrag(nextProps.styledata.style, this.refs.svg);
                    break;
    case "rect":    drawDragHandler = drawRectDrag(nextProps.styledata.style, this.refs.svg);
                    break;
    case "text":    drawDragHandler = drawTextDrag(nextProps.styledata.style, this.refs.svg);
                    break;
    case "layer":
    case "delete":  d3.select(this.refs.svg).on('mousedown.drag', null);
                    break;
  }
  // set dragHandöer and redraw
   if(drawDragHandler !== null) d3.select(this.refs.svg).call(drawDragHandler);
   this.updateShapes(nextProps.data);

    }
  /******************************************************************************
                                 Event Handler
  *******************************************************************************/

// clicking anywhere in the svg will deselect any selected shape
        mouseClick() {
            if (this.props.styledata.mode == "select" && !d3.event.defaultPrevented) {
                removeTemporary();
            }
        }

// general onclick event handler, the action is determined depending on the mode
        clickHandler(id, objType) {
            if (this.props.styledata.mode == "select") {
              // selected object is unselectable for other users
              // set exclusiveness in backend
                Meteor.call("setObjectSelected", id);
                // return styledata from selected object
                let shape = d3.select("#"+id);
                selectObject(id, objType);
                let retObj = {
                    mode: "select",
                    style: getStyle(shape)
                };
                this.props.selectedstyle(retObj);
            } else if (this.props.styledata.mode == "delete") {
                deleteObject(id);
            } else if (this.props.styledata.mode == "layers") {
                moveObjectToForeground(id);
            }
        }
/******************************************************************************
                                      Helper
*******************************************************************************/
// remove all shapes and remove selection if a new frame is selected
    clearFrame() {
        removeTemporary();
        d3.select(this.refs.svg).html("");
    }
//update style according to toolbar
    updateStyle(style){
      let selected = d3.select(this.refs.svg).selectAll(".tmp-click-center");
      selected.each(function() {
          let id = d3.select(this).attr("id").slice(7);
          // change style in frontend and backend
          d3.select("#" + id).attr(style);
          Meteor.call("updateObjectStyle", id,style);
      });
    }
/******************************************************************************
                                  Render
*******************************************************************************/
// Method for rendering, updating and removing shapes according to backend data
    updateShapes(props) {
        var svg = d3.select(this.refs.svg);
        let prefix = "XX";
        let click = (a, b) => {
            this.clickHandler(a, b);
        };
/******************************************************************************
                           1. Create/Update Nodes
*******************************************************************************/
        for (i = 0; i < props.length; i++) {
            let id = prefix + props[i]._id;
            let objType = props[i].objType;

            let obj = d3.select("#" + id);
            if (obj.node() === null) {
                //create new node
                obj = svg.append(objType).attr("id", id);
            }
            //update node
            obj.attr(props[i].coordinates)
               .attr(props[i].style)
               .attr("class", "no-delete") // any updated object is not to be deleted
               .text(props[i].text);
        }
/******************************************************************************
                          2. Delete unupdated nodes
*******************************************************************************/
        d3.selectAll(".toBeDeleted").remove();

/******************************************************************************
                         3. Set all Nodes to be deleted
*******************************************************************************/
        for (i = 0; i < props.length; i++) {
            let id = prefix + props[i]._id;
            let obj = d3.select("#" + id);
            let objType = props[i].objType;
            if (props[i].selected === null || props[i].selected == Meteor.userId()) {
                //if object is not selected by another user, add Event Handler
                // all objects are now tobedeleted
                obj.attr("class", "toBeDeleted").on("click", () => {
                    this.clickHandler(id, objType);
                }); //TODO HACK
            } else {
                obj.attr("class", "object-selected").on("click", null);

            }
        }

    }

    render() {
        return (
            <svg id="svg-main" className="DrawingBoard-main" ref="svg"></svg>
        );
    }
}

DrawingBoard.propTypes = {
    selectedStyle: React.PropTypes.func
};
