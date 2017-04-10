d3.csv("./Locus_seattle_aerospace.csv", function(error, data) {


  var margin = {top: 20, right: 20, bottom: 50, left: 150},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var popup = d3.select(".chart-container").append("div")
    .style("width", "500px")
    .style("height", "47px")
    .style("background-color", "pink")
    .style("color", "black")
    .style("opacity", 0)
    .attr("class", "popup")

  var svg = d3.select(".chart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  function flattenDataGrouping(nestedData){
    var flattenedData = [];
    nestedData.forEach(function(el){
      el.values.forEach(function(val){
        var newObj = {};
        newObj["activity"] = el.key;
        newObj["resource"] = val.key;
        newObj["count"] = val.value;
        flattenedData.push(newObj);
      })
    })
    return flattenedData;
  }

  objectLabels={
    "D": "Diversified Resources",
    "C": "Information",
    "B": "Equipment",
    "F": "People"
  }

  activityLabels={
    "1": "Procure ",
    "2": "Produce ",
    "3": "Exchange ",
    "4": "Manage ",
    "1.1": "Source ",
    "1.2": "Transport ",
    "1.3": "Provide ",
    "2.1": "Design ",
    "2.2": "Make ",
    "2.3": "Assess & Fix ",
    "3.1": "Sell ",
    "3.2": "Exchange ",
    "3.3": "Finance ",
    "4.1": "Strategize ",
    "4.2": "Manage ",
    "4.3": "Audit & Fix "
  }

  activityDomains={
    "a4": [" ","Procure 1","Produce 2","Exchange 3","Manage 4","-"],
    "a12": [" ","Source 1.1","Transport 1.2","Provide 1.3",
                "Design 2.1","Make 2.2","Assess & Fix 2.3",
                "Sell 3.1","Exchange 3.2","Finance 3.3",
                "Strategize 4.1","Manage 4.2","Audit & Fix 4.3", "-"],
    "a36": [" ","1.1.1","1.1.2", "1.1.3", "1.2.1", "1.2.2", "1.2.3","1.3.1", "1.3.2", "1.3.3",
                    "2.1.1","2.1.2", "2.1.3", "2.2.1", "2.2.2", "2.2.3","2.3.1", "2.3.2", "2.3.3",
                    "3.1.1","3.1.2", "3.1.3", "3.2.1", "3.2.2", "3.2.3","3.3.1", "3.3.2", "3.3.3","-"]
  };

  objectDomains={
    "r4": [" ","D","C","B","F", "-"],
    "r12": [" ","Div","D3ii","C4iii","B4div","B4ii","B3iii","B2div","B2ii","B2i","B1iii","Bdiv","F","-"]
  };


  dataGroupings={
    "a4r4": d3.nest()
            .key(function(d) { return activityLabels[d.Activity[0]] + d.Activity[0]; })
            .key(function(d) { return d.Object[0]})
            .rollup(function(v) { return v.length; })
            .entries(data),
    "a4r12": d3.nest()
            .key(function(d) { return activityLabels[d.Activity[0]] + d.Activity[0]; })
            .key(function(d) { return d.Object})
            .rollup(function(v) { return v.length; })
            .entries(data),
    "a12r4": d3.nest()
            .key(function(d) { return activityLabels[d.Activity.slice(0,3)] + d.Activity.slice(0,3); })
            .key(function(d) { return d.Object[0]})
            .rollup(function(v) { return v.length; })
            .entries(data),
    "a12r12": d3.nest()
            .key(function(d) { return activityLabels[d.Activity.slice(0,3)] + d.Activity.slice(0,3); })
            .key(function(d) { return d.Object} )
            .rollup(function(v) { return v.length; })
            .entries(data),
    "a36r4": d3.nest()
            .key(function(d) { return d.Activity; })
            .key(function(d) { return d.Object[0] } )
            .rollup(function(v) { return v.length; })
            .entries(data),
    "a36r12": d3.nest()
            .key(function(d) { return d.Activity; })
            .key(function(d) { return d.Object; } )
            .rollup(function(v) { return v.length; })
            .entries(data)
  };


  function makeChart(dataGrouping, activityDomain, objectDomain){
      d3.select("svg").remove();

      var svg = d3.select(".chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      flattenedDataGrouping = flattenDataGrouping(dataGrouping);

      var activityScale = d3.scalePoint().range([0,height]).domain(activityDomain);
      var activityAxis = d3.axisLeft(activityScale);

      var objectScale = d3.scalePoint().range([width,0]).domain(objectDomain);
      var objectAxis = d3.axisBottom(objectScale);

      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(objectAxis);

      svg.append("g")
          .call(activityAxis);

      svg.append("text")
        .attr("x", width/2 )
        .attr("y",  475 )
        .style("text-anchor", "middle")
        .text("Resource");

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 120)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Activity");

      svg.selectAll("dot")
        .data(flattenedDataGrouping)
        .enter().append("circle")
        .attr("r", function(d) { return d.count * 3 } )
        .attr("cx", function(d) { return objectScale(d.resource); })
        .attr("cy", function(d) { return activityScale(d.activity); })
        .style("fill", 	function(d) { return '#'+ (Math.random()*0xFFFFFF<<0).toString(16)})
        .style("stroke", function(d) { return '#'+ (Math.random()*0xFFFFFF<<0).toString(16)})
        .style("stroke-width", 5);

      d3.selectAll("circle").on("mouseover", function(d) {
        if (activityDomains["a36"].includes(d.activity)){
          if (d.count !== 1){
            var activity = "companies in Seattle Perform Activity " + d.activity + " on";
          } else{
            activity = "company in Seattle Performs Activity " + d.activity + " on";
          }
        } else{
          if (d.count !== 1){
            var activity = "companies in Seattle " + d.activity.split(" ")[0];
          } else{
            activity = "company in Seattle " + d.activity.split(" ")[0] + "s";
          }
        }
        var text = d.count + " " + activity + " " + d.resource + " " + objectLabels[d.resource[0]]
        popup.transition()
          .duration(200)
          .style("opacity", .9)
          .style("left", d3.select(this).attr("cx") + "px")
          .style("top", d3.select(this).attr("cy") + "px");
        popup.html(text)
      }).on("mouseout", function(d) {
          popup.transition().duration(500)
          .style("opacity", 0);
        });

  }

  //initial data grouping when first load page
  var activityGrouping = "a4";
  var objectGrouping = "r4";
  makeChart(dataGroupings["a4r4"],activityDomains[activityGrouping],objectDomains[objectGrouping]);


  //event listeners on buttons to switch chart display 
  d3.selectAll(".activity").on("click", function(d){
    activityGrouping = d3.select(this).attr("id");
    activityDomain = activityDomains[activityGrouping];
    objectDomain = objectDomains[objectGrouping];
    dataGrouping = dataGroupings[activityGrouping + objectGrouping];
    makeChart(dataGrouping, activityDomain, objectDomain);
  });

  d3.selectAll(".object").on("click", function(d){
    objectGrouping = d3.select(this).attr("id");
    activityDomain = activityDomains[activityGrouping];
    objectDomain = objectDomains[objectGrouping];
    dataGrouping = dataGroupings[activityGrouping + objectGrouping];
    makeChart(dataGrouping, activityDomain, objectDomain);
  });


  })
