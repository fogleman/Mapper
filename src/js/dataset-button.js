var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Dataset = require("./dataset");

var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var Input = ReactBootstrap.Input;
var Modal = ReactBootstrap.Modal;

var DatasetButton = React.createClass({
    getInitialState: function() {
        return {
            showModal: false,
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
            data: "",
        });
    },
    submit: function() {
        var dataset = new Dataset();
        dataset.data = this.state.data;
        dataset.init();
        this.props.add(dataset);
        this.close();
    },
    onChange: function() {
        this.setState({
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
                            type="textarea"
                            label="Data"
                            rows="5"
                            autoFocus={true}
                            placeholder="Paste your lat/lng data points here."
                            ref="data"
                            value={this.state.data}
                            onChange={this.onChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Cancel</Button>
                        <Button onClick={this.submit} bsStyle="primary" type="submit">Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    },
});

module.exports = DatasetButton;
