var DatasetListItem = React.createClass({
    remove: function() {
        console.log("remove");
    },
    render: function() {
        return (
            <div className="dataset-list-item">
                <Glyphicon glyph="remove" className="pull-right text-danger" onClick={this.remove} />
                <input type="checkbox" defaultChecked /> {this.props.name}
            </div>
        );
    }
});

var DatasetList = React.createClass({
    render: function() {
        var items = this.props.datasets.map(function (dataset, i) {
            return <DatasetListItem
                key={i}
                {...dataset} />
        });
        return (
            <div>
                <div className="sidebar-header">
                    <DatasetButton />
                    <h4>Datasets</h4>
                </div>
                {items}
            </div>
        );
    }
});
