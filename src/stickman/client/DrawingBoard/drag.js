import {
    getLineCoordinates,
    getCircleCoordinates,
    getRectCoordinates,
    getStyle
} from "./shapeCoordinates";

/*
Drag handler for every shape supported. Every shape has different
attributes relevant for moving and resizing */
/******************************************************************************
                                DRAWING DRAG HANDLER
******************************************************************************/
/*
Allows interactive drawing of  line.
At drag start we set the first coordinates of the line
While dragging we change the second coordinates to that of the mouse positon
The line created is temporary, hence class "tmp"
At drag end we get the temporary class and save its data in the backend.
Then we delete the temporary element since the line will be drawn by the backend
*/
export function drawLineDrag(styleProp, svg) {
    let drag = d3.behavior.drag()
        .on('dragstart', function() {
            let [x, y] = d3.mouse(svg);
            let currentLine = d3.select(svg)
                .append("line")
                .attr("x1", x)
                .attr("y1", y)
                .attr("x2", x)
                .attr("y2", y)
                .attr(styleProp)
                .attr("class", "tmp");
            //enable mouse drag
        })
        .on('drag', function() {
            let [x, y] = d3.mouse(svg);
            line = d3.select(".tmp")
                .attr("x2", x)
                .attr("y2", y);
        })
        .on('dragend', function() {
            //get the last created line by looking for tmp class
            let shape = d3.select(".tmp");
            let objType = "line";
            let coordinates = getLineCoordinates(shape);
            let style = getStyle(shape);
            // TODO define minimum length for lines
            // lines with length 0 will not be accepted
            if ((shape.attr('x1') != shape.attr('x2')) ||
                (shape.attr('y1') != shape.attr('y2'))) {
                if (Session.get("currentSelectedFrame") !== null)
                    Meteor.call("insertObject",
                        Session.get("currentSelectedFrame"),
                        objType, coordinates, style);
            }
            // remove frontend Version from last created lineArray
            // gets server side rendered automatically
            let rem = shape.remove();
        });

    return drag;
}

/*
same principle as the drawLineDrag. We don't adapt the second coordinates
for circles, since they don't have them. instead we adapt the x and y
radius according the mouse drag
*/
export function drawCircleDrag(styleProp, svg) {
    let drag = d3.behavior.drag()
        .on('dragstart', function() {
            let [x, y] = d3.mouse(svg);
            let currentCircle = d3.select(svg)
                .append("ellipse")
                .attr("cx", x)
                .attr("cy", y)
                .attr("rx", 0)
                .attr("ry", 0)
                .attr(styleProp)
                .attr("class", "tmp");
        })
        .on('drag', function() {
            let [x, y] = d3.mouse(svg);
            let cx = parseFloat(d3.select(".tmp").attr("cx"));
            let cy = parseFloat(d3.select(".tmp").attr("cy"));
            line = d3.select(".tmp")
                .attr("rx", Math.abs(cx - x))
                .attr("ry", Math.abs(cy - y));
        })
        .on('dragend', function() {
            //get the last created line by looking for tmp class
            let shape = d3.select(".tmp");
            // define minimum radius for ellipses
            let xmin = 1;
            let ymin = 1;
            if ((shape.attr('rx') > xmin) &&
                (shape.attr('ry') > ymin)) {
                let style = getStyle(shape);
                let coordinates = getCircleCoordinates(shape);
                if (Session.get("currentSelectedFrame") !== null)
                    Meteor.call("insertObject",
                        Session.get("currentSelectedFrame"),
                        "ellipse", coordinates, style);

            }
            let rem = shape.remove();
        });

    return drag;
}


