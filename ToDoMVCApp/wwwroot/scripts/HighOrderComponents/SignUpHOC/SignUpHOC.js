"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SignUp_1 = require("../../Components/SignUp/SignUp");
require("../../HighOrderComponents/SignUpHOC/SignUpHOC.scss");
const CircularProgress_1 = require("@material-ui/core/CircularProgress");
const ComponentReadyStateEnum_1 = require("../../Common/Models/ComponentReadyStateEnum");
class SignUpHOC extends React.Component {
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
                React.createElement(SignUp_1.default, { Title: "To Do MVC App" })));
    }
}
exports.SignUpHOC = SignUpHOC;
exports.default = SignUpHOC;
//# sourceMappingURL=SignUpHOC.js.map