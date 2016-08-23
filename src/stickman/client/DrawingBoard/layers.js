
// functions to move objects to foreground by removing them from DOM
// and inserting them last
// ONLY FRONTEND
export function moveSelectionToForeground(){

     let circleCenter   = d3.select(".tmp-click-center");
      circleCenter.remove();
      if(circleCenter.node() !== null){
          d3.select("svg").node().appendChild(circleCenter.node());
      }

      let sideCircles = d3.selectAll(".tmp-click");
      sideCircles.remove();
      sideCircles.each(function(){
        if(d3.select(this).node() !== null){
          d3.select("svg").node().appendChild(d3.select(this).node());
        }
      });
}

export function moveObjectToForeground(id){
     let obj   = d3.select("#"+ id);
      obj.remove();
      if(obj.node() !== null){
          d3.select("svg").node().appendChild(obj.node());
      }

}
