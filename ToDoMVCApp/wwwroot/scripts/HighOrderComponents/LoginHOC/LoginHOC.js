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
var Login_1 = require("../../Components/Login/Login");
require("../../HighOrderComponents/LoginHOC/LoginHOC.scss");
var LoginHOC = /** @class */ (function (_super) {
    __extends(LoginHOC, _super);
    function LoginHOC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginHOC.prototype.render = function () {
        return (React.createElement("div", { className: "hocMount" },
            React.createElement(Login_1.default, null)));
    };
    return LoginHOC;
}(React.Component));
exports.LoginHOC = LoginHOC;
exports.default = LoginHOC;
//# sourceMappingURL=LoginHOC.js.map