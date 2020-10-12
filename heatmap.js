
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 100, left: 55},
  width = 900 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg5 = d3.select("#heatmap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
'["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"]'
var myGroups = d3.range(1,13)
var myVars = d3.range(1,32)

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myVars)
  .padding(0.01);
svg5.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg5.append("text")             
  .attr("transform",
        "translate(" + (-40) + " ," + 
                       (20) + ")")
  .style("text-anchor", "middle")
  .text("Mois");

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myGroups)
  .padding(0.01);

svg5.append("g")
  .call(d3.axisLeft(y));

svg5.append("text")             
  .attr("transform",
        "translate(" + (width-20) + " ," + 
                       (height + 30) + ")")
  .style("text-anchor", "middle")
  .text("Jour");


d3.csv('time.csv').then(data => {
  
  // Build color scale
  var myColor = d3.scaleLinear()
    .range(["#fee8c8", "#e34a33"])
    .domain([1,300])
  svg5.selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("id",d=>"d"+d.jour +"_"+d.mois )
      .attr("x", d=>x(d.jour))
      .attr("y", d=>y(d.mois))
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", d=>myColor(+d.count))

  var countScale = d3.scaleLinear()
    .domain([0, d3.max(data, data=> +data.count)])
    .range([0, width])
  var colorScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d.count; }) / 2, d3.max(data, function(d) {return d.count; })])
    .range(["#f7fbff", "#6baed6", "#08306b"]);

  numStops = 3;
  countPoint = [0, d3.max(data, data=> +data.count) / 2, d3.max(data, data=> +data.count)];

  gridSize = 10

  svg5.append("defs")
      .append("linearGradient")
      .attr("id", "legend-traffic")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%")
      .selectAll("stop") 
      .data(d3.range(numStops))                
      .enter().append("stop") 
          .attr("offset", function(d,i) { 
              return countScale(countPoint[i]) / width;
          })   
          .attr("stop-color", function(d,i) { 
              return myColor(countPoint[i]); 
          });

  var legendWidth = Math.min(width * 0.8, 400);
          
  var legendsvg = svg5.append("g") // groupe principal
      .attr("class", "legendWrapper")
      .attr("transform", "translate(" + (400) + "," + (height -70 ) + ")");

  legendsvg.append("rect") // rectangle avec gradient
      .attr("class", "legendRect")
      .attr("x", -legendWidth/2)
      .attr("y", 0)
      .attr("width", legendWidth)
      .attr("height", 10)
      .style("fill", "url(#legend-traffic)");
          
  legendsvg.append("text") // légende
      .attr("class", "legendTitle")
      .attr("x", 0)
      .attr("y", -10)
      .style("text-anchor", "middle")
      .text("Nombre d'accidents");

  var xScale = d3.scaleLinear() // scale pour x-axis
       .range([-legendWidth / 2, legendWidth / 2])
       .domain([ 0, d3.max(data, data=> +data.count)] );

  legendsvg.append("g") // x axis
      .attr("class", "axis")
      .attr("transform", "translate(0," + (10) + ")")
      .call(d3.axisBottom(xScale).ticks(5));

  var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

  data.forEach(function(e,i) {
  d3.select("#d"+e.jour+"_"+e.mois)
      .on("mouseover", function(d) {
          div.transition()        
              .duration(200)      
              .style("opacity", .9);
          div.html("<b>Nb accidents : </b>" + e.count + "<br>")
              .style("left", (event.pageX + 60) + "px")     
              .style("top", (event.pageY - 60) + "px");
      })
      .on("mouseout", function(d) {
              div.style("opacity", 0);
              div.html("")
                  .style("left", "-550px")
                  .style("top", "-550px");
      });
});

});



