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
var SignUp_1 = require("../../Components/SignUp/SignUp");
require("../../HighOrderComponents/SignUpHOC/SignUpHOC.scss");
var SignUpHOC = /** @class */ (function (_super) {
    __extends(SignUpHOC, _super);
    function SignUpHOC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignUpHOC.prototype.render = function () {
        return (React.createElement("div", { className: "hocMount" },
            React.createElement(SignUp_1.default, { Title: "To Do MVC App" })));
    };
    return SignUpHOC;
}(React.Component));
exports.SignUpHOC = SignUpHOC;
exports.default = SignUpHOC;
//# sourceMappingURL=SignUpHOC.js.map