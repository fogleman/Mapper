var _ = require("underscore");
var React = require("react");
var theMap = require("./the-map");
var directions = require("./directions");

function NewMapComponent(cls, isInstance) {
    return React.createClass({
        getInitialState: function() {
            var obj;
            if (isInstance) {
                obj = cls;
            } else {
                obj = new cls();
            }
            obj.component = this;
            return obj;
        },
        componentDidMount: function() {
            _.each(this.props.events, function(listener, name) {
                google.maps.event.addListener(this.state, name, function(e) {
                    listener(e, this);
                }.bind(this));
            }.bind(this));
        },
        componentWillUnmount: function() {
            google.maps.event.clearInstanceListeners(this.state);
            this.state.setMap(null);
        },
        render: function() {
            var options = this.delta(this.previous || {}, this.props.options);
            this.previous = this.props.options;
            this.state.setOptions(options);
            return <div>{this.props.children}</div>
        },
        delta: function(before, after) {
            var result = {};
            _.each(after, function(value, key) {
                if (!_.isEqual(value, before[key])) {
                    result[key] = value;
                }
            });
            return result;
        },
    });
}

var BaseMap = NewMapComponent(theMap, true);
var Marker = NewMapComponent(google.maps.Marker);
var Polyline = NewMapComponent(google.maps.Polyline);
var Polygon = NewMapComponent(google.maps.Polygon);
var Heatmap = NewMapComponent(google.maps.visualization.HeatmapLayer);
var DirectionsRenderer = NewMapComponent(google.maps.DirectionsRenderer);

var Map = React.createClass({
    render: function() {
        var options = {
            zoom: this.props.zoom,
            center: {lat: this.props.latitude, lng: this.props.longitude},
        }
        return (
            <BaseMap options={options}>
                {this.props.datasets.map(this.renderDataset)}
            </BaseMap>
        );
    },
    renderDataset: function(dataset) {
        var result = [];
        if (!dataset.visible) {
            return result;
        }
        if (dataset.markerOptions.visible) {
            var markerOptions = dataset.getMarkerOptions();
            for (var i = 0; i < dataset.points.length; i++) {
                var options = {
                    map: theMap,
                    position: dataset.points[i],
                    icon: markerOptions.icon,
                };
                var marker = (
                    <Marker
                        options={options} />
                );
                result.push(marker);
            }
        }
        if (dataset.polylineOptions.visible) {
            var options = _.extendOwn({}, dataset.polylineOptions, {
                map: theMap,
                path: dataset.points,
            });
            var polyline = (
                <Polyline
                    options={options} />
            );
            result.push(polyline);
        }
        if (dataset.polygonOptions.visible) {
            var options = _.extendOwn({}, dataset.polygonOptions, {
                map: theMap,
                paths: dataset.points,
            });
            var polygon = (
                <Polygon
                    options={options} />
            );
            result.push(polygon);
        }
        if (dataset.heatmapOptions.visible) {
            var options = _.extendOwn({}, dataset.heatmapOptions, {
                map: theMap,
                data: dataset.points,
            });
            var heatmap = (
                <Heatmap
                    options={options} />
            );
            result.push(heatmap);
        }
        if (dataset.directionsOptions.visible) {
            var options = _.extendOwn({}, dataset.directionsOptions, {
                map: theMap,
                path: dataset.points,
            });
            var directions = (
                <Polyline
                    options={options} />
            );
            result.push(this.createPath(dataset));
        }
        return result;
    },
    createPath: function(dataset) {
        var result = [];
        var points = dataset.points;
        for (var i = 1; i < points.length; i++) {
            result.push(this.createLeg(dataset, points[i - 1], points[i]));
        }
        return result;
    },
    createLeg: function(dataset, a, b) {
        var response = directions.getDirections(a, b);
        if (!response) {
            return null;
        }
        var options = {
            map: theMap,
            directions: response,
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: dataset.directionsOptions,
        };
        return <DirectionsRenderer options={options} />
    },
});

module.exports = Map;
