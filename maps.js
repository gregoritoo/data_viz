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
promises.push(d3.csv("population.csv"));

Promise.all(promises).then(function(values) {
    const geojson = values[0]; // Récupération de la première promesse : le contenu du fichier JSON
    const csv = values[1]; // Récupération de la deuxième promesse : le contenu du fichier csv
    
    var features = deps
        .selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr('id', d => "d" + d.properties.CODE_DEPT)
        .attr("d", path)
    
        // Ici on insèrera tout le code qui va suivre dans cette partie.

    var quantile = d3.scaleQuantile()
        .domain([0, d3.max(csv, e => +e.POP)])
        .range(d3.range(9));

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
            .attr("class", d => "q" + d + "-9")

    var legendScale = d3.scaleLinear()
        .domain([0, d3.max(csv, e => +e.POP)])
        .range([0, 9 * 20]);

    var legendAxis = svg.append("g")
        .attr('transform', 'translate(550, 150)')
        .call(d3.axisRight(legendScale).ticks(6));

    csv.forEach(function(e,i) {
        d3.select("#map" + e.CODE_DEPT)
            .attr("class", d => "department q" + quantile(+e.POP) + "-9")
            .on("mouseover", function(d) {
                div.transition()        
                    .duration(200)      
                    .style("opacity", .9);
                div.html("<b>Région : </b>" + e.NOM_REGION + "<br>"
                        + "<b>Département : </b>" + e.NOM_DEPT + "<br>"
                        + "<b>Population : </b>" + e.POP + "<br>")
                    .style("left", (d3.event.pageX + 30) + "px")     
                    .style("top", (d3.event.pageY - 30) + "px");
            })
            .on("mouseout", function(d) {
                    div.style("opacity", 100);
                    div.html("")
                        .style("left", "-500px")
                        .style("top", "-500px");
            });
    });


d3.select("select").on("change", function() {
    d3.selectAll("svg").attr("class", this.value);
});
});