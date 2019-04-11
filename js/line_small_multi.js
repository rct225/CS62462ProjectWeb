
// set the dimensions and margins of the graph
var margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 210 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;

//Read the data
d3.tsv("./master_list_with_year.tsv").then(function(data) {
    data.forEach(function(d) {
        d.key = parseInt(d.key);
        d.danceability = parseFloat(d.danceability);
        d.loudness = parseFloat(d.loudness);
        d.energy = parseFloat(d.energy);
        d.loudness	 = parseFloat(d.loudness);
        d.mode = parseFloat(d.mode);
        d.speechiness = parseFloat(d.speechiness);
        d.acousticness = parseFloat(d.acousticness);
        d.instrumentalness = parseFloat(d.instrumentalness);
        d.liveness = parseFloat(d.liveness);
        d.valence = parseFloat(d.valence);
       // console.log(d.year);
       // console.log(d.danceability);
    })
    gby = d3.nest()
        .key(function(d) { return d.year;})
        .rollup( function(d) {
            return {
                meanKey:  d3.mean(d, function(g) { return g.key; }),
                meanDanceability:  d3.mean(d, function(g) { return g.danceability; }),
                meanLoudness:  d3.mean(d, function(g) { return g.loudness; }),
                meanEnergy:  d3.mean(d, function(g) { return g.energy; }),
                meanLoudness:  d3.mean(d, function(g) { return g.loudness; }),
                meanMode:  d3.mean(d, function(g) { return g.mode; }),
                meanSpeechiness:  d3.mean(d, function(g) { return g.speechiness; }),
                meanAcousticness:  d3.mean(d, function(g) { return g.acousticness; }),
                meanInstrumentalness:  d3.mean(d, function(g) { return g.instrumentalness; }),
                meanLiveness:  d3.mean(d, function(g) { return g.liveness; }),
                meanValence:  d3.mean(d, function(g) { return g.valence; })
            }
        }).entries(data);
    return gby;
})
//     .then(function(value) {
//     return Promise.all(value.map(function (results) {
//         return [results];
//     }))
// })
    .then(function(list) {
    console.log(list);
});