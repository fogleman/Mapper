var Dataset = function(name, data) {
    this.name = name;
    this.data = data;
    this.visible = true;

    this.points = this.parse(data);
    this.bounds = new google.maps.LatLngBounds();
    this.points.map(function(x) {
        this.bounds.extend(x);
    }, this);

    var params = {
        symbol: "circle",
        size: 8,
        strokeWeight: 1,
        strokeColor: "ff0000",
        strokeOpacity: 1,
        fillColor: "ff0000",
        fillOpacity: 0.3,
    };

    this.markerOptions = {
        visible: true,
        icon: {
            url: "http://127.0.0.1:5000/?" + $.param(params),
            anchor: new google.maps.Point(params.size, params.size),
        },
    };

    this.polylineOptions = {
        visible: false,
        geodesic: true,
        strokeWeight: 3,
        strokeColor: "#000000",
        strokeOpacity: 1,
    };

    this.polygonOptions = {
        visible: false,
        strokeWeight: 0,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
    };

    this.heatmapOptions = {
        visible: false,
        dissipating: true,
        radius: 10,
        opacity: 0.6,
    };
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
