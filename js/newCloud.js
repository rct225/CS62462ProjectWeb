var wcOptions = {
    gridSize: 10,
    weightFactor: 10,
    fontFamily: 'Average, Times, serif',
    color: function() {
        return (['#000000', '#ffffff', '#44f'])[Math.floor(Math.random() * 3)]
    },
    backgroundColor: '#808080'
}

d3.csv("everlong.csv",function(data) {
    {return data}
}).then(function(value) {
    return Promise.all(value.map(function(results) {
        return ['' + results.word + '', results.frequency];
    }))
}).then(function(list) {
    var options = Object.assign({}, wcOptions, {list: list});
    return WordCloud(document.getElementById("stemmed-word-cloud"), options);
});