export function drawRectDrag(styleProp, svg) {
    let drag = d3.behavior.drag()
        .on('dragstart', function() {
            let [x, y] = d3.mouse(svg);
            let currentRect = d3.select(svg)
                .append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", 0)
                .attr("height", 0)
                .attr(styleProp)
                .attr("class", "tmp");
        })
        .on('drag', function() {
            let [x, y] = d3.mouse(svg);
            let cx = parseFloat(d3.select(".tmp").attr("x"));
            let cy = parseFloat(d3.select(".tmp").attr("y"));
            line = d3.select(".tmp")
                .attr("width", Math.abs(cx - x))
                .attr("height", Math.abs(cy - y));
        })
        .on('dragend', function() {
            //get the last created line by looking for tmp class
            let shape = d3.select(".tmp");
            let xmin = 1;
            let ymin = 1;
            if ((shape.attr('width') > xmin) &&
                (shape.attr('height') > ymin)) {
                let style = getStyle(shape);
                let coordinates = getRectCoordinates(shape);
                if (Session.get("currentSelectedFrame") !== null)
                    Meteor.call("insertObject",
                        Session.get("currentSelectedFrame"),
                        "rect", coordinates, style);

            }
            let rem = shape.remove();
        });

    return drag;
}

// Texts can't be resized, only by font-size
// instead at drag start we will ask for the text to write
// and create a text at the clicked position
export function drawTextDrag(styleProp, svg) {
    let drag = d3.behavior.drag()
        .on('dragstart', function() {
            let [x, y] = d3.mouse(svg);
            let regex = /^([a-zA-Z0-9-\s_-]){1,20}$/;
            //text are rendered directly from the backend
            bootbox.prompt("Please enter a Text", (result) => {
                if (regex.test(result)) {
                    let coordinates = {
                        x: x,
                        y: y,
                    };
                    let style = styleProp;
                    Meteor.call("insertObject",
                        Session.get("currentSelectedFrame"),
                        "text", coordinates, style, result);
                }
                else{
                   bootbox.alert("Invalid Input! Text can have 1 and 20 alphanumeric characters");
                }
            });
        });
    return drag;
}

/******************************************************************************
                                MOVE DRAG HANDLER
******************************************************************************/

/*
drag handler for moving the yellow center circles
by moving them the pruple resize circles as well as the
selected shape are moved as well.
For this purpose this method has cases for every shape for proper movement

*/
export function moveDrag() {

    let drag = d3.behavior.drag()
        .on('drag', function() {
            // move circle
            d3.select(this).attr('cx', d3.event.x)
                .attr('cy', d3.event.y);
            let x = d3.event.dx;
            let y = d3.event.dy;
            let id = d3.select(this).attr("id").slice(7);

            // move selected object
            let refObject = d3.select('#' + id);
            switch (refObject.node().tagName) {
                case "line":
                    refObject
                        .attr("x1", parseFloat(refObject.attr('x1')) + x)
                        .attr("y1", parseFloat(refObject.attr('y1')) + y)
                        .attr("x2", parseFloat(refObject.attr('x2')) + x)
                        .attr("y2", parseFloat(refObject.attr('y2')) + y);
                    break;
                case "ellipse":
                    refObject
                        .attr("cx", parseFloat(refObject.attr('cx')) + x)
                        .attr("cy", parseFloat(refObject.attr('cy')) + y);
                    break;
                case "rect":
                case "text":
                    refObject
                        .attr("x", parseFloat(refObject.attr('x')) + x)
                        .attr("y", parseFloat(refObject.attr('y')) + y);
            }

            //move all circles
            let circles = d3.selectAll(".tmp-click")
                .each(function() {
                    circle = d3.select(this);
                    circle.attr("cx", parseFloat(circle.attr('cx')) + x)
                        .attr("cy", parseFloat(circle.attr('cy')) + y);
                });

        })
        .on('dragend', function() {
            //store new position in the backend
            let id = d3.select(this).attr("id").slice(7);
            let selectedObject = d3.select("#" + id);
            let coordinates = {};
            switch (selectedObject.node().tagName) {
                case "line":
                    coordinates = getLineCoordinates(selectedObject);
                    break;
                case "ellipse":
                    coordinates = getCircleCoordinates(selectedObject);
                    break;
                case "rect":
                    coordinates = getRectCoordinates(selectedObject);
                    break;
                case "text":
                    coordinates = {
                        x: selectedObject.attr("x"),
                        y: selectedObject.attr("y"),
                    };
            }
            Meteor.call("updateObjectCoordinates", id, coordinates);
        });
    return drag;
}

