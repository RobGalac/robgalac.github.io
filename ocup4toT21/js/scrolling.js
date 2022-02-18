var svg = d3.select(".chart").select("svg"),
    margin = { top: 40, right: 60, bottom: 30, left: 80 },
    width = +svg.attr("width") - margin.left - margin.right,
    // height = +svg.attr("height") - margin.top - margin.bottom;
    height = Math.floor(window.innerHeight) - margin.top - margin.bottom;
    // height = d3.max([d3.min([height, 900]), 500]);
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



/*
 * Ranking list
 */



// Scales
var x = d3.scaleLinear()   
    .domain([.5, 3])
    .range([0, width]);
var y = d3.scaleLinear()
    .domain([3.5, 14])
    .range([margin.top, height]);
var col_width = .8 * (x(2) - x(1)),
    cell_height = y(14)-y(13);


// Vis at each step
var ranking = null;

// Timer to show random occupations until user selects own.
var t = null;


/*
 * Rankings for all
 */

var max_ranking = 140;

// Scales
var xAge = d3.scaleLinear()
    .domain([4, 13])
    .range([margin.left, width+margin.right]);
var yRank = d3.scaleLinear()  
    .domain([0, max_ranking])
    .range([margin.top, height]);
var col_width_all = .9 * (xAge(5) - xAge(4));
var cell_height_all = (yRank(2) - yRank(1));

// For step chart of all occupations.
var yRankAll = d3.scaleLinear()
    .domain([0, max_ranking])
    .range([margin.top, height]);
var line = d3.line()
    .curve(d3.curveStep)
    .x(function(d) { return xAge(d.agegrp); })
    .y(function(d) { return yRank(d.ranking); });
var rank_tick_values = [1].concat(d3.range(25, max_ranking+1, 25));


/*
 * Chart by rate / count.
 */

var yRate = d3.scaleLinear()
    .domain([0, 14])
    .range([height, margin.top]);
    
var yCount = d3.scaleLog()
    .domain([100, 100000])
    .range([height, margin.top]);
var count_tick_values = [100, 1000, 10000, 100000];


