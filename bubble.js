var width = 1100,
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
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    

d3.csv("csv/group_int.csv").then( data=> {
  console.log(pie(data))

  var g = svg6.selectAll(".int")
      .data(pie(data))
    .enter().append("g")
      .attr('class','int')
      .attr("visibility", "hidden");

  g.append("path")
      .attr("d", arc)
      .style("fill", d=> color(d.data.MAJ) );

  var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

  var label = d3.arc()
    .outerRadius(radius -100)
    .innerRadius(radius - 40);


  g.append("text")
      .attr("transform", function(d,i){
        var pos = outerArc.centroid(d);
        pos[0] = 1.3*radius * (midAngle(d) < Math.PI ? 1.1 : -1.1);
        
    
  var percent = (d.endAngle - d.startAngle)/(2*Math.PI)*100
       if(percent<3){
       //console.log(percent)
       pos[1] += i*50
       }
        return "translate("+ pos +")";
      })
      .text(function(d) { return d.data.MAJ; })
      .attr("fill", function(d,i) { return color(i); })
      .attr("text-anchor", 'middle')
      .attr("dx", function(d){
      var ac = midAngle(d) < Math.PI ? 0:-70
              return ac
      })
      .attr("dy", 5 )
      
      
     function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    var polyline = g.selectAll("polyline")
      .data(pie(data), function(d) {
        return d.data.MAJ;
      })
      .enter()
      .append("polyline")
      .attr("points", function(d,i) {
        var pos = outerArc.centroid(d);
            pos[0] = radius * 1.05 * (midAngle(d) < Math.PI ? 1 : -1) ;
         var o=   outerArc.centroid(d)
 var percent = (d.endAngle -d.startAngle)/(2*Math.PI)*100
       if(percent<3){
       //console.log(percent)
       o[1] 
       pos[1] += i*50
       }
       //return [label.centroid(d),[o[0],0[1]] , pos];
        return [label.centroid(d),[o[0],pos[1]] , pos];
      })
      .style("fill", "none")
      //.attr('stroke','grey')
      .attr("stroke", function(d,i) { return color(i); })
      .style("stroke-width", "1px");




});


d3.csv("csv/group_lum.csv").then( data=> {
  console.log(pie(data))

  var g = svg6.selectAll(".lum")
      .data(pie(data))
    .enter().append("g")
      .attr('class','lum')
      .attr("visibility", "hidden");

  g.append("path")
      .attr("d", arc)
      .style("fill", d=> color(d.data.MAJ) );


  var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

  var label = d3.arc()
    .outerRadius(radius -100)
    .innerRadius(radius - 40);


  g.append("text")
      .attr("transform", function(d,i){
        var pos = outerArc.centroid(d);
        pos[0] = 1.3*radius * (midAngle(d) < Math.PI ? 1.1 : -1.1);
        
    
  var percent = (d.endAngle - d.startAngle)/(2*Math.PI)*100
       if(percent<3){
       //console.log(percent)
       pos[1] += i*50
       }
        return "translate("+ pos +")";
      })
      .text(function(d) { return d.data.MAJ; })
      .attr("fill", function(d,i) { return color(i); })
      .attr("text-anchor", 'middle')
      .attr("dx", function(d){
      var ac = midAngle(d) < Math.PI ? 0:-50
              return ac
      })
      .attr("dy", 5 )
      
      
     function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    var polyline = g.selectAll("polyline")
      .data(pie(data), function(d) {
        return d.data.MAJ;
      })
      .enter()
      .append("polyline")
      .attr("points", function(d,i) {
        var pos = outerArc.centroid(d);
            pos[0] = radius * 1.1 * (midAngle(d) < Math.PI ? 1 : -1) ;
         var o=   outerArc.centroid(d)
 var percent = (d.endAngle -d.startAngle)/(2*Math.PI)*100
       if(percent<3){
       //console.log(percent)
       o[1] 
       pos[1] += i*50
       }
       //return [label.centroid(d),[o[0],0[1]] , pos];
        return [label.centroid(d),[o[0],pos[1]] , pos];
      })
      .style("fill", "none")
      //.attr('stroke','grey')
      .attr("stroke", function(d,i) { return color(i); })
      .style("stroke-width", "1px");



});


d3.csv("csv/group_atm.csv").then( data=> {
  console.log(pie(data))

  var g = svg6.selectAll(".atm")
      .data(pie(data))
    .enter().append("g")
      .attr('class','atm')
      .attr("visibility", "hidden");

  g.append("path")
      .attr("d", arc)
      .style("fill", d=> color(d.data.MAJ) );
  

  var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

  var label = d3.arc()
    .outerRadius(radius -100)
    .innerRadius(radius - 40);


  g.append("text")
      .attr("transform", function(d,i){
        var pos = outerArc.centroid(d);
        pos[0] = 1.3*radius * (midAngle(d) < Math.PI ? 1.1 : -1.1);
        
    
  var percent = (d.endAngle - d.startAngle)/(2*Math.PI)*100
       if(percent<3){
       //console.log(percent)
       pos[1] += i*50
       }
        return "translate("+ pos +")";
      })
      .text(function(d) { return d.data.MAJ; })
      .attr("fill", function(d,i) { return color(i); })
      .attr("text-anchor", 'middle')
      .attr("dx", function(d){
      var ac = midAngle(d) < Math.PI ? 0:-50
              return ac
      })
      .attr("dy", 5 )
      
      
     function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    var polyline = g.selectAll("polyline")
      .data(pie(data), function(d) {
        return d.data.MAJ;
      })
      .enter()
      .append("polyline")
      .attr("points", function(d,i) {
        var pos = outerArc.centroid(d);
            pos[0] = radius * 1.1 * (midAngle(d) < Math.PI ? 1 : -1) ;
         var o=   outerArc.centroid(d)
 var percent = (d.endAngle -d.startAngle)/(2*Math.PI)*100
       if(percent<3){
       //console.log(percent)
       o[1] 
       pos[1] += i*50
       }
       //return [label.centroid(d),[o[0],0[1]] , pos];
        return [label.centroid(d),[o[0],pos[1]] , pos];
      })
      .style("fill", "none")
      //.attr('stroke','grey')
      .attr("stroke", function(d,i) { return color(i); })
      .style("stroke-width", "1px");



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