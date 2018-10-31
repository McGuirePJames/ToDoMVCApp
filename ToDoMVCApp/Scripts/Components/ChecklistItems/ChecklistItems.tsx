import * as React from 'react'
import * as ReactDOM from 'react-dom';
import '../ChecklistItems/_ChecklistItems.scss';
import { postData, getAntiForgeryTokenWithoutData, getData, getAntiForgeryToken } from '../../Common/Common';
import { Response, ResponseTypeEnum } from '../Response/Response';
import { ReactElement, createElement, SyntheticEvent, MouseEventHandler } from 'react';
import ChecklistItem from '../ChecklistItem/ChecklistItem';
import { MuiThemeProvider, Theme, createMuiTheme, FormControl, InputLabel, Select, Input, MenuItem, FormHelperText, TextField } from '@material-ui/core';
import { Response as ResponseModel } from '../../../Scripts/Common/Models/Response';
import classNames from 'classnames';
import User from '../../Common/Models/User';
import Dropdown from '../Dropdown/Dropdown';
import { Checklist } from '../../Common/Models/Checklist';
import { ChecklistItems as ChecklistItemsModel } from '../../Common/Models/ChecklistItems';
import { Button } from '../Button/Button';

const textFieldTheme: Theme = createMuiTheme({
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

export interface Props {

}

export interface State {
    isDrawerOpen: boolean;
    currentUserEmail: string,
    isAddingNewChecklist: boolean,
    checklists: Checklist[],
    currentChecklist: Checklist,
    addNewChecklistResponse: ResponseTypeEnum,
    addNewChecklistMessage: string
}

export class ChecklistItems extends React.Component<Props, State> {
    private _checklistItems: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private _deleteElement: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private _crudOperations: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private _checklistDropdown: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private _addChecklistItem: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private _newChecklistInputContainer: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    constructor(props) {
        super(props)
        this.state = {
            isDrawerOpen: false,
            currentUserEmail: "",
            isAddingNewChecklist: false,
            checklists: [],
            currentChecklist: null,
            addNewChecklistResponse: ResponseTypeEnum.None,
            addNewChecklistMessage: null,
        }
    }
    private handleToggleMenuClick = (): void => {
        if (this.state.isDrawerOpen) {
            this.setState({ isDrawerOpen: false });
        }
        else {
            this.setState({ isDrawerOpen: true });
        }
    }
    private showNewChecklistForm = (): void => {
        this.setState({
            isAddingNewChecklist: true
        })
    }
    private handleAddNewChecklist_Click = (): void => {
        const data = JSON.stringify((this._newChecklistInputContainer.current.getElementsByTagName('input')[0] as HTMLInputElement).value);
        postData("/api/Checklist/CreateChecklist", data, getAntiForgeryTokenWithoutData()).then((response) => {
            const returnedChecklist: Checklist = JSON.parse(response);
            this.setState({
                checklists: [...this.state.checklists, returnedChecklist],
                isAddingNewChecklist: false,
                currentChecklist: returnedChecklist
            })
        });
    }
    private handleSaveChecklist_Click = (): void => {
        this.saveCurrentChecklist();
    }
    private handleDropdownChange = (clickEvent: Event): void => {
        let clickedEle: HTMLElement = clickEvent.target as HTMLElement;
        if (!clickedEle.classList.contains("dropdown__available-checklist")) {
            clickedEle = clickedEle.parentElement;
        }
        if (clickedEle != null && clickedEle instanceof HTMLElement) {
            const selectedChecklist: Checklist = this.getChecklistFromState(Number(clickedEle.dataset.checklistId));
            this.setState({
                //...this.state,
                currentChecklist: selectedChecklist
            })
        }
    }
    private handleDeleteCurrentChecklist_Click = (): void => {
        postData("/api/Checklist/DeleteChecklist", this.state.currentChecklist.checklistsId, getAntiForgeryTokenWithoutData())
            .then((response) => {
                const checklists = [...this.state.checklists];
                const index = checklists.indexOf(this.state.currentChecklist);
                checklists.splice(index, 1);
                this.setState({
                    currentChecklist: null,
                    checklists: checklists
                })
            })
    }
    private getChecklistFromState(id: number): Checklist {
        let matchedChecklist: Checklist = null;
        this.state.checklists.forEach((checklist: Checklist) => {
            if (checklist.checklistsId === id) {
                matchedChecklist = checklist;
            }
        })
        return matchedChecklist;
    }
    public saveCurrentChecklist = (): void => {
        const data = JSON.stringify(this.state.currentChecklist);
        postData("/api/Checklist/SaveChecklist", data, getAntiForgeryTokenWithoutData()).then((response) => {
            console.log('saved');
        });
    }
    public addChecklistItem = (): void => {
        const cardContainer: HTMLDivElement = document.createElement('div');
        ReactDOM.render(
            <ChecklistItem title={null} description={null} isNewChecklistItem={true} checklistItemsId={null} checklistsId={this.state.currentChecklist.checklistsId} dateCreated={null} dateModified={null}/>,
            cardContainer
        )
        this._checklistItems.current.insertBefore(cardContainer, this._addChecklistItem.current)
    }
    public getCurrentUser = async (): Promise<User> => {
        const getCurrentUserResult = await getData("/api/User/GetCurrentUser", getAntiForgeryTokenWithoutData());
        const currentUserObj: User = Object.assign(new User(), JSON.parse(getCurrentUserResult).responseText);
        return currentUserObj;
    }
    public getChecklists = async (): Promise<Checklist[]> => {
        const getChecklistResult = await getData("/api/Checklist/GetChecklists", getAntiForgeryTokenWithoutData());
        const checklistJson: Checklist[] = JSON.parse(getChecklistResult);
        return checklistJson;
    }
    componentDidMount() {
        this.getChecklists().then((response: Checklist[]) => {
            this.setState({
                checklists: response,
                currentChecklist: response[0]
            })
        });
        this.getCurrentUser().then((response) => {
            this.setState({
                currentUserEmail: response.email
            });
        });
    }
    public render() {
        return (
            <div className={this.state.isDrawerOpen ? "root open" : "root"}>
                <div className="app-bar">
                    <div className="toggle-menu" onClick={() => { this.handleToggleMenuClick() }}>
                        {
                            this.state.isDrawerOpen ?
                                (<i className="fa fa-caret-left fa-2x" aria-hidden="true"></i>)
                                :
                                (<i className="fa fa-caret-right fa-2x" aria-hidden="true"></i>)
                        }
                    </div>
                    <div className="current-user">
                        <p>Welcome</p>
                        <p>{this.state.currentUserEmail}</p>
                    </div>
                </div>
                <div className="drawer">
                    <div className="drawer__items">
                        <div className="drawer__item drawer__item-hide-drawer">

                        </div>
                        <div className="checklist-select-container" ref={this._checklistDropdown}>
                            <Dropdown checklists={this.state.checklists} onChange={this.handleDropdownChange} currentChecklist={this.state.currentChecklist} />
                        </div>
                        <div className="drawer__item" onClick={() => { this.showNewChecklistForm() }}>
                            <i className="fa fa-plus-square fa-1x" aria-hidden="true"></i>
                            {this.state.isDrawerOpen ? <p className="drawer__item-description">New Checklist</p> : null}
                        </div>
                        <div className="drawer__item" onClick={() => { this.handleSaveChecklist_Click() }}>
                            <i className="fa fa-floppy-o fa-1x" aria-hidden="true"></i>
                            {this.state.isDrawerOpen ? <p className="drawer__item-description">Save Checklist</p> : null}
                        </div>
                        <div className="drawer__item" onClick={(e) => { this.handleDeleteCurrentChecklist_Click() }}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            {this.state.isDrawerOpen ? <p className="drawer__item-description">Delete Checklist</p> : null}
                        </div>
                    </div>
                </div>
                {
                    this.state.isAddingNewChecklist ?
                        (
                            <div className="new-checklist">
                                <MuiThemeProvider theme={textFieldTheme}>
                                    <FormControl>
                                        <InputLabel htmlFor="new-checklist__label">Name</InputLabel>
                                        <div ref={this._newChecklistInputContainer}>
                                            <Input id="new-checklist__input" />
                                        </div>
                                    </FormControl>
                                </MuiThemeProvider>
                                <div className="new-checklist__button-container">
                                    <Button Text="Add Checklist" Color="#0E99D1" OnClick={() => { this.handleAddNewChecklist_Click() }} />
                                </div>
                                <div className="new-checklist__response">
                                    <Response Message={this.state.addNewChecklistMessage} ResponseType={this.state.addNewChecklistResponse} />
                                </div>
                            </div>
                        )
                        :
                        (
                            <main className="main-content">
                                <div id="checklistItems" className="checklist-items" ref={this._checklistItems}>
                                    {this.state.currentChecklist !== null && this.state.currentChecklist.checklistItems.length > 0 ?
                                        this.state.currentChecklist.checklistItems.map((checklistItem: ChecklistItemsModel, i) => {
                                            return <ChecklistItem
                                                checklistItemsId={checklistItem.checklistsItemId}
                                                checklistsId={checklistItem.checklistsId}
                                                title={checklistItem.name}
                                                description={checklistItem.description}
                                                dateCreated={checklistItem.dateCreated}
                                                dateModified={checklistItem.dateModified}
                                                isNewChecklistItem={false}
                                            />
                                        })
                                        :
                                        null
                                    }
                                    <div className="add-checklist-item" ref={this._addChecklistItem}>
                                        <i className="fa fa-plus-square fa-3x" aria-hidden="true" onClick={() => { this.addChecklistItem() }}></i>
                                    </div>
                                </div>
                            </main>
                        )
                }
            </div>
        )
    }
}
export default ChecklistItems