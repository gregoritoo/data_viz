var svg = d3.select("#chart-bar").append("svg")
				.attr("height",800)
				.attr("width",800) ;
var width = 1200;
var height = 300;


var margin = {top:20,bottom:20,left:600,right:20} ;

var innerWidth = width - margin.left - margin.right ;

var innerHeight = height - margin.top - margin.bottom ;

var xValue = data => data.count;
var yValue = data => data.atm;
var render_barchart = data => {
	var xscale = d3.scaleLinear()
		.domain([0,d3.max(data,xValue)])
		.range([0,innerWidth]);

	var yscale = d3.scaleBand()
		.domain(data.map(yValue))
		.range([0,innerHeight])
		.padding(0.4);



	var g2 =svg.append("g")
		.attr('transform','translate('+110+','+margin.top+')');
		
	
	g2.selectAll('rect').data(data)
		.enter().append('rect')
		.attr('y',data=>yscale(yValue(data)))
		.attr('width',data=>xscale(xValue(data)))
		.attr('height',yscale.bandwidth())
		.attr('fill',"#6C3483");

	var yaxis = d3.axisLeft().scale(yscale) ;
	var xaxis = d3.axisBottom().scale(xscale) ;

	g2.append("g").call(xaxis).attr('transform','translate('+0+','+260+')');
	g2.append("g").call(yaxis).attr('transform','translate('+0+','+0+')');
};

d3.csv('data_atm.csv').then(data => 
	{
	data.forEach( data => {
		data.count=+data.count;
	});

	render_barchart(data);
});