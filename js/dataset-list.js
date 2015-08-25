var DatasetListItem = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.name}
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
