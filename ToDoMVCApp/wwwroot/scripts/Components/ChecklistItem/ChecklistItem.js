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
require("../ChecklistItem/_ChecklistItem.scss");
require("../../../node_modules/animate.css/animate.min.css");
var ChecklistItem = /** @class */ (function (_super) {
    __extends(ChecklistItem, _super);
    function ChecklistItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ChecklistItem.prototype.render = function () {
        return (React.createElement("div", { className: "checklist-item bounceIn" },
            React.createElement("div", { className: "checklist-item__top-row" },
                React.createElement("p", { className: "checklist-item__title" }, "Title"),
                React.createElement("i", { className: "checklist-item__remove fa fa-ban" })),
            React.createElement("div", { className: "checklist-item__bottom-row" },
                React.createElement("p", { className: "checklist-item__description" }, "Description"))));
    };
    return ChecklistItem;
}(React.Component));
exports.ChecklistItem = ChecklistItem;
exports.default = ChecklistItem;
//# sourceMappingURL=ChecklistItem.js.map