"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("../Dropdown/_Dropdown.scss");
class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this._dropdown = React.createRef();
        this._checklistItems = React.createRef();
        this.handleDropdownClick = (e) => {
            const clickedEle = e.target;
            if (this.state.isOpen) {
                this.setState({
                    isOpen: false
                });
            }
            else {
                this.setState({
                    isOpen: true
                });
            }
        };
        this.handleOutsideClick = (e) => {
            const clickedElement = e.target;
            if (!this._dropdown.current.contains(clickedElement)) {
                this.closeDropdown();
            }
        };
        this.handleDropdownItemClick = (e) => {
            let clickedEle = e.target;
            if (!clickedEle.classList.contains("dropdown__available-checklist")) {
                clickedEle = clickedEle.parentElement;
            }
            if (clickedEle != null && clickedEle instanceof HTMLElement) {
                const selectedChecklist = this.getChecklistFromProps(Number(clickedEle.dataset.checklistId));
                this.setState({
                    currentChecklist: selectedChecklist
                });
            }
        };
        this.closeDropdown = () => {
            if (this.state.isOpen) {
                this.setState({
                    isOpen: false
                });
            }
        };
        this.state = {
            isOpen: false,
            currentChecklist: null
        };
    }
    getChecklistFromProps(id) {
        let matchedChecklist = null;
        this.props.checklists.forEach((checklist) => {
            if (checklist.checklistsId === id) {
                matchedChecklist = checklist;
            }
        });
        return matchedChecklist;
    }
    componentDidMount() {
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }
    componentDidUpdate(previousProps, previousState) {
    }
    componentWillUnmount() {
        document.removeEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }
    render() {
        return (React.createElement("div", { className: "dropdown", ref: this._dropdown, onClick: (e) => { this.handleDropdownClick(e); } },
            React.createElement("label", { className: "dropdown__label" }, "Checklists"),
            React.createElement("div", { className: "dropdown__selected-item-container" },
                this.state.currentChecklist !== null ?
                    (React.createElement("p", null, this.state.currentChecklist.name))
                    : React.createElement("p", null, "Please select a checklist"),
                React.createElement("div", { className: "dropdown__open-indicator" }, this.state.isOpen ?
                    (React.createElement("i", { className: "fa fa-caret-up", "aria-hidden": "true" }))
                    :
                        (React.createElement("i", { className: "fa fa-caret-down", "aria-hidden": "true" })))),
            this.state.isOpen ?
                (React.createElement("div", { className: "dropdown__checklists-container", ref: this._checklistItems },
                    React.createElement("ul", { className: "dropdown__available-checklists" }, this.props.checklists !== null ?
                        this.props.checklists.map((checklist, i) => {
                            return React.createElement("li", { className: "dropdown__available-checklist", key: i, "data-test": "myData", "data-checklist-id": checklist.checklistsId, onClick: (e) => { this.handleDropdownItemClick(e); } },
                                React.createElement("p", null, checklist.name));
                        })
                        : null)))
                :
                    null));
    }
}
exports.Dropdown = Dropdown;
exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map