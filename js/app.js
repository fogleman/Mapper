var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var Input = ReactBootstrap.Input;
var Modal = ReactBootstrap.Modal;

var App = React.createClass({
    getInitialState: function() {
        return {
            latitude: 39.50,
            longitude: -98.35,
            zoom: 4,
            datasets: [],
        };
    },
    addDataset: function(dataset) {
        this.setState({
            datasets: this.state.datasets.concat(dataset),
        });
    },
    render: function() {
        return (
            <div>
                <div className="left-sidebar">
                    <DatasetList datasets={this.state.datasets} />
                </div>
                <div className="map-components">
                    <Map
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        zoom={this.state.zoom}
                        datasets={this.state.datasets} />
                </div>
            </div>
        );
    }
});

var theApp;

$(function() {
    theApp = React.render(
        <App />,
        document.getElementById("app")
    );
});
