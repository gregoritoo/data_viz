var margin = {top: 60, right: 40, bottom: 0, left: 80},
    width = 1000,
    height = 600 ;
    keys = ["lum1", "lum2", "lum3", "lum4", "lum5"],
    colors = ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4"],
    legendCellSize = 20,
    tooltipWidth = 210;



var svg = d3.select("#chart-bar").append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv('mois_lum.csv').then(data => {


    var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    var series = stack(data);

    console.log(series)

    const x = d3.scaleBand()
        .domain(data.map(d => d.mois))
        .range([0, width/1.5])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 6000])
        .range([height, 0]);
        
    // Sur l'axe horizontal, on filtre les dates afficher
    const xAxis = d3.axisBottom(x)
        .tickValues(x.domain());

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
         .text("Nombre d'accidents")
         .attr("transform","translate(50,-20)");

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
            .attr("height", d => height - y(d.data.lum1- d.data.mois));

    addLegend(colors);

});

function addLegend(colors) {


    var keysDescription=["Plein jour","Crépuscule ou aube","Nuit sans éclairage public","Nuit avec éclairage public non allumé", "Nuit avec éclairage public allumé"];

    let reverseColors = colors.reverse(); // Pour présenter les catégories dans le même sens qu'elles sont utilisées
    let reverseKeysDescription = keysDescription.reverse();

    let legend = svg.append('g')
        .attr('transform', 'translate(10, 20)'); // Représente le point précis en haut à gauche du premier carré de couleur
        
    // Pour chaque couleur, on ajoute un carré toujours positionné au même endroit sur l'axe X et décalé en fonction de la 
    // taille du carré et de l'indice de la couleur traitée sur l'axe Y
    legend.selectAll()
        .data(reverseColors)
        .enter().append('rect')
            .attr('height', legendCellSize + 'px')
            .attr('width', legendCellSize + 'px')
            .attr('x', 5)
            .attr('y', (d,i) => i * legendCellSize)
            .style("fill", d => d);
    
    // On procéde de la même façon sur les libellés avec un positionement sur l'axe X de la taille des carrés 
    // à laquelle on rajoute 10 px de marge
    legend.selectAll()
        .data(reverseKeysDescription)
        .enter().append('text')
            .attr("transform", (d,i) => "translate(" + (legendCellSize + 10) + ", " + (i * legendCellSize) + ")")
            .attr("dy", legendCellSize / 1.6) // Pour centrer le texte par rapport aux carrés
            .style("font-size", "13px")
            .style("fill", "grey")
            .text(d => d);
}