// d3.tsv("data/top5byage.tsv", type, function(error, data) {
d3.tsv("data/agegrp_occ_all_v2_2010basis.tsv", type, function(error, occs) { 
    
    // Prep the data.
    // var occs = [];
    // var occ_fields = d3.range(1, 4).map(d => "occ"+d);
    // data.forEach(function(d) {
    //
    //     if (d.age < 35) {
    //         occ_fields.map(function(field,i) {
    //             occs.push({
    //                 "age": d.age,
    //                 "ranking": i+1,
    //                 "occ_code": d[field],
    //                 "name": occ_codes[''+d[field]],
    //             })
    //         });
    //     }
    // });
    
    
    // Header
    d3.select("#topocc").selectAll(".header")
        .data(["Edad", "Empleo más común", "Segundo", "Tercero"])
      .enter().append("div")
        .attr("class", "header")
        .style("width", function(d,i) {
            return i == 0 ? .5 * col_width+"px" : col_width+"px";
        })
        .style("left", function(d,i) {
            return i == 0 ? x(.5) : x(i) + "px";
        })
        .style("top", d => "40px")
        .text(d => d)
        .style("opacity", function(d,i) {
            if (i > 1) return 0.1;
            else return 1;
        });
    
    
    // Age group labels
    d3.select("#topocc").selectAll(".occage")
        .data(d3.range(4, 14))
      .enter().append("div")
        .attr("class", "occage")
        .style("width", (xAge(5)-xAge(4))+"px")
        .style("height", cell_height+"px")
        .style("left", x(.5)+"px")
        .style("top", d => y(d) + "px")
        .text(function(d) {
            if (d == 13) return "60+";
            
            var lower_end = (d-1)*5 + 1,
                higher_end = d*5;
                
            if (d == 4) {
                lower_end = 15;
            }
            
            return lower_end + "-" + higher_end; 
        });
    
    
    // Occupation labels
    ranking = d3.select("#topocc").selectAll(".occlabel")
        .data(occs)
        .enter().append("div")
        .attr("id", d => "cell"+d.agegrp+d.ranking)
        .attr("class", d => "occlabel " + ("occ"+d.occ_code) + (" agegrp"+d.agegrp) + (" rank"+d.ranking))
        .style("width", col_width+"px")
        .style("left", d => x(d.ranking) + "px")
        .style("top", d => y(d.agegrp) + "px")
        .text(d => occ_codes[d.occ_code])
        .style("opacity", function(d) {
            if (d.ranking > 1 && d.ranking < 4) return 0.1;
            else return 1;
        })
        .style("display", function(d) {
            if (d.ranking > 3) { return "none"; }
            else { return "inherit"; }
        });
    
    
    // Rank axis
    var rankaxis = d3.select("#topocc").selectAll(".ranktick")
        .data(rank_tick_values)
      .enter().append("div")
        .attr("class", "ranktick")
        .style("width", margin.left+"px")
        .style("top", d => (yRank(d)-6) +"px")
        .text(d => d == 1 ? "Rank 1" : d)
        .style("opacity", 0);
    
    // Count axis
    var countaxis = d3.select("#topocc").selectAll(".counttick")
        .data(count_tick_values)
      .enter().append("div")
        .attr("class", "counttick")
        .style("width", margin.left+"px")
        .style("top", d => (yCount(d)-6) +"px")
        .text(d => d3.format(",")(d))
        .style("opacity", 0);
    
    
    // Search
    var occ_search = new autoComplete({
        selector: "#newsearch-input",
        minChars: 1,
        source: function(term, suggest) {
            term = term.toLowerCase();
            var choices = d3.keys(occ_codes).map(function(d) { return [occ_codes[d], d] });
            var suggestions = [];
            for (i=0;i<choices.length;i++)
                if (~(choices[i][0]+' '+choices[i][1]).toLowerCase().indexOf(term)) suggestions.push(choices[i]);
            suggest(suggestions);
        },
        renderItem: function(item, search) {
            return '<div class="autocomplete-suggestion" data-name="'+item[0]+'" data-occ2="'+item[1]+'" data-val="'+search+'">'+item[0]+'</div>';
        },
        onSelect: function(e, term, item) {
            // Stop random occupations if showing.
            if (t != null) {
                t.stop();
            }
                        
            highlightOcc(item.getAttribute('data-occ2'));
            d3.select('#newsearch-input').node().value = item.getAttribute('data-name');
        }
    }); // @end occ_search
    
    
    d3.select(".show-random").on("click", function() {
        if (t != null) {
            t.stop();
        }
        
        var random_occ = getRandomOcc();
        highlightOcc(random_occ);
        
        d3.select("#newsearch-input").style("background", "#e0e0e0")
            .transition()
            .duration(1200)
            .style("background", "#ffffff");
            
        if (d3.select('#newsearch-input').node().value != occ_codes[random_occ]) {
            d3.select('#newsearch-input').node().value = occ_codes[random_occ];
        }
    });
    
    
    
    //
    // Step chart
    //
    
    // var occs_bytime = d3.nest()
    //     .key(function(d) { return d.occ_code })
    //     .sortValues(function(a,b) { return a.agegrp - b.agegrp; })
    //     .entries(occs);
    //
    // console.log(occs_bytime);
    //
    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(xAge));
    //
    // g.append("g")
    //     .attr("class", "axis axis--y")
    //     .call(d3.axisLeft(yRank));
    //
    // var occupation = g.selectAll(".occline")
    //     .data(occs_bytime)
    //   .enter().append("g")
    //     .attr("class", "occline");
    //
    // occupation.append("path")
    //     .attr("class", "line")
    //     .attr("d", function(d) { return line(d.values); })
    
    // Mouseover events for occlabels
    // d3.select("#topocc").selectAll(".occlabel")
    //     .on("mouseover", function(d,i) {
    //         d3.selectAll(".occ"+d.occ_code).classed("current", true);
    //     })
    //     .on("mouseout", function(d,i) {
    //         d3.selectAll(".occ"+d.occ_code).classed("current", false);
    //     })
    
    
}); // @end d3.tsv()




function type(d) {
    d3.keys(d).map(function(key) {
        if (key != "occ_code") {
            d[key] = +d[key];
        }
    });
    
    return d;
}




/**
  * Scrolling framework from scrollama.js
  */



// using d3 for convenience
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');




// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepHeight = Math.floor(window.innerHeight * 0.85);
    step.style('height', stepHeight + 'px');
    // step.style("height", "700px");

    // 2. update width/height of graphic element
    var bodyWidth = d3.select('body').node().offsetWidth;

    var graphicMargin = 16 * 2;
    var textWidth = text.node().offsetWidth;
    var graphicWidth = container.node().offsetWidth - textWidth - graphicMargin;
    var graphicHeight = Math.floor(window.innerHeight)
    var graphicMarginTop = Math.floor(graphicHeight)

    graphic
        .style('width', graphicWidth + 'px')
        .style('height', graphicHeight + 'px')
        // .style("height", height+"px")
        .style("right", "0px");
    
    // container.select("#topocc").style("height", window.innerHeight + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }

    // add color to current step only
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })

    
    //
    // Activate functions based on index.
    //
    var sign = (response.index - lastIndex) < 0 ? -1 : 1;
    var scrolled_steps = d3.range(lastIndex + sign, response.index + sign, sign);
    scrolled_steps.forEach(function(i) {
        activateFunctions[i]();
    });
    lastIndex = response.index;
    // activateFunctions[response.index]();
    
    
    if (response.index != 11 && response.index != 3 && t != null) {
        t.stop();
    }
    

    // update graphic based on step
    // graphic.select('p').text(response.index + 1);
}

function handleContainerEnter(response) {
    // response = { direction }

    // old school
    // sticky the graphic
    graphic.classed('is-fixed', true);
    graphic.classed('is-bottom', false);
    graphic.style("right", d3.select(".graphic").style("margin-right"));
}

function handleContainerExit(response) {
    // response = { direction }

    // old school
    // un-sticky the graphic, and pin to top/bottom of container
    graphic.classed('is-fixed', false);
    graphic.classed('is-bottom', response.direction === 'down');
    graphic.style("right", 0);

    // if (t != null) {
    //     t.stop();
    // }
}

function init() {
    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        debug: false,
        offset: 0.6,
    })
        .onStepEnter(handleStepEnter)
        .onContainerEnter(handleContainerEnter)
        .onContainerExit(handleContainerExit);

    // setup resize event
    window.addEventListener('resize', handleResize);
}

// kick things off
init();








/*
 * Activation functions. Helpers to fire off at each step.
 */ 

var lastIndex = -1;
var activateFunctions = [];


function showOne() {
    
    graphic.selectAll(".header").transition().duration(600)
        .style("opacity", function(d,i) { return i > 1 ? 0.1 : 1 });
    graphic.selectAll(".occlabel")
        .transition().duration(600)
        .style("opacity", function(d) {
            if (d.ranking > 1) return 0.1;
            else return 1;
        })
        // .style("overflow", "visible")
        .style("width", col_width+"px")
        // .style("font-size", "14px")
        .style("left", d => x(d.ranking) + "px")
        .style("top", d => y(d.agegrp) + "px");
        
}; // @end showOne()



function showTwoThree() {
    
    graphic.selectAll(".occage")
        .transition().duration(600)
        .style("left", x(.5)+"px")
        .style("top", d => y(d) + "px")
        .style("text-align", "left")
        .style("border-left", "none");
    graphic.selectAll(".header").transition().duration(200)
        .style("opacity", 1);
    graphic.selectAll(".occlabel")
        .classed("smaller", false)
        .classed("locked", false)
        .style("display", function(d) {
            if (d.ranking > 3) { return "none"; }
            else { return "inherit"; }
        })
        .transition().duration(600)
        .style("opacity", function(d) {
            if (d.ranking > 3) return 0;
            else return 1;
        })
        .style("width", col_width+"px")
        .style("height", cell_height+"px")
        .style("left", d => x(d.ranking) + "px")
        .style("top", d => y(d.agegrp) + "px");
    graphic.selectAll(".ranktick")
        .transition().duration(200)
        .style("opacity", 0);
    
    graphic.select("#topocc")
        .on("click", function() {});
}; // @end showTwoThree()



function showTopMore() {
    
    graphic.selectAll(".occage")
        .transition().duration(1200)
        .style("left", d => xAge(d) + "px")
        .style("top", "20px")
        .style("height", "14px")
        .style("text-align", "center")
        .style("border-left", function(d,i) {
            if (i == 0) return "none";
            else return "1px solid #333";
        });
    graphic.selectAll(".header").transition().duration(0)
        .style("opacity", 0);
    graphic.selectAll(".occlabel")
        .classed("smaller", true)
        .classed("current", false)
        .classed("locked", false)
        .classed("highlight", false)
        .classed("highlight-partial", false)
        .style("display", function(d) {
            if (d.ranking > max_ranking) { return "none"; } 
            else { return "inherit"; }
        })
        .style("width", col_width_all+"px")
        .style("height", "3px")
      .transition().duration(600)
        .delay(function (d, i) { return 5 * d.ranking;})
        .style("opacity", function(d) {
            if (d.ranking > max_ranking) { return 0; } 
            else { return 1; }
        })
        .style("left", d => xAge(d.agegrp) + "px")
        .style("top", d => yRank(d.ranking) + "px");
    graphic.selectAll(".ranktick")
        .transition().duration(600)
        .delay(function (d) { return 8 * d;})
        .style("opacity", 1);
    graphic.selectAll(".counttick")
        .transition().duration(600)
        .style("opacity", 0);
    
    graphic.select("#topocc")
        .on("click", clicked);
    
}; // @end showAllOccs()


