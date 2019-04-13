
// set the dimensions and margins of the graph
var margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 210 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;

var startYear = 1958;
var endYear = 2018;

var startPos = 1;
var endPos = 10;

// var year = 2011;

change(startYear, endYear, startPos, endPos);

function update() {
    var e1 = document.getElementById("mySelect1");
    startYear = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById("mySelect2");
    endYear = e2.options[e2.selectedIndex].value;

    var e3 = document.getElementById("mySelect3");
    startPos = e3.options[e3.selectedIndex].value;
    var e4 = document.getElementById("mySelect4");
    endPos = e4.options[e4.selectedIndex].value;

    d3.select("#gauge2").select("svg").remove();
    var t = d3.select("#my_dataviz").selectAll("svg");
    // console.log(t);
    t.remove();
    change(startYear, endYear, startPos, endPos);
}

//Read the data
function change(startYear, endYear, startPos, endPos) {

    d3.tsv("./master_list_with_year.tsv").then(function (data) {

        data.forEach(function (d) {
            d.key = parseInt(d.key);
            d.danceability = parseFloat(d.danceability);
            d.loudness = parseFloat(d.loudness);
            d.energy = parseFloat(d.energy);
            d.loudness = parseFloat(d.loudness);
            d.mode = parseFloat(d.mode);
            d.speechiness = parseFloat(d.speechiness);
            d.acousticness = parseFloat(d.acousticness);
            d.instrumentalness = parseFloat(d.instrumentalness);
            d.liveness = parseFloat(d.liveness);
            d.valence = parseFloat(d.valence);
            d.peak_position = parseInt(d.peak_position);
            d.negative_sentiments = parseInt(d.negative_sentiments);
            d.positive_sentiments = parseInt(d.positive_sentiments);
            d.neutral_sentiments = parseInt(d.neutral_sentiments);
            // console.log(d.year);
            // console.log(d.danceability);
        });

        var dataPositionFiltered = data.filter(function (d) {
            var peak_pos = parseInt(d.peak_position);
            return (peak_pos >= startPos && peak_pos <= endPos);
        });

        var dataYearFiltered = dataPositionFiltered.filter(function (d) {
            var year = parseInt(d.year);
            return (year >= startYear && year <= endYear);
        });

        var allwords = "";
        var dataWordFreq = dataYearFiltered.map( function (d) {
            var words = d.stemmed_words;
            // console.log(words);
            allwords += words;
            // return getWordFreq(words);
        });

        var allWordFreq = getWordFreq(allwords);
        // console.log(dataWordFreq);
        console.log(allWordFreq);

        var songCharacteristicsByYear = d3.nest()
            .key(function (d) {
                return d.year;
            })
            .sortKeys(d3.ascending)
            .rollup(function (d) {
                return {
                    // meanKey:  d3.mean(d, function(g) { return g.key; }),
                    meanDanceability: d3.mean(d, function (g) {
                        return g.danceability;
                    }),
                    meanLoudness: d3.mean(d, function (g) {
                        return g.loudness;
                    }),
                    meanEnergy: d3.mean(d, function (g) {
                        return g.energy;
                    }),
                    meanLoudness: d3.mean(d, function (g) {
                        return g.loudness;
                    }),
                    meanMode: d3.mean(d, function (g) {
                        return g.mode;
                    }),
                    meanSpeechiness: d3.mean(d, function (g) {
                        return g.speechiness;
                    }),
                    meanAcousticness: d3.mean(d, function (g) {
                        return g.acousticness;
                    }),
                    meanInstrumentalness: d3.mean(d, function (g) {
                        return g.instrumentalness;
                    }),
                    meanLiveness: d3.mean(d, function (g) {
                        return g.liveness;
                    }),
                    meanValence: d3.mean(d, function (g) {
                        return g.valence;
                    })
                }
            }).entries(dataYearFiltered);


        var sentimentsPerPeriod = d3.mean(dataYearFiltered, function (g) {
            return g.positive_sentiments - g.negative_sentiments;
        });

        return [songCharacteristicsByYear, sentimentsPerPeriod, allWordFreq];
    }).then(function (list) {

        // console.log(list);
        var sby = list[0];
        var characteristicData = [];
        var characteristicKeys = Object.keys(sby[0].value);
        sby.forEach(function (y) {
            characteristicKeys.forEach(function (v) {
                var tmp = { year: y.key };
                tmp.name = v;
                tmp.prop = y.value[v];
                characteristicData.push(tmp);
            })
        });

        sentimentData = list[1];
        drawGauges(sentimentData);

        var wordFreq = list[2];
        wordCloud(wordFreq);

        drawGraph(characteristicData);
    });
}

