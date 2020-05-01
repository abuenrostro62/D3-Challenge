// function makeResponsive() {

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g");

// Append a div to the body to create tooltips, assign it a class
d3.select(".chartGroup")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load data.csv
d3.csv("assets/data/data.csv").then(function (error, healthData) {
    if (error) return console.log(error);

    healthData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // scale x-axis to the chart width
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(healthcare, d => d.poverty + 2)])
        .range(0, chartWidth)
        .padding(0, 1);

    // scale y-axis to the chart height
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare + 2)])
        .range([chartHeight, 0]);

    // Create axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);


    // Set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // Step 4: Create Circles & append data 
    var circleGroup = chartGroup.selectAll("circle").data(healthData).enter()
    circleGroup.append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", .5);

    circleGroup.append(text)
        .text(function (d) {
            return d.abbr;
        })
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .attr("font-size", "10px")
        .attr("class", "sans-serif")
        .style("font-weight", "bold");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
        .attr("class", "axisText"
            .text("In Poverty(%)"));

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margin.left + 40))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .text("Lacks Healtcare(%)");
}).catch(function (error) {
    console.log(error);
});
// };
// makeResponsive();
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);


        // Step 6: Initialize tool tip
        // ==============================
        // var toolTip = d3.tip()
        //     .attr("class", "tooltip")
        //     .offset([80, -60])
        //     .html(function (d) {
        //         return (abbr + '%');
        //     });

        // // Step 7: Create tooltip in the chart
        // // ==============================
        // chartGroup.call(toolTip);

        // // Step 8: Create event listeners to display and hide the tooltip
        // // ==============================
        // circlesGroup.on("click", function (data) {
        //     toolTip.show(data);
        // })
        //     // onmouseout event
        //     .on("mouseout", function (data, index) {
        //         toolTip.hide(data);
        //     });


