//MonFichierCSV.csv
//caracteristiques-2018.csv
// d3.csv("analyse_data/caracteristiques-2018.csv", function( Erreur, csv) {

//     var data =[]

//     csv.forEach(function(x) {
//     	//var month = x.mois
//         var month = x.mois;
//         data.push(month);          
//     }); // FIN DE CSV.FOREACH
// }

var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#histogram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data_mois = data => data.mois;
console.log(data_mois);

var draw_histogram = data => {

    console.log(data);  

    min = 1;
    max = 13;
    domain = [min,max];

    var x = d3.scaleLinear()
        .domain([min, max])
        .range([0, width]);

    var histogram = d3.histogram()  
        .domain(x.domain())
        .thresholds(x.ticks(12));    

    var bins=histogram(data_mois);



    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([
        0,
        d3.max(bins, function(d) {
          return d.length;
        })
      ]); 

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

d3.csv("analyse_data/caracteristiques-2018.csv").then(data => 
    {
    data.forEach( data => {
        data.mois=+data.mois;
    });
    draw_histogram(data);
});
