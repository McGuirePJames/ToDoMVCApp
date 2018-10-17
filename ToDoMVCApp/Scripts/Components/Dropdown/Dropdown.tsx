import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactElement, SyntheticEvent } from 'react';
import { Checklist } from '../../Common/Models/Checklist'
import '../Dropdown/_Dropdown.scss';

export interface Props {
    checklists: Checklist[];
    onChange: Function,
    currentChecklist: Checklist
}
export interface State {
    isOpen: boolean;
    currentChecklist: Checklist
    checklists: Checklist[];
}

export class Dropdown extends React.Component<Props, State>{
    private _dropdown: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private _checklistItems: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentChecklist: this.props.currentChecklist,
            checklists: this.props.checklists
        }
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    private closeDropdown = (): void => {
        if (this.state.isOpen) {
            this.setState({
                //...this.state,
                isOpen: false
            })
        }
    }
    private handleDropdownClick = (e): void => {
        const clickedEle: HTMLElement = e.target;
        if (this.state.isOpen) {
            this.setState({
                isOpen: false
            })
        }
        else {
            this.setState({
                isOpen: true
            })
        }
    }
    private handleDropdownItemClick = (event: Event): void => {

    }
    private handleOutsideClick = (e): void => {
        const clickedElement: HTMLElement = e.target;

        if (!this._dropdown.current.contains(clickedElement)) {
            this.closeDropdown();
        }
    }
    componentDidMount() {
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousProps.checklists !== this.props.checklists) {
            console.log('hit first if');
            this.setState({
                checklists: this.props.checklists
            })
        }
        if (previousProps.currentChecklist !== this.props.currentChecklist) {
            console.log('hit second if');
            this.setState({
                currentChecklist: this.props.currentChecklist
            })
        }
    }
    componentWillUnmount() {
        document.removeEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }
    render(): ReactElement<HTMLDivElement> {
        return (
            <div className="dropdown" ref={this._dropdown} onClick={(e) => { this.handleDropdownClick(e) }}>
                <label className="dropdown__label">Checklists</label>
                <div className="dropdown__selected-item-container">
                    {
                        this.state.currentChecklist !== null ?
                            (<p>{this.state.currentChecklist.name}</p>)
                            : null
                    }
                    <div className="dropdown__open-indicator">
                        {
                            this.state.isOpen ?
                                (<i className="fa fa-caret-up" aria-hidden="true"></i>)
                                :
                                (<i className="fa fa-caret-down" aria-hidden="true"></i>)
                        }
                    </div>
                </div>
                {
                    this.state.isOpen ?
                        (<div className="dropdown__checklists-container" ref={this._checklistItems}>
                            <ul className="dropdown__available-checklists">
                                {
                                    this.props.checklists !== null ?
                                        this.props.checklists.map((checklist: Checklist, i) => {      
                                            return <li className="dropdown__available-checklist" key={i} data-test="myData" data-checklist-id={checklist.checklistsId} onClick={(e) => { this.props.onChange(e) }}>
                                                <p>{checklist.name}</p>
                                            </li>
                                        })
                                        : null

                                }
                            </ul>
                        </div>)
                        :
                        null
                }
            </div>
        )
    }
}
export default Dropdown;