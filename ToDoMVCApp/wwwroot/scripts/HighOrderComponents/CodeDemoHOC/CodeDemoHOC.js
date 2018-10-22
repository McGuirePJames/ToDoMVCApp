"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Dropdown_1 = require("../../Components/CodeDemo/Dropdown/Dropdown");
const Checklist_1 = require("../../Common/Models/Checklist");
class CodeDemoHOC extends React.Component {
    constructor(props) {
        super(props);
        this.getChecklists = () => {
            let checklistOne = new Checklist_1.default();
            checklistOne.name = "Checklist One";
            checklistOne.checklistsId = 1;
            let checklistTwo = new Checklist_1.default();
            checklistTwo.name = "ChecklistTwo";
            checklistTwo.checklistsId = 2;
            let checklistThree = new Checklist_1.default();
            checklistThree.name = "ChecklistThree";
            checklistThree.checklistsId = 3;
            const checklists = [checklistOne, checklistTwo, checklistThree];
            return checklists;
        };
    }
    render() {
        return (React.createElement("div", { className: "container" },
            React.createElement(Dropdown_1.Dropdown, { checklists: this.getChecklists(), onChange: () => { console.log("Change"); } })));
    }
}
exports.CodeDemoHOC = CodeDemoHOC;
exports.default = CodeDemoHOC;
//# sourceMappingURL=CodeDemoHOC.js.map