function drawGraph(data) {
// set the dimensions and margins of the graph



    var margin = { top: 30, right: 0, bottom: 30, left: 50 },
        width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function (d) {
            return d.name;
        })
        .entries(data);

    // What is the list of groups?
    allKeys = sumstat.map(function (d) {
        return d.key
    });

    // Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
    var svg = d3.select("#my_dataviz")
        .selectAll("svg")
        .data(sumstat)
        .enter()
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {
            return d.year;
        }))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(3));

    //Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return +d.prop;
        })])
        .range([height, 0]);


    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));

    // color palette
    var color = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(allKeys);

    // Draw the line
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", function (d) {
            return color(d.key);
        })
        .attr("stroke-width", 1.9)
        // .attr("class", "line")
        .attr("d", function (d) {
            return d3.line()
                .x(function (d) {
                    return x(d.year);
                })
                .y(function (d) {
                    return y(+d.prop);
                })
                (d.values)
        });


    // Add titles
    svg.append("text")
        .attr("text-anchor", "start")
        .attr("y", -5)
        .attr("x", 0)
        .text(function (d) {
            return d.key;
        })
        .style("fill", function (d) {
            return color(d.key);
        });
}

function drawGauges(data) {

    var svg2 = d3.select('#gauge2')
        .append('svg')
        .attr('width', 150)
        .attr('height', 150);

    var gauge2 = new window.d3SimpleGauge.SimpleGauge({
        barWidth: 10,
        needleRadius: 3,
        el: svg2.append('g'),
        height: 150,
        interval: [0, 10],
        sectionsCount: 3,
        width: 150,
    });

    gauge2.value  = data;

    // gauge2.value = data;

}

function getWordFreq(data) {
    var wordsArray = splitByWords(data);
    console.log(wordsArray);
    var wordsMap = createWordMap(wordsArray);
    var finalWordsArray = sortByCount(wordsMap);
    return finalWordsArray.slice(0, 21);
}

function splitByWords (text) {
    // split string by spaces (including spaces, tabs, and newlines)
    var wordsArray = text.split(/\s+/);
    return wordsArray;
}


function createWordMap (wordsArray) {

    // create map for word counts
    var wordsMap = {};
    /*
      wordsMap = {
        'Oh': 2,
        'Feelin': 1,
        ...
      }
    */
    wordsArray.forEach(function (key) {
        if (wordsMap.hasOwnProperty(key)) {
            wordsMap[key]++;
        } else {
            wordsMap[key] = 1;
        }
    });

    return wordsMap;

}


function sortByCount (wordsMap) {

    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function(key) {
        return {
            name: key,
            total: wordsMap[key]
        };
    });

    finalWordsArray.sort(function(a, b) {
        return b.total - a.total;
    });

    return finalWordsArray;

}

function wordCloud(words) {

    var wordArr = words.map(function(results, i) {
        return ['' + results.name + '', (words.length - i ) / 2];
    });

    console.log(wordArr);
    var wcOptions = {
        gridSize: 10,
        weightFactor: 10,
        fontFamily: 'Average, Times, serif',
        color: function() {
            return (['#000000', '#ffffff', '#44f'])[Math.floor(Math.random() * 3)]
        },
        backgroundColor: '#808080'
    }

    var options = Object.assign({}, wcOptions, {list: wordArr});
    return WordCloud(document.getElementById("stemmed-word-cloud"), options);
}