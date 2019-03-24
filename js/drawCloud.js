d3.csv("everlong.csv",function(data) {

    var color = d3.scale.linear()
        .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
        .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

    d3.layout.cloud().size([300, 300])
        .words(data)
        .rotate(0)
        .text(function (d) {
            return d.word;
        })
        .fontSize(function (d) {
            return d.frequency * 10;
        })
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("#stemmed-word-cloud").append("g")
            .attr("class", "wordcloud")
            .attr("transform", "translate(125,175)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("fill", function (d, i) {
                return color(i);
            })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });
    }

});