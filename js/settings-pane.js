var SettingsPane = React.createClass({
    getInitialState: function() {
        return {
            name: "",
        };
    },
    onChange: function() {
        this.setState({
            name: this.refs.name.getValue(),
        });
    },
    render: function() {
        return (
            <div>
                <div className="sidebar-header">
                    <h4>Settings</h4>
                </div>
                <div className="sidebar-subheader">
                    <h4>General</h4>
                </div>
                <div className="settings">
                    <Input
                        type="text"
                        placeholder="Enter a name for this dataset."
                        ref="name"
                        value={this.state.name}
                        onChange={this.onChange} />
                </div>
                <div className="sidebar-subheader">
                    <h4>Marker</h4>
                </div>
                <div className="settings">
                    <label>Symbol</label>
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
                    <label>Size</label>
                    <input type="range" />
                    <label>Stroke Weight</label>
                    <input type="range" />
                    <label>Stroke Color</label>
                    <input type="color" />
                    <label>Stroke Opacity</label>
                    <input type="range" />
                    <label>Fill Color</label>
                    <input type="color" />
                    <label>Fill Opacity</label>
                    <input type="range" />
                </div>
                <div className="sidebar-subheader">
                    <h4>Polyline</h4>
                </div>
                <div className="sidebar-subheader">
                    <h4>Polygon</h4>
                </div>
                <div className="sidebar-subheader">
                    <h4>Heatmap</h4>
                </div>
            </div>
        );
    }
});
