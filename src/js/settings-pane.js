var React = require("react");
var ReactBootstrap = require("react-bootstrap");

var Glyphicon = ReactBootstrap.Glyphicon;

var SettingsPane = React.createClass({
    getValue: function(x) {
        return React.findDOMNode(this.refs[x]).value;
    },
    getChecked: function(x) {
        return React.findDOMNode(this.refs[x]).checked;
    },
    f: function(power, multiplier, offset, x) {
        return multiplier * Math.pow(x, power) + offset;
    },
    g: function(power, multipler, offset, y) {
        return Math.pow((y - offset) / multipler, 1 / power);
    },
    onChange: function() {
        var dataset = this.props.dataset;
        dataset.name = this.getValue("name");
        if (dataset.markerOptions.visible) {
            dataset.markerOptions.symbol = this.getValue("markerSymbol");
            dataset.markerOptions.size = this.f(2, 99, 1, this.getValue("markerSize"));
            dataset.markerOptions.strokeWeight = this.f(2, 32, 0, this.getValue("markerStrokeWeight"));
            dataset.markerOptions.strokeColor = this.getValue("markerStrokeColor");
            dataset.markerOptions.strokeOpacity = this.getValue("markerStrokeOpacity");
            dataset.markerOptions.fillColor = this.getValue("markerFillColor");
            dataset.markerOptions.fillOpacity = this.getValue("markerFillOpacity");
        }
        if (dataset.polylineOptions.visible) {
            dataset.polylineOptions.geodesic = this.getChecked("polylineGeodesic");
            dataset.polylineOptions.strokeWeight = this.f(2, 32, 0, this.getValue("polylineStrokeWeight"));
            dataset.polylineOptions.strokeColor = this.getValue("polylineStrokeColor");
            dataset.polylineOptions.strokeOpacity = this.getValue("polylineStrokeOpacity");
        }
        if (dataset.polygonOptions.visible) {
            dataset.polygonOptions.strokeWeight = this.f(2, 32, 0, this.getValue("polygonStrokeWeight"));
            dataset.polygonOptions.strokeColor = this.getValue("polygonStrokeColor");
            dataset.polygonOptions.strokeOpacity = this.getValue("polygonStrokeOpacity");
            dataset.polygonOptions.fillColor = this.getValue("polygonFillColor");
            dataset.polygonOptions.fillOpacity = this.getValue("polygonFillOpacity");
        }
        if (dataset.heatmapOptions.visible) {
            dataset.heatmapOptions.dissipating = this.getChecked("heatmapDissipating");
            dataset.heatmapOptions.radius = parseInt(this.getValue("heatmapRadius"));
            dataset.heatmapOptions.opacity = this.getValue("heatmapOpacity");
        }
        dataset.markerOptions.visible = this.getChecked("markerVisible");
        dataset.polylineOptions.visible = this.getChecked("polylineVisible");
        dataset.polygonOptions.visible = this.getChecked("polygonVisible");
        dataset.heatmapOptions.visible = this.getChecked("heatmapVisible");
        this.props.onChange();
    },
    render: function() {
        if (!this.props.dataset) {
            return (
                <div>
                    <div className="sidebar-header">
                        <h4>Settings</h4>
                    </div>
                    <p className="sidebar-message">
                        <Glyphicon glyph="info-sign" /> Select a dataset to configure its settings.
                    </p>
                </div>
            );
        }

        var generalSettings = [];
        generalSettings.push(
            <tr>
                <th>Name</th>
                <td>
                    <input
                        type="text"
                        ref="name"
                        value={this.props.dataset.name}
                        onChange={this.onChange} />
                </td>
            </tr>
        );

        var markerSettings = [];
        if (this.props.dataset.markerOptions.visible) {
            markerSettings.push(
                <tr>
                    <th>Symbol</th>
                    <td>
                        <select
                            ref="markerSymbol"
                            value={this.props.dataset.markerOptions.symbol}
                            onChange={this.onChange}
                        >
                            <option value="default">Default</option>
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                            <option value="diamond">Diamond</option>
                            <option value="plus">Plus</option>
                            <option value="x">X</option>
                            <option value="marker">Marker</option>
                        </select>
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Size</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="markerSize"
                            value={this.g(2, 99, 1, this.props.dataset.markerOptions.size)}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Stroke Weight</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="markerStrokeWeight"
                            value={this.g(2, 32, 0, this.props.dataset.markerOptions.strokeWeight)}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Stroke Color</th>
                    <td>
                        <input
                            type="color"
                            ref="markerStrokeColor"
                            value={this.props.dataset.markerOptions.strokeColor}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Stroke Opacity</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="markerStrokeOpacity"
                            value={this.props.dataset.markerOptions.strokeOpacity}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Fill Color</th>
                    <td>
                        <input
                            type="color"
                            ref="markerFillColor"
                            value={this.props.dataset.markerOptions.fillColor}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Fill Opacity</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="markerFillOpacity"
                            value={this.props.dataset.markerOptions.fillOpacity}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
        }

        var polylineSettings = [];
        if (this.props.dataset.polylineOptions.visible) {
            polylineSettings.push(
                <tr>
                    <th>Geodesic</th>
                    <td>
                        <input
                            type="checkbox"
                            ref="polylineGeodesic"
                            checked={this.props.dataset.polylineOptions.geodesic}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            polylineSettings.push(
                <tr>
                    <th>Stroke Weight</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="polylineStrokeWeight"
                            value={this.g(2, 32, 0, this.props.dataset.polylineOptions.strokeWeight)}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            polylineSettings.push(
                <tr>
                    <th>Stroke Color</th>
                    <td>
                        <input
                            type="color"
                            ref="polylineStrokeColor"
                            value={this.props.dataset.polylineOptions.strokeColor}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            polylineSettings.push(
                <tr>
                    <th>Stroke Opacity</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="polylineStrokeOpacity"
                            value={this.props.dataset.polylineOptions.strokeOpacity}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
        }

        var polygonSettings = [];
        if (this.props.dataset.polygonOptions.visible) {
            polygonSettings.push(
                <tr>
                    <th>Stroke Weight</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="polygonStrokeWeight"
                            value={this.g(2, 32, 0, this.props.dataset.polygonOptions.strokeWeight)}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Stroke Color</th>
                    <td>
                        <input
                            type="color"
                            ref="polygonStrokeColor"
                            value={this.props.dataset.polygonOptions.strokeColor}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Stroke Opacity</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="polygonStrokeOpacity"
                            value={this.props.dataset.polygonOptions.strokeOpacity}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Fill Color</th>
                    <td>
                        <input
                            type="color"
                            ref="polygonFillColor"
                            value={this.props.dataset.polygonOptions.fillColor}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Fill Opacity</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="polygonFillOpacity"
                            value={this.props.dataset.polygonOptions.fillOpacity}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
        }

        var heatmapSettings = [];
        if (this.props.dataset.heatmapOptions.visible) {
            heatmapSettings.push(
                <tr>
                    <th>Dissipating</th>
                    <td>
                        <input
                            type="checkbox"
                            ref="heatmapDissipating"
                            checked={this.props.dataset.heatmapOptions.dissipating}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            heatmapSettings.push(
                <tr>
                    <th>Radius</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            ref="heatmapRadius"
                            value={this.props.dataset.heatmapOptions.radius}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
            heatmapSettings.push(
                <tr>
                    <th>Opacity</th>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            ref="heatmapOpacity"
                            value={this.props.dataset.heatmapOptions.opacity}
                            onChange={this.onChange} />
                    </td>
                </tr>
            );
        }

        return (
            <div>
                <div className="sidebar-header">
                    <h4>Settings</h4>
                </div>
                <table className="settings"><tbody>
                    <tr>
                        <th className="section" colSpan="2">
                            General
                        </th>
                    </tr>
                    {generalSettings}

                    <tr>
                        <th className="section" colSpan="2">
                            <input
                                type="checkbox"
                                ref="markerVisible"
                                checked={this.props.dataset.markerOptions.visible}
                                onChange={this.onChange} />
                            Marker
                        </th>
                    </tr>
                    {markerSettings}

                    <tr>
                        <th className="section" colSpan="2">
                            <input
                                type="checkbox"
                                ref="polylineVisible"
                                checked={this.props.dataset.polylineOptions.visible}
                                onChange={this.onChange} />
                            Polyline
                        </th>
                    </tr>
                    {polylineSettings}

                    <tr>
                        <th className="section" colSpan="2">
                            <input
                                type="checkbox"
                                ref="polygonVisible"
                                checked={this.props.dataset.polygonOptions.visible}
                                onChange={this.onChange} />
                            Polygon
                        </th>
                    </tr>
                    {polygonSettings}

                    <tr>
                        <th className="section" colSpan="2">
                            <input
                                type="checkbox"
                                ref="heatmapVisible"
                                checked={this.props.dataset.heatmapOptions.visible}
                                onChange={this.onChange} />
                            Heatmap
                        </th>
                    </tr>
                    {heatmapSettings}
                </tbody></table>
            </div>
        );
    }
});

module.exports = SettingsPane;
