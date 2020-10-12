
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 100},
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
  .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myGroups)
  .padding(0.01);
svg5.append("g")
  .call(d3.axisLeft(y));


d3.csv('time.csv').then(data => {
  console.log(data)
  // Build color scale
  var myColor = d3.scaleLinear()
    .range(["white", "#69b3a2"])
    .domain([1,d3.max(data,data=>+data.count)])
  svg5.selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d=>x(d.jour))
      .attr("y", d=>y(d.mois))
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", d=>myColor(+d.count))
});
