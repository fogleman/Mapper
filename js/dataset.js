var Dataset = function() {
    this.name = "";
    this.data = "";
    this.visible = true;

    this.markerOptions = {
        visible: true,
        symbol: "default",
        size: 8,
        strokeWeight: 1,
        strokeColor: "#000000",
        strokeOpacity: 1,
        fillColor: "#ff0000",
        fillOpacity: 0.75,
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
    dump: function() {
        return {
            name: this.name,
            data: this.data,
            visible: this.visible,
            markerOptions: this.markerOptions,
            polylineOptions: this.polylineOptions,
            polygonOptions: this.polygonOptions,
            heatmapOptions: this.heatmapOptions,
        };
    },
    load: function(x) {
        this.name = x.name;
        this.data = x.data;
        this.visible = x.visible;
        this.markerOptions = x.markerOptions;
        this.polylineOptions = x.polylineOptions;
        this.polygonOptions = x.polygonOptions;
        this.heatmapOptions = x.heatmapOptions;
        this.init();
    },
    init: function() {
        this.points = this.parse(this.data);
        this.bounds = new google.maps.LatLngBounds();
        this.points.map(function(x) {
            this.bounds.extend(x);
        }, this);
    },
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
    getMarkerOptions: function() {
        var opts = this.markerOptions;
        var icon = null;
        if (this.markerOptions.symbol !== "default") {
            icon = {
                url: "http://www.michaelfogleman.com/symbols/?" + $.param(opts).replace(/%23/g, ""),
                anchor: new google.maps.Point(opts.size, opts.size),
            };
        }
        return {
            visible: opts.visible,
            icon: icon,
        };
    },
};
