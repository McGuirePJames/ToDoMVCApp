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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("../Checklist/_ChecklistHOC.scss");
var ComponentReadyStateEnum_1 = require("../../Common/Models/ComponentReadyStateEnum");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
var LoginHOC = /** @class */ (function (_super) {
    __extends(LoginHOC, _super);
    function LoginHOC(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            readyState: null
        };
        return _this;
    }
    LoginHOC.prototype.componentWillMount = function () {
        this.setState(__assign({}, this.state, { readyState: ComponentReadyStateEnum_1.ComponentReadyStateEnum.Started }));
    };
    LoginHOC.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.setState(__assign({}, _this.state, { readyState: ComponentReadyStateEnum_1.ComponentReadyStateEnum.Finished }));
        }, 2000);
    };
    LoginHOC.prototype.render = function () {
        return (React.createElement("div", { className: "hocMount" }, this.state.readyState === ComponentReadyStateEnum_1.ComponentReadyStateEnum.Started ?
            React.createElement("div", { className: "progress-container" },
                React.createElement(CircularProgress_1.default, null))
            :
                null));
    };
    return LoginHOC;
}(React.Component));
exports.LoginHOC = LoginHOC;
exports.default = LoginHOC;
//# sourceMappingURL=ChecklistHOC.js.map