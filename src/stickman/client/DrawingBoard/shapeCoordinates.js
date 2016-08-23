
// Methods to return a coordinate Object from the given DOm element
export function getLineCoordinates(lineObject){
  return {
    x1: lineObject.attr("x1"),
    y1: lineObject.attr("y1"),
    x2: lineObject.attr("x2"),
    y2: lineObject.attr("y2"),
  };
}

export function getCircleCoordinates(circleObject){
  return {
    cx: circleObject.attr("cx"),
    cy: circleObject.attr("cy"),
    rx: circleObject.attr("rx"),
    ry: circleObject.attr("ry"),
  };
}


export function getRectCoordinates(rectObject){
  return {
    x: rectObject.attr("x"),
    y: rectObject.attr("y"),
    width: rectObject.attr("width"),
    height: rectObject.attr("height"),
  };
}
// Methods to return a style Object from the given DOm element
export function getStyle(object){
//  let object = d3.select("#"+ id);
  return {
    fill: object.attr("fill"),
    stroke: object.attr("stroke"),
    "stroke-width": object.attr("stroke-width"),
    "stroke-linecap": object.attr("stroke-linecap"),
    "font-size": object.attr("font-size"),
  };
}
