"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../Response/_Response.scss");
var ResponseTypeEnum;
(function (ResponseTypeEnum) {
    ResponseTypeEnum[ResponseTypeEnum["Error"] = 0] = "Error";
    ResponseTypeEnum[ResponseTypeEnum["Warning"] = 1] = "Warning";
    ResponseTypeEnum[ResponseTypeEnum["Success"] = 2] = "Success";
    ResponseTypeEnum[ResponseTypeEnum["None"] = 3] = "None";
})(ResponseTypeEnum = exports.ResponseTypeEnum || (exports.ResponseTypeEnum = {}));
class Response extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
    }
}
exports.Response = Response;
exports.default = Response;
//# sourceMappingURL=Response.js.map