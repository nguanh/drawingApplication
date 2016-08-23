import {
    lineSelection,
    ellipseSelection,
    rectSelection,
    textSelection
} from './drawableObjects.js';


// A collection of methods that handle onclick events
/*******************************************************************************
                              Click Modes
*******************************************************************************/

// after selecting an object, selection circles have to be displayed
// these circles allow manipulation of the object
export function selectObject(id, objType) {
    removeTemporary();
    d3.event.preventDefault(); // prevent onclick conflict with DrawingBoard
    Session.set("lastSelected", id);

    //show resize/move circles according to every shape
    switch (objType) {
        case "line":
            lineSelection(id);
            break;
        case "ellipse":
            ellipseSelection(id);
            break;
        case "rect":
            rectSelection(id);
            break;
        case "text":
            textSelection(id);
    }

}
export function deleteObject(id) {
    removeTemporary(); // remove temporary circles
    Meteor.call("removeObject", id); // remove from backend
}

/*******************************************************************************
                                Helper Functions
*******************************************************************************/

//function to remove all selection circles
// as well as deselecting an existing object in the backend
export function removeTemporary() {
    d3.select("svg").selectAll(".selection-group").remove();
    d3.select("svg").selectAll(".update").remove();
    d3.select("svg").selectAll(".tmp-click").remove();
    d3.select("svg").selectAll(".tmp-click-center").remove();

    //unlock selected object for other users
    if (Session.get("lastSelected") !== null) {
        Meteor.call("setObjectDeselected", Session.get("lastSelected"), null);
        Session.set("lastSelected", null);
    }

}
