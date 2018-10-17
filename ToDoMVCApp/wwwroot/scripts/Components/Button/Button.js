"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../Button/_Button.scss");
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("button", { className: "custom-button", type: "button", style: { backgroundColor: this.props.Color }, onClick: this.props.OnClick },
            React.createElement("span", null, this.props.Text)));
    }
}
exports.Button = Button;
exports.default = Button;
//# sourceMappingURL=Button.js.map