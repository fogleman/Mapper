var SYMBOL_CIRCLE = google.maps.SymbolPath.CIRCLE;
var SYMBOL_SQUARE = "M 1 1 L 1 -1 -1 -1 -1 1 z";
var SYMBOL_TRIANGLE = "M 0 -1 L 1 1 -1 1 z";
var SYMBOL_X = "M -1 -1 L 1 1 M -1 1 L 1 -1";
var SYMBOL_PLUS = "M -1 0 L 1 0 M 0 -1 L 0 1";
var SYMBOL_DIAMOND = "M -1 0 L 0 -1 1 0 0 1 z";

var SYMBOLS = [
    SYMBOL_CIRCLE,
    SYMBOL_SQUARE,
    SYMBOL_TRIANGLE,
    SYMBOL_X,
    SYMBOL_PLUS,
    SYMBOL_DIAMOND,
];

var MARKERS = 1;
var POLYLINE = 2;
var POLYLINE_MARKERS = 3;

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

var theMap = new google.maps.Map(document.getElementById("map"));
var BaseMap = NewMapComponent(theMap, true);
var Marker = NewMapComponent(google.maps.Marker);
var Polyline = NewMapComponent(google.maps.Polyline);

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
        if (!dataset.visible) {
            return null;
        }
        var result = [];
        // var options = {
        //     map: theMap,
        //     path: dataset.points,
        //     geodesic: true,
        //     strokeColor: "#000000",
        //     strokeOpacity: 1,
        //     strokeWeight: 6,
        //     zIndex: 10000,
        // };
        // var polyline = (
        //     <Polyline
        //         options={options} />
        // );
        // result.push(polyline);
        // var options = {
        //     map: theMap,
        //     path: dataset.points,
        //     geodesic: true,
        //     strokeColor: "#ffffff",
        //     strokeOpacity: 1,
        //     strokeWeight: 4,
        //     zIndex: 10001,
        // };
        // var polyline = (
        //     <Polyline
        //         options={options} />
        // );
        // result.push(polyline);
        for (var i = 0; i < dataset.points.length; i++) {
            var options = {
                map: theMap,
                position: dataset.points[i],
                icon: {
                    path: SYMBOL_CIRCLE,
                    scale: 3,
                    strokeColor: "#000000",
                    strokeOpacity: 1,
                    strokeWeight: 0.5,
                    fillColor: "#ff0000",
                    fillOpacity: 1,
                },
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
});
