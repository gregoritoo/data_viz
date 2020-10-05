// histogram des accidents par mois

var width  = 460;
var height = 400;
var margin = {top:20,bottom:20,left:100,right:20};

var svg = d3.select("#histogram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var draw_histogram = data => {

    min = 1;
    max = 13;
    domain = [min,max];

    var x = d3.scaleLinear()
        .domain([min, max])
        .range([0, width]);

    var histogram = d3.histogram()  
        .value(function(d) { return d.mois; })  
        .domain(x.domain())
        .thresholds(x.ticks(12));    

    var bins=histogram(data);


    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function(d) {
            return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function(d) {
            return height - y(d.length);
        })
        .style("fill", "#69b3a2");

};

//caracteristiques-2018.csv
//test_histogram.csv
d3.csv("analyse_data/caracteristiques-2018.csv").then(data => 
    {
    data.forEach( data => {
        data.mois=+data.mois;
    });
    console.log(data);  
    draw_histogram(data);
});
