import {lineResizeDrag, moveDrag, circleResizeDrag,rectResizeDrag} from './drag.js';

/*
After clicking an element circles will be displayed that allow manipulation of
object. All functions here create the circles acoording to the seleted shape

*/

// drag Handler for every shape
var moveDragHandler = moveDrag();
var lineDrag        = lineResizeDrag();
var circleDrag      = circleResizeDrag();
var rectDrag        = rectResizeDrag();

// draw  circles for manipulation of lines
export function lineSelection(id){
  let line = d3.select("#"+id);
  drawLineResizeCircles(line.attr("x1"),line.attr("y1"),id,"start");
  drawLineResizeCircles(line.attr("x2"),line.attr("y2"),id,"end");

// get coordinates of center of line
  let cX = (parseInt(line.attr("x1"))+parseInt(line.attr("x2")))/2;
  let cY = (parseInt(line.attr("y1"))+parseInt(line.attr("y2")))/2;
  drawCircleCenter(cX,cY,id);

}


export function ellipseSelection(id){
   let ellipse = d3.select("#"+ id);
   drawCircleCenter(ellipse.attr("cx"),ellipse.attr("cy"),id);

//get Circle Positions according to bounding box
  let rectData = ellipse.node().getBBox();
  let circleCoordinates = [
    {
      name: "top",
      x: rectData.x +(rectData.width/2 ),
      y: rectData.y,
      top: 1,
      left : 1
    },
    {
      name: "right",
      x: rectData.x+ rectData.width,
      y: rectData.y+(rectData.height/2),
      top: 0,
      left : 0
    }
  ];
  drawRectResizeCircles(circleCoordinates,id,circleDrag);
}



export function rectSelection(id){
  let rect = d3.select("#"+ id);

  let centerX = parseFloat(rect.attr("x"))+ parseFloat(rect.attr("width"))/2;
  let centerY = parseFloat(rect.attr("y"))+ parseFloat(rect.attr("height"))/2;
  drawCircleCenter(centerX,centerY,id);


  let rectData = rect.node().getBBox();
  let circleCoordinates = [
    {
      name: "bottom",
      x: rectData.x +(rectData.width/2 ),
      y: rectData.y + rectData.height,
      top: 1,
      left : 1
    },
    {
      name: "right",
      x: rectData.x+ rectData.width,
      y: rectData.y+(rectData.height/2),
      top: 0,
      left : 0
    }
  ];
  drawRectResizeCircles(circleCoordinates,id,rectDrag);
}

// texts have no resize
export function textSelection(id){
  let rect = d3.select("#"+ id);
  drawCircleCenter(rect.attr("x"),rect.attr("y"),id);
}

/*******************************************************************************
                                Helper Functions
*******************************************************************************/

// draw  yellow center circle responsible for moving an object
function drawCircleCenter(x,y,id){
  circleCenter =  d3.select("svg").append("circle")
                   .attr("cx", x)
                   .attr("cy",y)
                   .attr("r", 10)
                   .attr("side","center") //used to identify circle
                   .attr("class", "tmp-click-center")
                   .attr("id", "center-" + id)// circle id to identify moved shape
                   .style("fill","yellow")
                   .call(moveDragHandler);
}
// draw purple circles for manipulation of line
function drawLineResizeCircles(x,y,id,side){
  circleEnd = d3.select("svg").append("circle")
              .attr("cx", x)
              .attr("cy" ,y)
              .attr("r", 7)
              .attr("side",side)
              .attr("class","tmp-click")
              .attr("id", "circle-" + id)
              .call(lineDrag)
              .style("fill","purple");
}


// purple manipulation circles for rectangular shapes
function drawRectResizeCircles(circleCoordinates, id, dragHandler){
  let selectionGroup = d3.select("svg").append("g")
                         .attr("class", "selection-group");
  selectionGroup.selectAll("circle").data(circleCoordinates)
                .enter()
                .append("circle")
                .attr("cx", function(d){ return d.x;})
                .attr("cy", function(d){ return d.y;})
                .attr("class", "tmp-click")
                .attr("id", "circle-" + id)
                .attr("posi", function(d){return d.name;})
                .attr("top", function(d){return d.top;})
                .attr("left", function(d){return d.left;})
                .attr("fill","purple")
                .call(dragHandler)
                .attr("r",7);

}
