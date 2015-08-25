var Dataset = function(name, data) {
    this.name = name;
    this.data = data;
    this.points = this.parse(data);
};

Dataset.prototype = {
    parse: function(data) {
        var result = [];
        var lines = data.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var tokens = lines[i].split(/[ ,\t]+/);
            if (tokens.length === 2) {
                result.push({
                    lat: parseFloat(tokens[0]),
                    lng: parseFloat(tokens[1]),
                })
            }
        }
        return result;
    },
    createMarkers: function() {
        var result = [];
        for (var i = 0; i < this.points.length; i++) {
            var options = {
                map: theMap,
                position: this.points[i],
            };
            var marker = (
                <Marker
                    key={i}
                    options={options} />
            );
            result.push(marker);
        }
        return result;
    },
};
