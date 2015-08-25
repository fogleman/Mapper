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

var Map = React.createClass({
    render: function() {
        var datasets = this.props.datasets.map(function(dataset) {
            return dataset.createMarkers();
        });
        var options = {
            zoom: this.props.zoom,
            center: {lat: this.props.latitude, lng: this.props.longitude},
        }
        return (
            <BaseMap options={options}>
                {datasets}
            </BaseMap>
        );
    },
});