function showRandomRanks() {
    highlightOcc(getRandomOcc());
    
    t = d3.interval(function(elapsed) {
        var occ_code = getRandomOcc();
        highlightOcc(occ_code);
    }, 1200);
}


function showFirst() {
    highlightOcc("2135");
    
    graphic.selectAll(".occlabel")
        .transition().duration(600)
        .style("top", d => yRank(d.ranking) + "px")
        .style("left", d => xAge(d.agegrp) + "px")
        .style("opacity", 1);
    graphic.selectAll(".ranktick")
        .transition().duration(600)
        .style("opacity", 1);
    graphic.selectAll(".counttick")
        .transition().duration(600)
        .style("opacity", 0);
}


function showRates() {
    
    graphic.selectAll(".occlabel")
        .classed("smaller", true)
        // .classed("current", false)
        // .classed("locked", false)
        .style("display", function(d) {
            if (d.ranking > max_ranking) { return "none"; } 
            else { return "inherit"; }
        })
      .transition().duration(900)
        .delay(function(d,i) { return Math.round(d.ranking*2); })
        .style("top", d => (yCount(d.n)-6) + "px")
        .style("width", col_width_all+"px")
        .style("height", "3px");
    
    graphic.selectAll(".ranktick")
        .transition().duration(800)
        .style("opacity", 0);
    
    graphic.selectAll(".counttick")
        .transition().duration(800)
        .style("opacity", 1);
        
    // Turn off interaction.
    graphic.select("#topocc")
        .on("mousemove", function() {})
        .on("mouseout", function() {});
    
    highlightOcc("2135");
}



function showRanksAgain() {
    graphic.selectAll(".occlabel")
        .transition().duration(400)
        .delay(function(d,i) { return 5*Math.round(d.ranking); })
        .style("opacity", 1)
        .style("width", col_width_all+"px")
        .style("height", "3px")
        .style("left", d => xAge(d.agegrp) + "px")
        .style("top", d => yRank(d.ranking) + "px");

    graphic.selectAll(".ranktick")
        .transition().duration(600)
        .style("top", d => (yRank(d)-6) +"px")
        .text(d => d == 1 ? "Rank 1" : d)
        .style("opacity", 1);
    graphic.selectAll(".counttick")
        .transition().duration(600)
        .style("opacity", 0);
}



function showSecond() {
    highlightOcc("2655");
}
function showThird() {
    highlightOcc("5312");
}
function showFourth() {
    graphic.selectAll(".occlabel")
        .classed("highlight", false)
        .classed("highlight-partial", false);
        
    
    highlightOcc("6112");
}
function showFifth() {
    graphic.selectAll(".occlabel")
        .classed("highlight", false)
        .classed("highlight-partial", false);
    
    highlightOcc("9512");
}



function showSearch() {
    
    d3.select('#newsearch-input').node().value = '';
    
    graphic.selectAll(".occlabel")
        .transition().duration(600)
        .style("opacity", 1)
        .style("width", col_width_all+"px")
        .style("height", "3px")
        .style("left", d => xAge(d.agegrp) + "px")
        .style("top", d => yRank(d.ranking) + "px");

    graphic.selectAll(".ranktick")
        .transition().duration(600)
        .style("top", d => (yRank(d)-6) +"px")
        .text(d => d == 1 ? "Rank 1" : d)
        .style("opacity", 1);

    graphic.selectAll(".counttick")
        .transition().duration(600)
        .style("opacity", 0);
    
    // Turn on interaction.
    graphic.select("#topocc")
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)
        .on("click", clicked);
    
    // Show random occupations
    highlightOcc(getRandomOcc());
    t = d3.interval(function(elapsed) {
        var occ_code = getRandomOcc();
        highlightOcc(occ_code);
    }, 1700);
    
}



