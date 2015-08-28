var DatasetButton = React.createClass({
    getInitialState: function() {
        return {
            showModal: false,
            name: "",
            data: "",
        };
    },
    close: function() {
        this.setState({
            showModal: false,
        });
    },
    open: function() {
        this.setState({
            showModal: true,
            name: "",
            data: "",
        });
    },
    submit: function() {
        var name = this.state.name || "Untitled";
        var data = this.state.data;
        var dataset = new Dataset(name, data);
        theApp.addDataset(dataset);
        this.close();
    },
    onChange: function() {
        this.setState({
            name: this.refs.name.getValue(),
            data: this.refs.data.getValue(),
        });
    },
    render: function() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="xsmall" className="pull-right" onClick={this.open}>
                    <Glyphicon glyph="plus" />
                </Button>
                <Modal show={this.state.showModal} onHide={this.close} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Dataset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            type="text"
                            label="Name"
                            placeholder="Enter a name for this dataset."
                            ref="name"
                            value={this.state.name}
                            onChange={this.onChange} />
                        <Input
                            type="textarea"
                            label="Data"
                            placeholder="Paste your lat/lng data points here."
                            ref="data"
                            value={this.state.data}
                            onChange={this.onChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Cancel</Button>
                        <Button onClick={this.submit} bsStyle="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    },
});
