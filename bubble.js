
var width = 700, height = 500;
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 30, left: 50} ;


var svg4 = d3.select("#bubble").append("svg")
    .attr("width", width )
    .attr("height", height)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var promises = [];

const data_bubble=d3.csv('join.csv').then(data_bubble => 
    {
    data_bubble.forEach( data_bubble => {
        data_bubble.count=+data_bubble.count ;
        data_bubble.grav=+data_bubble.grav;
        data_bubble.secu=+data_bubble.secu;
    });
    return data_bubble;
});

promises.push(data_bubble);

Promise.all(promises).then(function(values) {
  const data_bubble = values[0];

  
  // Add X axis
  var x1 = d3.scaleLinear()
    .domain([0, d3.max(data_bubble, e => e.grav)])
    .range([ 0, width ]);



  svg4.append("g")
    .attr("transform", "translate(0,470)")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y1 = d3.scaleLinear()
    .domain([0,d3.max(data_bubble, e => e.secu)])
    .range([ height, 0]);

 
  svg4.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z1 = d3.scaleLinear()
    .domain([d3.min(data_bubble, e => e.count), d3.max(data_bubble, e => e.count)])
    .range([ 1, 40]);



  // Add dots
  svg4.append('g')
    .selectAll("dot")
    .data(data_bubble)
    .enter()
    .append("circle")
      .attr("cx", d => x1(+d.grav))
      .attr("cy", d => y1(+d.secu)-50)
      .attr("r", d => z1(+d.count)*2)
      .style("fill", "red")
      .style("opacity", "0.7")
      .attr("stroke", "black");


});

