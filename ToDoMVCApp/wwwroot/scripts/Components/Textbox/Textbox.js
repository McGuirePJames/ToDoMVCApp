"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextField_1 = require("@material-ui/core/TextField");
require("../TextBox/_TextBox.scss");
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox(props) {
        var _this = _super.call(this, props) || this;
        _this.textInput = React.createRef();
        _this.state = {};
        _this.togglePasswordReveal = _this.togglePasswordReveal.bind(_this);
        return _this;
    }
    TextBox.prototype.addStyling = function () {
        var materialInputContainer = this.textInput.current;
        var styling = "";
        if (materialInputContainer !== null) {
            for (var i = 0; i < materialInputContainer.childNodes.length; i++) {
                var child = materialInputContainer.childNodes[i];
                if (child.classList.contains("first-icon")) {
                    styling += "padding-left: 35px;";
                }
                else if (child.classList.contains("second-icon")) {
                    styling += "padding-right: 35px;";
                }
            }
            var input = materialInputContainer.getElementsByTagName('input')[0];
            input.setAttribute('style', styling);
        }
    };
    TextBox.prototype.addClassNameToInput = function () {
        //needed a way to figure out when to add padding to input because of icons being present.  Since icons are absolute positioned.
        var materialInputContainer = this.textInput.current;
        if (this.props.leftIconClassName !== null) {
            materialInputContainer.classList.add("has-left-icon");
        }
        if (this.props.rightIconClassName !== null) {
            materialInputContainer.classList.add("has-right-icon");
        }
    };
    TextBox.prototype.togglePasswordReveal = function () {
        var materialInputContainer = this.textInput.current;
        var input = materialInputContainer.getElementsByTagName('input')[0];
        if (input.type === "text") {
            input.setAttribute('type', 'password');
        }
        else if (input.type === "password") {
            input.setAttribute('type', 'text');
        }
    };
    TextBox.prototype.componentDidMount = function () {
        this.addStyling();
        this.addClassNameToInput();
    };
    TextBox.prototype.render = function () {
        return (React.createElement("div", { className: "material-input", ref: this.textInput },
            this.props.leftIconClassName !== null ?
                (React.createElement("div", { className: "icon-container first-icon" },
                    React.createElement("i", { className: this.props.leftIconClassName, "aria-hidden": "true" }))) : null,
            React.createElement(TextField_1.default, { id: this.props.id, className: this.props.class, label: this.props.label, type: this.props.inputType, multiline: this.props.multiline, rows: this.props.rows, margin: "normal", autoComplete: "on" }),
            this.props.rightIconClassName !== null ?
                (React.createElement("div", { className: "icon-container second-icon" },
                    React.createElement("i", { className: this.props.rightIconClassName, "aria-hidden": "true", onClick: this.togglePasswordReveal }))) : null));
    };
    return TextBox;
}(React.Component));
exports.TextBox = TextBox;
exports.default = TextBox;
//# sourceMappingURL=Textbox.js.map