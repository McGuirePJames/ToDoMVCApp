"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../ChecklistHOC/_ChecklistHOC.scss");
const ComponentReadyStateEnum_1 = require("../../Common/Models/ComponentReadyStateEnum");
const CircularProgress_1 = require("@material-ui/core/CircularProgress");
const ChecklistItems_1 = require("../../Components/ChecklistItems/ChecklistItems");
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
            React.createElement("div", { className: "page-load-progress-container" },
                React.createElement(CircularProgress_1.default, null))
            :
                React.createElement(ChecklistItems_1.default, null)));
    }
}
exports.LoginHOC = LoginHOC;
exports.default = LoginHOC;
//# sourceMappingURL=ChecklistHOC.js.map