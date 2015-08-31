var SettingsPane = React.createClass({
    onChange: function() {
        var dataset = this.props.dataset;
        dataset.name = React.findDOMNode(this.refs.name).value;
        if (dataset.markerOptions.visible) {
            dataset.markerOptions.symbol = React.findDOMNode(this.refs.markerSymbol).value;
            dataset.markerOptions.size = React.findDOMNode(this.refs.markerSize).value;
            dataset.markerOptions.strokeWeight = React.findDOMNode(this.refs.markerStrokeWeight).value;
            dataset.markerOptions.strokeColor = React.findDOMNode(this.refs.markerStrokeColor).value;
            dataset.markerOptions.strokeOpacity = React.findDOMNode(this.refs.markerStrokeOpacity).value;
            dataset.markerOptions.fillColor = React.findDOMNode(this.refs.markerFillColor).value;
            dataset.markerOptions.fillOpacity = React.findDOMNode(this.refs.markerFillOpacity).value;
        }
        if (dataset.polylineOptions.visible) {
            dataset.polylineOptions.geodesic = React.findDOMNode(this.refs.polylineGeodesic).checked;
            dataset.polylineOptions.strokeWeight = React.findDOMNode(this.refs.polylineStrokeWeight).value;
            dataset.polylineOptions.strokeColor = React.findDOMNode(this.refs.polylineStrokeColor).value;
            dataset.polylineOptions.strokeOpacity = React.findDOMNode(this.refs.polylineStrokeOpacity).value;
        }
        if (dataset.polygonOptions.visible) {
            dataset.polygonOptions.strokeWeight = React.findDOMNode(this.refs.polygonStrokeWeight).value;
            dataset.polygonOptions.strokeColor = React.findDOMNode(this.refs.polygonStrokeColor).value;
            dataset.polygonOptions.strokeOpacity = React.findDOMNode(this.refs.polygonStrokeOpacity).value;
            dataset.polygonOptions.fillColor = React.findDOMNode(this.refs.polygonFillColor).value;
            dataset.polygonOptions.fillOpacity = React.findDOMNode(this.refs.polygonFillOpacity).value;
        }
        if (dataset.heatmapOptions.visible) {
            dataset.heatmapOptions.dissipating = React.findDOMNode(this.refs.heatmapDissipating).checked;
            dataset.heatmapOptions.radius = parseFloat(React.findDOMNode(this.refs.heatmapRadius).value);
            dataset.heatmapOptions.opacity = React.findDOMNode(this.refs.heatmapOpacity).value;
        }
        dataset.markerOptions.visible = React.findDOMNode(this.refs.markerVisible).checked;
        dataset.polylineOptions.visible = React.findDOMNode(this.refs.polylineVisible).checked;
        dataset.polygonOptions.visible = React.findDOMNode(this.refs.polygonVisible).checked;
        dataset.heatmapOptions.visible = React.findDOMNode(this.refs.heatmapVisible).checked;
        this.props.onChange();
    },
    render: function() {
        if (!this.props.dataset) {
            return (
                <div>
                    <div className="sidebar-header">
                        <h4>Settings</h4>
                    </div>
                    <p className="settings-message">
                        Select a dataset to configure its settings.
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
                            min="1"
                            max="32"
                            ref="markerSize"
                            value={this.props.dataset.markerOptions.size}
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
                            max="8"
                            step="0.5"
                            ref="markerStrokeWeight"
                            value={this.props.dataset.markerOptions.strokeWeight}
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
                            max="8"
                            step="0.5"
                            ref="polylineStrokeWeight"
                            value={this.props.dataset.polylineOptions.strokeWeight}
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
                            max="8"
                            step="0.5"
                            ref="polygonStrokeWeight"
                            value={this.props.dataset.polygonOptions.strokeWeight}
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
                            step="0.01"
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
