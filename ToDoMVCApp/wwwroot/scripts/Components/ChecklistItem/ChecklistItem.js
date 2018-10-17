"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../ChecklistItem/_ChecklistItem.scss");
const Response_1 = require("../../Common/Models/Response");
require("../../../node_modules/animate.css/animate.min.css");
const core_1 = require("@material-ui/core");
const util_1 = require("util");
const textFieldTheme = core_1.createMuiTheme({
    overrides: {
        MuiInput: {
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
        }
    }
});
const checkBoxTheme = core_1.createMuiTheme({
    overrides: {
        MuiCheckbox: {
            colorPrimary: {
                '&$checked': {
                    color: "#7CB342",
                },
                '&$disabled': {
                    color: "#7CB342",
                },
            },
            colorSecondary: {
                '&$checked': {
                    color: "#7CB342",
                },
                '&$disabled': {
                    color: "#7CB342",
                },
            }
        }
    }
});
class ChecklistItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleTitleValueClick = () => {
            this.setTitleEditable(true);
        };
        this.handleDescriptionValueClick = () => {
            this.setDescriptionEditable(true);
        };
        this.handleSaveIconClick = () => {
            const validation = this.handleChecklistValidation();
            if (validation.success) {
                if (this.state.isTitleEditable && this.state.isDescriptionEditable) {
                    this.setState(Object.assign({}, this.state, { title: this._titleContainer.current.getElementsByTagName('input')[0].value, description: this._description.getElementsByTagName('textarea')[0].value, isDescriptionEditable: false, isTitleEditable: false, isSaved: true }));
                }
                else if (this.state.isTitleEditable) {
                    this.setState(Object.assign({}, this.state, { title: this._titleContainer.current.getElementsByTagName('input')[0].value, isTitleEditable: false, isSaved: true }));
                }
                else if (this.state.isDescriptionEditable) {
                    this.setState(Object.assign({}, this.state, { description: this._description.getElementsByTagName('textarea')[0].value, isDescriptionEditable: false, isSaved: true }));
                }
            }
            ;
        };
        this.handleChecklistValidation = () => {
            const response = new Response_1.Response();
            response.success = true;
            const descriptionValidation = this.validateInput(this._description.getElementsByTagName('textarea')[0]);
            const titleValidation = this.validateInput(this._titleContainer.current.getElementsByTagName('input')[0]);
            if (!titleValidation.success && !descriptionValidation.success) {
                console.log('both failed');
                response.success = false;
                this.setState(Object.assign({}, this.state, { titleError: titleValidation.responseText, descriptionError: descriptionValidation.responseText }));
            }
            else if (!titleValidation.success) {
                console.log('title failed');
                response.success = false;
                this.setState(Object.assign({}, this.state, { titleError: titleValidation.responseText, descriptionError: null }));
            }
            else if (!descriptionValidation.success) {
                console.log('description failed');
                response.success = false;
                this.setState(Object.assign({}, this.state, { descriptionError: descriptionValidation.responseText, titleError: null }));
            }
            else {
                this.setState(Object.assign({}, this.state, { descriptionError: null, titleError: null }));
            }
            return response;
        };
        this.validateInput = (input) => {
            const response = new Response_1.Response();
            response.success = true;
            if (input !== null && !util_1.isUndefined(input) && (input.value === null || input.value === "")) {
                response.success = false;
                response.responseText = "Please enter a value";
            }
            return response;
        };
        this.setTitleEditable = (isEditable) => {
            this.setState(Object.assign({}, this.state, { isTitleEditable: isEditable }));
        };
        this.setDescriptionEditable = (isEditable) => {
            this.setState(Object.assign({}, this.state, { isDescriptionEditable: isEditable }));
        };
        this.setEditableStatusToFalse = () => {
            this.setState(Object.assign({}, this.state, { isTitleEditable: false, isDescriptionEditable: false }));
        };
        this.setTitle = (title) => {
            this.setState(Object.assign({}, this.state, { title: title }));
        };
        this.setDescription = (description) => {
            this.setState(Object.assign({}, this.state, { description: description }));
        };
        this.setDestroyedStatus = (status) => {
            this.setState(Object.assign({}, this.state, { isDestroyed: status }));
        };
        this.setSavedStatus = (status) => {
            this.setState(Object.assign({}, this.state, { isSaved: status }));
        };
        this.state = {
            isDestroyed: false,
            isSaved: false,
            isDescriptionEditable: true,
            title: this.props.title,
            isTitleEditable: true,
            titleError: null,
            description: this.props.description,
            descriptionError: null,
        };
        this._titleContainer = React.createRef();
        this._component = React.createRef();
        this.setDescription = this.setDescription.bind(this);
        this.handleSaveIconClick = this.handleSaveIconClick.bind(this);
    }
    render() {
        return (this.state.isDestroyed ?
            null
            :
                (React.createElement("div", { className: "checklist-item bounceIn", ref: this._component },
                    React.createElement("div", { className: "checklist-item__left-column" },
                        React.createElement("div", { className: "checklist-item__title-container checklist-item__input-container", ref: this._titleContainer }, this.state.isTitleEditable ?
                            React.createElement(core_1.FormControl, { error: this.state.titleError !== null ? true : false },
                                React.createElement(core_1.MuiThemeProvider, { theme: textFieldTheme },
                                    React.createElement(core_1.Input, { value: this.state.title !== null ? this.state.title : null, placeholder: "Title", onChange: (e) => { this.setState(Object.assign({}, this.state, { title: e.target.value, isSaved: false })); } }),
                                    React.createElement(core_1.FormHelperText, { className: "error-text" }, this.state.titleError !== null ? this.state.titleError : null)))
                            :
                                React.createElement("p", { className: "checklist-item__title-value", onClick: this.handleTitleValueClick }, this.state.title !== null ? this.state.title : "Title")),
                        React.createElement("div", { className: "checklist-item__description-container", ref: (ref) => { this._description = ref; } }, this.state.isDescriptionEditable ?
                            React.createElement(core_1.FormControl, { error: this.state.descriptionError !== null ? true : false },
                                React.createElement(core_1.MuiThemeProvider, { theme: textFieldTheme },
                                    React.createElement(core_1.Input, { value: this.state.description !== null ? this.state.description : null, placeholder: "Description", multiline: true, rows: 3, onChange: (e) => { this.setState(Object.assign({}, this.state, { description: e.target.value, isSaved: false })); } }),
                                    React.createElement(core_1.FormHelperText, { className: "error-text" }, this.state.descriptionError !== null ? this.state.descriptionError : null)))
                            :
                                React.createElement("p", { className: "checklist-item__description", onClick: this.handleDescriptionValueClick }, this.state.description !== null ? this.state.description : "Description"))),
                    React.createElement("div", { className: "checklist-item__right-column" },
                        React.createElement("div", { className: "checklist-item__crud-operation checklist-item__material-checkbox-container" },
                            React.createElement(core_1.MuiThemeProvider, { theme: checkBoxTheme },
                                React.createElement(core_1.Checkbox, { onChange: () => { } }))),
                        React.createElement("div", { className: "checklist-item__crud-operation checklist-item__save" },
                            React.createElement("i", { className: this.state.isSaved ? "fa fa-floppy-o saved" : "fa fa-floppy-o", onClick: () => { this.handleSaveIconClick(); } })),
                        React.createElement("div", { className: "checklist-item__crud-operation checklist-item__remove fa fa-ban", onClick: () => { this.setDestroyedStatus(true); } }, " ")))));
    }
}
exports.ChecklistItem = ChecklistItem;
exports.default = ChecklistItem;
//# sourceMappingURL=ChecklistItem.js.map