import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactElement, SyntheticEvent } from 'react';
import { Checklist } from '../../../Common/Models/Checklist'
import '../Dropdown/_Dropdown.scss';

interface Props {
    checklists: Checklist[];
    onChange: Function,
}
interface State {
    isOpen: boolean;
    currentChecklist: Checklist
}

export class Dropdown extends React.Component<Props, State>{
    private _dropdown: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private _checklistItems: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentChecklist: null
        }
    }
    private handleDropdownClick = (e: SyntheticEvent): void => {
        const clickedEle: HTMLElement = e.target as HTMLElement;
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
    private handleOutsideClick = (e: MouseEvent): void => {
        const clickedElement: HTMLElement = e.target as HTMLElement;

        if (!this._dropdown.current.contains(clickedElement)) {
            this.closeDropdown();
        }
    }
    private handleDropdownItemClick = (e: SyntheticEvent): void => {
        let clickedEle: HTMLElement = e.target as HTMLElement;
        if (!clickedEle.classList.contains("dropdown__available-checklist")) {
            clickedEle = clickedEle.parentElement;
        }
        if (clickedEle != null && clickedEle instanceof HTMLElement) {
            const selectedChecklist: Checklist = this.getChecklistFromProps(Number(clickedEle.dataset.checklistId));
            this.setState({
                currentChecklist: selectedChecklist
            })
        }
    }
    private getChecklistFromProps(id: number): Checklist {
        let matchedChecklist: Checklist = null;
        this.props.checklists.forEach((checklist: Checklist) => {
            if (checklist.checklistsId === id) {
                matchedChecklist = checklist;
            }
        })
        return matchedChecklist;
    }
    public closeDropdown = (): void => {
        if (this.state.isOpen) {
            this.setState({
                isOpen: false
            })
        }
    }
    componentDidMount(): void {
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }
    componentDidUpdate(previousProps, previousState): void {

    }
    componentWillUnmount(): void {
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
                            : <p>Please select a checklist</p>
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
                                            return <li className="dropdown__available-checklist" key={i} data-test="myData" data-checklist-id={checklist.checklistsId} onClick={(e) => { this.handleDropdownItemClick(e) }} /*onClick={(e) => { this.props.onChange(e) }}*/>
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