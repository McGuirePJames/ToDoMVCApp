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
var ChecklistItems = /** @class */ (function (_super) {
    __extends(ChecklistItems, _super);
    function ChecklistItems(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ChecklistItems.prototype.render = function () {
        return (React.createElement("div", null));
    };
    return ChecklistItems;
}(React.Component));
exports.ChecklistItems = ChecklistItems;
exports.default = ChecklistItems;
//# sourceMappingURL=ChecklistItems.js.map