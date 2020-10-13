var width = 700, height = 550;

var path = d3.geoPath();

var projection = d3.geoConicConformal() 
    .center([2.454071, 46.279229]) 
    .scale(2600)
    .translate([width / 2 - 50, height / 2]);

path.projection(projection);

var svg3 = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "Blues");

var deps = svg3.append("g")
    .attr('transform', 'translate(200)');

var promises = [];
promises.push(d3.json('departement.json'));
const data=d3.csv('departement.csv').then(data => 
    {
    data.forEach( data => {
        data.dep=+data.dep ;
        data.count=+data.count;
    });
    return data;
});

promises.push(data);
Promise.all(promises).then(function(values) {
    const geojson = values[0]; 
    const csv = values[1];


    var quantile = d3.scaleQuantile()
        .domain([1, d3.max(csv, csv => +csv.count)])
        .range(d3.range(9));



    var colorScale = d3.scaleLinear()
        .domain([0, 0.3])
        .range(["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]);


    var features = deps
        .selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr('id', d => "d" + d.properties.CODE_DEPT)
        .attr("d", path)
        .data(csv)
        .attr("class", csv => "q" + quantile(+csv.count) + "-9")
        .style("fill",csv => colorScale(quantile(+csv.count)));
    
    var legend = svg3.append('g')
        .attr('transform', 'translate(725, 150)')
        .attr('id', 'legend');          

    legend.selectAll('.colorbar')
        .data(d3.range(9))
        .enter().append('svg:rect')
            .attr('y', d => d * 20 + 'px')
            .attr('height', '20px')
            .attr('width', '20px')
            .attr('x', '0px')
            .attr("class", d => "q" + d + "-9")
            .style("fill",d => colorScale(d));

    var legendScale = d3.scaleLinear()
        .domain([0, d3.max(csv, e => +e.count)])
        .range([0, 9 * 20]);
    
    var legendAxis = svg3.append("g")
        .attr('transform', 'translate(550, 150)')
        .call(d3.axisRight(legendScale).ticks(6));


    var div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    

    csv.forEach(function(e,i) {
    d3.select("#d"+e.dep)
        .on("mouseover", function(d) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);
            div.html("<b>Département : </b>" + e.dep + "<br>"
                    + "<b>Population : </b>" + e.count + "<br>")
                .style("left", (event.pageX + 30) + "px")     
                .style("top", (event.pageY - 30) + "px");
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





