var $ = require("jquery");
var JSZip = require("jszip");
var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var DatasetList = require("./dataset-list");
var SettingsPane = require("./settings-pane");
var Dataset = require("./dataset");
var Map = require("./map");
var theMap = require("./the-map");
var directions = require("./directions");

var Button = ReactBootstrap.Button;

var App = React.createClass({
    componentWillMount: function() {
        directions.listeners.push(this.forceUpdate.bind(this));
        window.addEventListener('hashchange', this.onHashChange);
        this.onHashChange();
    },
    getInitialState: function() {
        return {
            latitude: 39.50,
            longitude: -98.35,
            zoom: 4,
            datasets: [],
            selected: null,
            dirty: false,
        };
    },
    zip: function(data) {
        var zip = new JSZip();
        zip.file("data", data);
        var result = zip.generate({
            type: "base64",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            },
        });
        console.log(data.length, result.length);
        return result
    },
    unzip: function(data) {
        zip = new JSZip(data, {base64: true});
        return zip.file("data").asText()
    },
    dump: function() {
        return {
            datasets: this.state.datasets.map(function(dataset) {
                return dataset.dump();
            }),
        };
    },
    save: function() {
        this.clean();
        var data = {
            "public": false,
            "files": {
                "data": {
                    "content": this.zip(JSON.stringify(this.dump()))
                }
            }
        };
        var url = "https://api.github.com/gists";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                window.location.hash = data.id;
            }
        });
    },
    load: function(id) {
        this.clean();
        var url = "https://api.github.com/gists/" + id + "?callback=?";
        $.getJSON(url, function(data) {
            data = JSON.parse(this.unzip(data.data.files.data.content));
            var datasets = data.datasets.map(function(x) {
                var dataset = new Dataset();
                dataset.load(x);
                return dataset;
            });
            this.setState({
                datasets: datasets,
            });
            if (datasets) {
                var dataset = datasets[0];
                this.select(dataset);
                this.fit(dataset);
            }
        }.bind(this));
    },
    onHashChange: function() {
        var hash = window.location.hash.substr(1);
        if (hash) {
            this.load(hash);
        }
    },
    add: function(dataset) {
        this.dirty();
        var datasets = this.state.datasets;
        datasets.push(dataset);
        this.setState({
            datasets: datasets,
        });
        this.select(dataset);
        this.fit(dataset);
    },
    toggle: function(dataset) {
        this.dirty();
        dataset.visible = !dataset.visible;
        this.forceUpdate();
    },
    remove: function(dataset) {
        this.dirty();
        if (this.state.selected === dataset) {
            this.select(dataset);
        }
        var datasets = this.state.datasets;
        datasets.splice(datasets.indexOf(dataset), 1);
        this.setState({
            datasets: datasets,
        });
    },
    select: function(dataset) {
        if (this.state.selected === dataset) {
            dataset = null;
        }
        this.setState({
            selected: dataset,
        });
    },
    fit: function(dataset) {
        theMap.fitBounds(dataset.bounds);
        this.setState({
            selected: dataset,
        });
    },
    onChange: function() {
        this.dirty();
        this.forceUpdate();
    },
    clean: function() {
        this.setState({
            dirty: false,
        });
    },
    dirty: function() {
        window.location.hash = "";
        this.setState({
            dirty: true,
        });
    },
    render: function() {
        var disabled = !this.state.dirty;
        return (
            <div>
                <div className="left-sidebar">
                    <DatasetList
                        datasets={this.state.datasets}
                        selected={this.state.selected}
                        add={this.add}
                        toggle={this.toggle}
                        remove={this.remove}
                        select={this.select}
                        fit={this.fit} />
                    <SettingsPane
                        onChange={this.onChange}
                        dataset={this.state.selected} />
                    <div className="sidebar-header">
                        <h4>Sharing</h4>
                    </div>
                    <div className="sharing">
                        <Button onClick={this.save} disabled={disabled}>Save</Button>
                    </div>
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
