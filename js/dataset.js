var Dataset = function(name, data) {
    this.name = name;
    this.data = data;
    this.visible = true;
    this.points = this.parse(data);
    this.bounds = new google.maps.LatLngBounds();
    this.points.map(function(x) {
        this.bounds.extend(x);
    }, this);
};

Dataset.prototype = {
    parse: function(data) {
        var result = [];
        var lines = data.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var tokens = lines[i].split(/[ ,\t]+/);
            if (tokens.length >= 2) {
                var lat = parseFloat(tokens[0]);
                var lng = parseFloat(tokens[1]);
                result.push(new google.maps.LatLng(lat, lng));
            }
        }
        return result;
    },
};