/******************************************************************************
                                RESIZE DRAG HANDLER
******************************************************************************/

export function lineResizeDrag() {

    let drag = d3.behavior.drag()
        .on('drag', function() {
            // move selected circle
            let id = d3.select(this).attr("id").slice(7);
            d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
            //let lines follow circles
            let line = d3.select('#' + id);
            // differentiate between both circles by attribute "side"
            if (d3.select(this).attr("side") == "start") {
                line.attr("x1", d3.event.x).attr("y1", d3.event.y);
            } else {
                line.attr("x2", d3.event.x).attr("y2", d3.event.y);
            }
            // adjust center circle to new center of line
            let cX = (parseFloat(line.attr("x1")) + parseFloat(line.attr("x2"))) / 2;
            let cY = (parseFloat(line.attr("y1")) + parseFloat(line.attr("y2"))) / 2;
            let centerCircle = d3.select(".tmp-click-center")
                .attr("cx", cX)
                .attr("cy", cY);

        })
        .on('dragend', function() {
            let id = d3.select(this).attr("id").slice(7);
            let selectedObject = d3.select("#" + id);
            let coordinates = getLineCoordinates(selectedObject);
            Meteor.call("updateObjectCoordinates", id, coordinates);
        });
    return drag;
}


export function circleResizeDrag() {

    let drag = d3.behavior.drag()
        .on('drag', function() {
            // move selected circle
            let id = d3.select(this).attr("id").slice(7);
            let circle = d3.select(this);

            // differentiate between resize in width or height
            if ((circle.attr("posi") == "left") || (circle.attr("posi") == "right")) {
                d3.select(this).attr("cx", d3.event.x);
                let posX = parseFloat(d3.select("#" + id).attr("cx"));
                let width = Math.abs(posX - d3.event.x);
                d3.select("#" + id).attr("rx", width);
            } else if ((circle.attr("posi") == "top") || (circle.attr("posi") == "bottom")) {
                d3.select(this).attr("cy", d3.event.y);
                let posY = parseFloat(d3.select("#" + id).attr("cy"));
                let height = Math.abs(posY - d3.event.y);
                d3.select("#" + id).attr("ry", height);
            }

        })
        .on('dragend', function() {
            let id = d3.select(this).attr("id").slice(7);
            let selectedObject = d3.select("#" + id);
            let coordinates = getCircleCoordinates(selectedObject);
            Meteor.call("updateObjectCoordinates", id, coordinates);
        });
    return drag;
}


export function rectResizeDrag() {

    let drag = d3.behavior.drag()
        .on('drag', function() {
            // move selected circle
            let id = d3.select(this).attr("id").slice(7);
            let rect = d3.select(this);

            if ((rect.attr("posi") == "left") || (rect.attr("posi") == "right")) {
                d3.select(this).attr("cx", d3.event.x);
                let posX = parseFloat(d3.select("#" + id).attr("x"));
                let width = Math.abs(posX - d3.event.x);
                d3.select("#" + id).attr("width", width);
            } else if ((rect.attr("posi") == "top") || (rect.attr("posi") == "bottom")) {
                d3.select(this).attr("cy", d3.event.y);
                let posY = parseFloat(d3.select("#" + id).attr("y"));
                let height = Math.abs(posY - d3.event.y);
                d3.select("#" + id).attr("height", height);
            }

        })
        .on('dragend', function() {
            let id = d3.select(this).attr("id").slice(7);
            let selectedObject = d3.select("#" + id);
            let coordinates = getRectCoordinates(selectedObject);
            Meteor.call("updateObjectCoordinates", id, coordinates);
        });
    return drag;
}
