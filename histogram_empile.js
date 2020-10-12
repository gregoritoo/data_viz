var margin = {top: 20, right: 40, bottom: 60, left: 50},
    width = 400,
    height = 600 - margin.top - margin.bottom,
    keys = ["lum1", "lum2", "lum3", "lum4", "lum5"],
    colors = ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4"],
    legendCellSize = 20,
    tooltipWidth = 210;



var svg = d3.select("#hist_empil").append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv('analyse_data/mois_lum.csv').then(data => {

    console.log("ouai ouai");

        var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    var series = stack(data);

    const x = d3.scaleBand()
        .domain(data.map(d => d.mois))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(series[series.length - 1], d => d[1])])
        .range([height, 0]);
        
    // Sur l'axe horizontal, on filtre les dates afficher
    const xAxis = d3.axisBottom(x)
        .tickValues(x.domain().filter(d => (d.includes("06/0") || d.includes("21/0"))));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
        .style("text-anchor", "middle");

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
         .text("ml");

    let groups = svg.selectAll("g.lum")
        .data(series)
        .enter().append("g")
        .style("fill", (d, i) => colors[i]);

    let rect = groups.selectAll("rect")
        .data(d => d)
        .enter()
            .append("rect")
            .attr("x", d => x(d.data.mois))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d[1]))
            .attr("height", d => height - y(d[1] - d[0]));

    console.log("sisi");
});