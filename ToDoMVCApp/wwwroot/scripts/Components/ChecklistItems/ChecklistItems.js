"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
require("../ChecklistItems/_ChecklistItems.scss");
const Common_1 = require("../../Common/Common");
const Response_1 = require("../Response/Response");
const ChecklistItem_1 = require("../ChecklistItem/ChecklistItem");
const core_1 = require("@material-ui/core");
const User_1 = require("../../Common/Models/User");
const Dropdown_1 = require("../Dropdown/Dropdown");
const Button_1 = require("../Button/Button");
const textFieldTheme = core_1.createMuiTheme({
    overrides: {
        MuiInput: {
            root: {
                fontSize: 50
            },
            underline: {
                //inactive
                '&:before': {
                    borderBottom: '2px solid #757575'
                },
                '&:after': {
                    borderBottom: '2px solid #0E99D1'
                },
                '&:hover:not($disabled):before': {
                    borderBottom: '2px solid #0E99D1'
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: '2px solid #0E99D1'
                },
                '&$disabled:before': {
                    borderBottom: '2px solid #0E99D1'
                }
            }
        },
        MuiInputLabel: {
            root: {
                fontSize: 50,
                color: "#0E99D1"
            },
            shrink: {
                color: "#0E99D1"
            },
            animated: {
                color: "#0E99D1"
            },
        }
    }
});
class ChecklistItems extends React.Component {
    constructor(props) {
        super(props);
        this._checklistItems = React.createRef();
        this._deleteElement = React.createRef();
        this._crudOperations = React.createRef();
        this._checklistDropdown = React.createRef();
        this._addChecklistItem = React.createRef();
        this._newChecklistInputContainer = React.createRef();
        this.handleToggleMenuClick = () => {
            if (this.state.isDrawerOpen) {
                this.setState({ isDrawerOpen: false });
            }
            else {
                this.setState({ isDrawerOpen: true });
            }
        };
        this.showNewChecklistForm = () => {
            this.setState({
                isAddingNewChecklist: true
            });
        };
        this.handleAddNewChecklist_Click = () => {
            const data = JSON.stringify(this._newChecklistInputContainer.current.getElementsByTagName('input')[0].value);
            Common_1.postData("/api/Checklist/CreateChecklist", data, Common_1.getAntiForgeryTokenWithoutData()).then((response) => {
                const returnedChecklist = JSON.parse(response);
                this.setState({
                    checklists: [...this.state.checklists, returnedChecklist],
                    isAddingNewChecklist: false,
                    currentChecklist: returnedChecklist
                });
            });
        };
        this.handleSaveChecklist_Click = () => {
            this.saveCurrentChecklist();
        };
        this.handleDropdownChange = (clickEvent) => {
            let clickedEle = clickEvent.target;
            if (!clickedEle.classList.contains("dropdown__available-checklist")) {
                clickedEle = clickedEle.parentElement;
            }
            if (clickedEle != null && clickedEle instanceof HTMLElement) {
                const selectedChecklist = this.getChecklistFromState(Number(clickedEle.dataset.checklistId));
                this.setState({
                    //...this.state,
                    currentChecklist: selectedChecklist
                });
            }
        };
        this.handleDeleteCurrentChecklist_Click = () => {
            Common_1.postData("/api/Checklist/DeleteChecklist", this.state.currentChecklist.checklistsId, Common_1.getAntiForgeryTokenWithoutData())
                .then((response) => {
                const checklists = [...this.state.checklists];
                const index = checklists.indexOf(this.state.currentChecklist);
                checklists.splice(index, 1);
                this.setState({
                    currentChecklist: null,
                    checklists: checklists
                });
            });
        };
        this.saveCurrentChecklist = () => {
            const data = JSON.stringify(this.state.currentChecklist);
            Common_1.postData("/api/Checklist/SaveChecklist", data, Common_1.getAntiForgeryTokenWithoutData()).then((response) => {
                console.log('saved');
            });
        };
        this.addChecklistItem = () => {
            const cardContainer = document.createElement('div');
            ReactDOM.render(React.createElement(ChecklistItem_1.default, { title: null, description: null, isNewChecklistItem: true, checklistItemsId: null, checklistsId: this.state.currentChecklist.checklistsId, dateCreated: null, dateModified: null }), cardContainer);
            this._checklistItems.current.insertBefore(cardContainer, this._addChecklistItem.current);
        };
        this.getCurrentUser = () => __awaiter(this, void 0, void 0, function* () {
            const getCurrentUserResult = yield Common_1.getData("/api/User/GetCurrentUser", Common_1.getAntiForgeryTokenWithoutData());
            const currentUserObj = Object.assign(new User_1.default(), JSON.parse(getCurrentUserResult).responseText);
            return currentUserObj;
        });
        this.getChecklists = () => __awaiter(this, void 0, void 0, function* () {
            const getChecklistResult = yield Common_1.getData("/api/Checklist/GetChecklists", Common_1.getAntiForgeryTokenWithoutData());
            const checklistJson = JSON.parse(getChecklistResult);
            return checklistJson;
        });
        this.state = {
            isDrawerOpen: false,
            currentUserEmail: "",
            isAddingNewChecklist: false,
            checklists: [],
            currentChecklist: null,
            addNewChecklistResponse: Response_1.ResponseTypeEnum.None,
            addNewChecklistMessage: null,
        };
    }
    getChecklistFromState(id) {
        let matchedChecklist = null;
        this.state.checklists.forEach((checklist) => {
            if (checklist.checklistsId === id) {
                matchedChecklist = checklist;
            }
        });
        return matchedChecklist;
    }
    componentDidMount() {
        this.getChecklists().then((response) => {
            this.setState({
                checklists: response,
                currentChecklist: response[0]
            });
        });
        this.getCurrentUser().then((response) => {
            this.setState({
                currentUserEmail: response.email
            });
        });
    }
    render() {
        return (React.createElement("div", { className: this.state.isDrawerOpen ? "root open" : "root" },
            React.createElement("div", { className: "app-bar" },
                React.createElement("div", { className: "toggle-menu", onClick: () => { this.handleToggleMenuClick(); } }, this.state.isDrawerOpen ?
                    (React.createElement("i", { className: "fa fa-caret-left fa-2x", "aria-hidden": "true" }))
                    :
                        (React.createElement("i", { className: "fa fa-caret-right fa-2x", "aria-hidden": "true" }))),
                React.createElement("div", { className: "current-user" },
                    React.createElement("p", null, "Welcome"),
                    React.createElement("p", null, this.state.currentUserEmail))),
            React.createElement("div", { className: "drawer" },
                React.createElement("div", { className: "drawer__items" },
                    React.createElement("div", { className: "drawer__item drawer__item-hide-drawer" }),
                    React.createElement("div", { className: "checklist-select-container", ref: this._checklistDropdown },
                        React.createElement(Dropdown_1.default, { checklists: this.state.checklists, onChange: this.handleDropdownChange, currentChecklist: this.state.currentChecklist })),
                    React.createElement("div", { className: "drawer__item", onClick: () => { this.showNewChecklistForm(); } },
                        React.createElement("i", { className: "fa fa-plus-square fa-1x", "aria-hidden": "true" }),
                        this.state.isDrawerOpen ? React.createElement("p", { className: "drawer__item-description" }, "New Checklist") : null),
                    React.createElement("div", { className: "drawer__item", onClick: () => { this.handleSaveChecklist_Click(); } },
                        React.createElement("i", { className: "fa fa-floppy-o fa-1x", "aria-hidden": "true" }),
                        this.state.isDrawerOpen ? React.createElement("p", { className: "drawer__item-description" }, "Save Checklist") : null),
                    React.createElement("div", { className: "drawer__item", onClick: (e) => { this.handleDeleteCurrentChecklist_Click(); } },
                        React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" }),
                        this.state.isDrawerOpen ? React.createElement("p", { className: "drawer__item-description" }, "Delete Checklist") : null))),
            this.state.isAddingNewChecklist ?
                (React.createElement("div", { className: "new-checklist" },
                    React.createElement(core_1.MuiThemeProvider, { theme: textFieldTheme },
                        React.createElement(core_1.FormControl, null,
                            React.createElement(core_1.InputLabel, { htmlFor: "new-checklist__label" }, "Name"),
                            React.createElement("div", { ref: this._newChecklistInputContainer },
                                React.createElement(core_1.Input, { id: "new-checklist__input" })))),
                    React.createElement("div", { className: "new-checklist__button-container" },
                        React.createElement(Button_1.Button, { Text: "Add Checklist", Color: "#0E99D1", OnClick: () => { this.handleAddNewChecklist_Click(); } })),
                    React.createElement("div", { className: "new-checklist__response" },
                        React.createElement(Response_1.Response, { Message: this.state.addNewChecklistMessage, ResponseType: this.state.addNewChecklistResponse }))))
                :
                    (React.createElement("main", { className: "main-content" },
                        React.createElement("div", { id: "checklistItems", className: "checklist-items", ref: this._checklistItems },
                            this.state.currentChecklist !== null && this.state.currentChecklist.checklistItems.length > 0 ?
                                this.state.currentChecklist.checklistItems.map((checklistItem, i) => {
                                    return React.createElement(ChecklistItem_1.default, { checklistItemsId: checklistItem.checklistsItemId, checklistsId: checklistItem.checklistsId, title: checklistItem.name, description: checklistItem.description, dateCreated: checklistItem.dateCreated, dateModified: checklistItem.dateModified, isNewChecklistItem: false });
                                })
                                :
                                    null,
                            React.createElement("div", { className: "add-checklist-item", ref: this._addChecklistItem },
                                React.createElement("i", { className: "fa fa-plus-square fa-3x", "aria-hidden": "true", onClick: () => { this.addChecklistItem(); } })))))));
    }
}
exports.ChecklistItems = ChecklistItems;
exports.default = ChecklistItems;
//# sourceMappingURL=ChecklistItems.js.map