"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Login_1 = require("../../Components/Login/Login");
require("../../HighOrderComponents/LoginHOC/LoginHOC.scss");
const ComponentReadyStateEnum_1 = require("../../Common/Models/ComponentReadyStateEnum");
const CircularProgress_1 = require("@material-ui/core/CircularProgress");
class LoginHOC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readyState: null
        };
    }
    componentWillMount() {
        this.setState(Object.assign({}, this.state, { readyState: ComponentReadyStateEnum_1.ComponentReadyStateEnum.Started }));
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState(Object.assign({}, this.state, { readyState: ComponentReadyStateEnum_1.ComponentReadyStateEnum.Finished }));
        }, 2000);
    }
    render() {
        return (React.createElement("div", { className: "hocMount" }, this.state.readyState === ComponentReadyStateEnum_1.ComponentReadyStateEnum.Started ?
            React.createElement("div", { className: "progress-container" },
                React.createElement(CircularProgress_1.default, null))
            :
                React.createElement(Login_1.default, null)));
    }
}
exports.LoginHOC = LoginHOC;
exports.default = LoginHOC;
//# sourceMappingURL=LoginHOC.js.map