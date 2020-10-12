var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00","white","orange"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.count; });

var svg6 = d3.select("#bubble").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("group_int.csv").then( data=> {
  console.log(pie(data))

  var g = svg6.selectAll(".int")
      .data(pie(data))
    .enter().append("g")
      .attr('class','int')
      .attr("visibility", "hidden");

  g.append("path")
      .attr("d", arc)
      .style("fill", d=> color(d.data.MAJ) );

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.MAJ; });
});


d3.csv("group_lum.csv").then( data=> {
  console.log(pie(data))

  var g = svg6.selectAll(".lum")
      .data(pie(data))
    .enter().append("g")
      .attr('class','lum')
      .attr("visibility", "hidden");

  g.append("path")
      .attr("d", arc)
      .style("fill", d=> color(d.data.MAJ) );

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.MAJ; });
});


d3.csv("group_atm.csv").then( data=> {
  console.log(pie(data))

  var g = svg6.selectAll(".atm")
      .data(pie(data))
    .enter().append("g")
      .attr('class','atm')
      .attr("visibility", "hidden");

  g.append("path")
      .attr("d", arc)
      .style("fill", d=> color(d.data.MAJ) );

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.MAJ; });
});

d3.selectAll('.selector')
      .on('click', function(d) {
        update(this.id);
      })

function type(d) {
  d.count = +d.count;
  d.MAJ = +d.MAJ;
  return d;
}


function update(source) {
    d3.selectAll('.'+'lum').attr("visibility", "hidden")
    d3.selectAll('.'+'int').attr("visibility", "hidden")
    d3.selectAll('.'+'atm').attr("visibility", "hidden")
    d3.selectAll('.'+source).attr("visibility", "")
    
    console.log(d3.selectAll('.'+source));
    }