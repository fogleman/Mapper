var DatasetListItem = React.createClass({
    toggle: function() {
        this.props.toggle(this.props.dataset);
    },
    remove: function() {
        this.props.remove(this.props.dataset);
    },
    fit: function() {
        this.props.fit(this.props.dataset);
    },
    select: function() {
        this.props.select(this.props.dataset);
    },
    render: function() {
        var className = "dataset-list-item";
        if (this.props.selected) {
            className += " selected";
        }
        return (
            <div className={className}>
                <div className="pull-left toggle">
                    <input
                        type="checkbox"
                        checked={this.props.dataset.visible}
                        onChange={this.toggle} />
                </div>
                <div className="pull-right">
                    <Glyphicon
                        glyph="search"
                        onClick={this.fit} />
                    <Glyphicon
                        glyph="remove"
                        className="text-danger"
                        onClick={this.remove} />
                </div>
                <div className="name">
                    <span onClick={this.select}>{this.props.dataset.name || "(Untitled)"}</span>
                </div>
            </div>
        );
    }
});

var DatasetList = React.createClass({
    render: function() {
        var items = this.props.datasets.map(function (dataset, i) {
            var selected = this.props.selected === dataset;
            return <DatasetListItem
                key={i}
                selected={selected}
                toggle={this.props.toggle}
                remove={this.props.remove}
                select={this.props.select}
                fit={this.props.fit}
                dataset={dataset} />
        }, this);
        if (items.length === 0) {
            items = (
                <p className="sidebar-message">
                    <Glyphicon glyph="info-sign" /> Add a dataset to display data on the map.
                </p>
            );
        }
        return (
            <div>
                <div className="sidebar-header">
                    <DatasetButton
                        add={this.props.add} />
                    <h4>Datasets</h4>
                </div>
                {items}
            </div>
        );
    }
});
