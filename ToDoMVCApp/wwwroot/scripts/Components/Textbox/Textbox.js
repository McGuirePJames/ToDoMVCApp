"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TextField_1 = require("@material-ui/core/TextField");
require("../TextBox/_TextBox.scss");
class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {};
        this.togglePasswordReveal = this.togglePasswordReveal.bind(this);
    }
    addStyling() {
        const materialInputContainer = this.textInput.current;
        let styling = "";
        if (materialInputContainer !== null) {
            for (let i = 0; i < materialInputContainer.childNodes.length; i++) {
                let child = materialInputContainer.childNodes[i];
                if (child.classList.contains("first-icon")) {
                    styling += "padding-left: 35px;";
                }
                else if (child.classList.contains("second-icon")) {
                    styling += "padding-right: 35px;";
                }
            }
            const input = materialInputContainer.getElementsByTagName('input')[0];
            input.setAttribute('style', styling);
        }
    }
    addClassNameToInput() {
        //needed a way to figure out when to add padding to input because of icons being present.  Since icons are absolute positioned.
        const materialInputContainer = this.textInput.current;
        if (this.props.leftIconClassName !== null) {
            materialInputContainer.classList.add("has-left-icon");
        }
        if (this.props.rightIconClassName !== null) {
            materialInputContainer.classList.add("has-right-icon");
        }
    }
    togglePasswordReveal() {
        const materialInputContainer = this.textInput.current;
        const input = materialInputContainer.getElementsByTagName('input')[0];
        if (input.type === "text") {
            input.setAttribute('type', 'password');
        }
        else if (input.type === "password") {
            input.setAttribute('type', 'text');
        }
    }
    componentDidMount() {
        this.addStyling();
        this.addClassNameToInput();
    }
    render() {
        return (React.createElement("div", { className: "material-input", ref: this.textInput },
            this.props.leftIconClassName !== null ?
                (React.createElement("div", { className: "icon-container first-icon" },
                    React.createElement("i", { className: this.props.leftIconClassName, "aria-hidden": "true" }))) : null,
            React.createElement(TextField_1.default, { id: this.props.id, className: this.props.class, label: this.props.label, type: this.props.inputType, multiline: this.props.multiline, rows: this.props.rows, margin: "normal", autoComplete: "on" }),
            this.props.rightIconClassName !== null ?
                (React.createElement("div", { className: "icon-container second-icon" },
                    React.createElement("i", { className: this.props.rightIconClassName, "aria-hidden": "true", onClick: this.togglePasswordReveal }))) : null));
    }
}
exports.TextBox = TextBox;
exports.default = TextBox;
//# sourceMappingURL=Textbox.js.map