function mousemove() {
    var curr_age = Math.floor(xAge.invert(d3.mouse(this)[0]));
    var curr_rank = Math.floor(yRank.invert(d3.mouse(this)[1]));
    
    var curr_occ = d3.select( (".agegrp"+curr_age) + (".rank"+curr_rank) );
    // console.log(curr_occ.datum());
    if (!curr_occ.empty()) {
        graphic.selectAll(".highlight").classed("highlight", false);
        graphic.selectAll(".highlight-partial").classed("highlight-partial", false);
        graphic.selectAll(".occ"+curr_occ.datum().occ_code)
            .classed("highlight", function(d) {
                if (d.agegrp == curr_age) { return true; }
                else { return false; } 
            })
            .classed("highlight-partial", function(d) {
                if (d.agegrp != curr_age) { return true; }
                else { return false; }
            });
    }
    
}
function mouseout() {
    graphic.selectAll(".highlight").classed("highlight", false);
    graphic.selectAll(".highlight-partial").classed("highlight-partial", false);
}
function clicked() {
    if (t != null) t.stop();
    
    var curr_age = Math.floor(xAge.invert(d3.mouse(this)[0]));
    var curr_rank = Math.floor(yRank.invert(d3.mouse(this)[1]));
    var curr_occ = d3.select( (".agegrp"+curr_age) + (".rank"+curr_rank) );
    
    if (!curr_occ.empty()) {
        var curr_occ_code = curr_occ.datum().occ_code;
        highlightOcc(curr_occ_code);
        
        d3.select("#newsearch-input").style("background", "#e0e0e0")
            .transition().duration(600)
            .style("background", "#ffffff");
        
        if (d3.select('#newsearch-input').node().value != occ_codes[curr_occ_code]) {
            d3.select('#newsearch-input').node().value = occ_codes[curr_occ_code];
        }
    }
}






function highlightOcc(occ_code) {
    d3.timerFlush();
    // graphic.selectAll(".occlabel.locked").classed("locked", false);
    // graphic.selectAll(".occ"+occ_code).classed("locked", true);
    
    d3.selectAll("#topocc .current").classed("current", false);
    
    // var max_delay_time = 0;
    var total_duration = 600;
    
    d3.range(4, 15).forEach(function(agegrp) {
        var origin = d3.select(".agegrp"+agegrp+".locked");
        var destination = d3.select(".occ"+occ_code+".agegrp"+agegrp);
        
        var origin_rank,
            destination_rank;
        
        // There's an existing locked occ.
        if (!origin.empty() && !destination.empty()) {            
            origin_rank = origin.datum().ranking;
            destination_rank = destination.datum().ranking;
        }
        
        // There's no existing locked occ.
        else if (origin.empty() && !destination.empty()) {
            origin_rank = max_ranking + 1;
            destination_rank = destination.datum().ranking;
            // destination.classed("locked", true);
        }
        
        // Destination doesn't exist in age group.
        else if (!origin.empty() && destination.empty()) {
            origin_rank = origin.datum().ranking;
            destination_rank = max_ranking + 1;
            // origin.classed("locked", false);
        }
        
        
        var occ_inbetween = d3.selectAll(".agegrp"+agegrp)
            .filter(function(d) {
                return between(d.ranking, origin_rank, destination_rank);
            });
    
        var delay_per_occ = total_duration / Math.abs(origin_rank - destination_rank);
        
        if (origin_rank != destination_rank) {
            origin.classed("locked", false);
        }
                
        occ_inbetween.each(function(d,i) {
            var curr_occ = d3.select(this);
            var delay_time = delay_per_occ * Math.abs(d.ranking - origin_rank);
            
            d3.timeout(function() {
                curr_occ.classed("current", true);
            }, delay_time);
        
            d3.timeout(function() {
                curr_occ.classed("current", false);
            }, delay_time+10);
            
            if (d.ranking == destination_rank) {
                d3.timeout(function() {
                        curr_occ.classed("locked", true);
                    }, delay_time+10);
            }
        });
    
    });
    
    d3.timeout(function() {
        graphic.selectAll(".occlabel.locked")
            .classed("locked", d => d.occ_code == occ_code);
    }, total_duration+10);
    
}


// Checks if value is between a and b. a might be >b or <b.
function between(value, a, b) {
    
    if (a > b) {
        return value >= b && value <= a;
    } else {
        return value >= a && value <= b;
    }
    
}


function getRandomOcc() {
    var occ_keys = d3.keys(occ_codes);
    var random_index = Math.floor(Math.random() * occ_keys.length);
    return occ_keys[random_index];
}


activateFunctions[0] = showOne;
activateFunctions[1] = showTwoThree;
activateFunctions[2] = showTopMore;
activateFunctions[3] = showRandomRanks;
activateFunctions[4] = showFirst;
activateFunctions[5] = showRates;
activateFunctions[6] = showRanksAgain;
activateFunctions[7] = showSecond;
activateFunctions[8] = showThird;
activateFunctions[9] = showFourth;
activateFunctions[10] = showFifth;
activateFunctions[11] = showSearch;






