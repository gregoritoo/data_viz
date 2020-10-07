var width = 700, height = 550;

var path = d3.geoPath();

var projection = d3.geoConicConformal() // Lambert-93
    .center([2.454071, 46.279229]) // Center on France
    .scale(2600)
    .translate([width / 2 - 50, height / 2]);

path.projection(projection);

var svg = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "Blues");

var deps = svg.append("g");

var promises = [];
promises.push(d3.json('departement.json'));
const data=d3.csv('departement.csv').then(data => 
    {
    data.forEach( data => {
        //data.dep=+data.dep;
        data.count=+data.count;
    });
    return data;
});

promises.push(data);
Promise.all(promises).then(function(values) {
    const geojson = values[0]; // Récupération de la première promesse : le contenu du fichier JSON
    const csv = values[1]; // Récupération de la deuxième promesse : le contenu du fichier csv

    var quantile = d3.scaleQuantile()
        .domain([0, d3.max(csv, e => +e.count)])
        .range(d3.range(9));



    var colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(["#FDEDEC"," #FADBD8", "#F5B7B1" , "#F1948A","#EC7063","#EC7063","#CB4335","#B03A2E","#943126","#78281F"]);

    console.log("hello")
        
    
    console.log(colorScale(4));

    var features = deps
        .selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr('id', d => "d" + d.properties.CODE_DEPT)
        .attr("d", path)
        .data(csv)
        .attr("class", csv => "q" + quantile(csv.count) + "-9")
        .style("fill",csv => colorScale(quantile(+csv.count)));
                

    var legend = svg.append('g')
        .attr('transform', 'translate(525, 150)')
        .attr('id', 'legend');

    legend.selectAll('.colorbar')
        .data(d3.range(9))
        .enter().append('svg:rect')
        .attr('y', d => d * 20 + 'px')
        .attr('height', '20px')
        .attr('width', '20px')
        .attr('x', '0px')
        .attr("class", d => "d" + d + "-9")
        .style("fill",d => colorScale(d));


    var legendScale = d3.scaleLinear()
        .domain([0, d3.max(csv, e => +e.count)])
        .range([0, 9 * 20]);

    
 
    var legendAxis = svg.append("g")
        .attr('transform', 'translate(550, 150)')
        .call(d3.axisRight(legendScale).ticks(6));



    csv.forEach(function(e,i) {
    
    d3.select("#d"+e.dep)
        
        .on("mouseover", function(d) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);
            div.html("<b>Département : </b>" + e.dep + "<br>"
                    + "<b>Population : </b>" + e.count + "<br>")
                .style("left", (d3.event.pageX + 30) + "px")     
                .style("top", (d3.event.pageY - 30) + "px");
        })
        .on("mouseout", function(d) {
                div.style("opacity", 0);
                div.html("")
                    .style("left", "-500px")
                    .style("top", "-500px");
        });
});


d3.select("select").on("change", function() {
    d3.selectAll("svg").attr("class", this.value);
});

});








