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
require("../Response/_Response.scss");
var ResponseTypeEnum;
(function (ResponseTypeEnum) {
    ResponseTypeEnum[ResponseTypeEnum["Error"] = 0] = "Error";
    ResponseTypeEnum[ResponseTypeEnum["Warning"] = 1] = "Warning";
    ResponseTypeEnum[ResponseTypeEnum["Success"] = 2] = "Success";
    ResponseTypeEnum[ResponseTypeEnum["None"] = 3] = "None";
})(ResponseTypeEnum = exports.ResponseTypeEnum || (exports.ResponseTypeEnum = {}));
var Response = /** @class */ (function (_super) {
    __extends(Response, _super);
    function Response(props) {
        return _super.call(this, props) || this;
    }
    Response.prototype.render = function () {
        return (React.createElement("div", null, this.props.ResponseType === ResponseTypeEnum.Error ?
            (React.createElement("div", { className: "container-response error-response" },
                React.createElement("p", { className: "container-response__title" }, "Error"),
                React.createElement("p", { className: "response" }, this.props.Message))) :
            this.props.ResponseType === ResponseTypeEnum.Warning ?
                (React.createElement("div", { className: "container-response warning-response" },
                    React.createElement("p", { className: "container-response__title" }, "Warning"),
                    React.createElement("p", { className: "response" }, this.props.Message))) :
                this.props.ResponseType === ResponseTypeEnum.Success ?
                    (React.createElement("div", { className: "container-response success-response" },
                        React.createElement("p", { className: "container-response__title" }, "Success"),
                        React.createElement("p", { className: "response" }, this.props.Message))) : null));
    };
    return Response;
}(React.Component));
exports.Response = Response;
exports.default = Response;
//# sourceMappingURL=Response.js.map