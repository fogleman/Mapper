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
    edit: function() {
    },
    render: function() {
        return (
            <div className="dataset-list-item">
                <div className="pull-left toggle">
                    <input
                        type="checkbox"
                        checked={this.props.dataset.visible}
                        onChange={this.toggle} />
                </div>
                <div className="pull-right">
                    <Glyphicon
                        glyph="edit"
                        onClick={this.edit} />
                    <Glyphicon
                        glyph="search"
                        onClick={this.fit} />
                    <Glyphicon
                        glyph="remove"
                        className="text-danger"
                        onClick={this.remove} />
                </div>
                <div className="name">
                    {this.props.dataset.name}
                </div>
            </div>
        );
    }
});

var DatasetList = React.createClass({
    render: function() {
        var items = this.props.datasets.map(function (dataset, i) {
            return <DatasetListItem
                key={i}
                toggle={this.props.toggle}
                remove={this.props.remove}
                fit={this.props.fit}
                dataset={dataset} />
        }, this);
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
