var SettingsPane = React.createClass({
    onChange: function() {
        var dataset = this.props.dataset;
        dataset.name = React.findDOMNode(this.refs.name).value;
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
                        <select>
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
                        <input type="range" />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Stroke Weight</th>
                    <td>
                        <input type="range" />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Stroke Color</th>
                    <td>
                        <input type="color" />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Stroke Opacity</th>
                    <td>
                        <input type="range" />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Fill Color</th>
                    <td>
                        <input type="color" />
                    </td>
                </tr>
            );
            markerSettings.push(
                <tr>
                    <th>Fill Opacity</th>
                    <td>
                        <input type="range" />
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
                        <input type="checkbox" />
                    </td>
                </tr>
            );
            polylineSettings.push(
                <tr>
                    <th>Stroke Weight</th>
                    <td>
                        <input type="range" />
                    </td>
                </tr>
            );
            polylineSettings.push(
                <tr>
                    <th>Stroke Color</th>
                    <td>
                        <input type="color" />
                    </td>
                </tr>
            );
            polylineSettings.push(
                <tr>
                    <th>Stroke Opacity</th>
                    <td>
                        <input type="range" />
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
                        <input type="range" />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Stroke Color</th>
                    <td>
                        <input type="color" />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Stroke Opacity</th>
                    <td>
                        <input type="range" />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Fill Color</th>
                    <td>
                        <input type="color" />
                    </td>
                </tr>
            );
            polygonSettings.push(
                <tr>
                    <th>Fill Opacity</th>
                    <td>
                        <input type="range" />
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
                        <input type="checkbox" />
                    </td>
                </tr>
            );
            heatmapSettings.push(
                <tr>
                    <th>Radius</th>
                    <td>
                        <input type="range" />
                    </td>
                </tr>
            );
            heatmapSettings.push(
                <tr>
                    <th>Opacity</th>
                    <td>
                        <input type="range" />
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
