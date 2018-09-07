import * as React from 'react'
import '../ChecklistItem/_ChecklistItem.scss';
import { postData, getAntiForgeryTokenWithoutData } from '../../Common/Common';
import { Response, ResponseTypeEnum } from '../Response/Response';
import { Response as ResponseModel } from '../../Common/Models/Response';
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom';
import '../../../node_modules/animate.css/animate.min.css';
import TextField from '@material-ui/core/TextField';
import { InputLabel, Input, FormHelperText, FormControl } from '@material-ui/core';
import { isUndefined } from 'util';

export interface IChecklistItemState {
    isDestroyed: boolean,
    title: string,
    isTitleEditable: boolean,
    titleError: string,
    description: string,
    isDescriptionEditable: boolean,
    descriptionError: string,
}
export interface IChecklistItemProps {
    title: string,
    description: string
}
export class ChecklistItem extends React.Component<IChecklistItemProps, IChecklistItemState> {
    private _component: React.RefObject<HTMLDivElement>;
    private _titleContainer: React.RefObject<HTMLDivElement>;
    private _descriptionContainer: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props)
        this.state = {
            isDestroyed: false,
            title: this.props.title,
            isTitleEditable: true,
            titleError: null,
            description: this.props.description,
            isDescriptionEditable: true,
            descriptionError: null,
        }
        this._component = React.createRef();
        this._titleContainer = React.createRef();
        this._descriptionContainer = React.createRef();
    }
    public componentDidMount(): void {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }
    public componentWillUnmount(): void {
        console.log('unmounted');
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }
    private handleTitleValueClick = () => {
        this.setTitleEditable(true);
    }
    private handleDescriptionValueClick = () => {
        this.setDescriptionEditable(true);
    }
    private handleOutsideClick = () => {
        /*This method affects all checklistitem components */
        if (this.state.isTitleEditable || this.state.isDescriptionEditable) {
            const target: HTMLElement = (event.target) as HTMLElement;
            //basically if field is editable
            //if click was outside of editable input
            if (!this._component.current.contains(target)) {
                const validation: ResponseModel = this.handleChecklistValidation();
                if (validation.success) {
                    if (this.state.isTitleEditable) {
                        this.setTitle((this._titleContainer.current.getElementsByTagName('input')[0] as HTMLInputElement).value)
                    }
                    if (this.state.isDescriptionEditable) {
                        this.setDescription((this._descriptionContainer.current.getElementsByTagName('input')[0] as HTMLInputElement).value)
                    }
                    this.setEditableStatusToFalse();
                }
                else {
                    this.setState({

                    });
                }
            }
        }
    }
    private handleChecklistValidation = (): ResponseModel => {
        const response: ResponseModel = new ResponseModel();
        response.success = true;

        const titleValidation = this.validateInput(this._titleContainer.current.getElementsByTagName('input')[0] as HTMLInputElement);
        const descriptionValidation = this.validateInput(this._descriptionContainer.current.getElementsByTagName('input')[0] as HTMLInputElement);

        if (!titleValidation.success) {
            response.success = false;
            this.setState({
                ...this.state,
                titleError: titleValidation.responseText
            });
        }
        else {
            this.setState({
                ...this.state,
                titleError: null
            });
        }
        if (!descriptionValidation.success) {
            response.success = false;
            this.setState({
                ...this.state,
                descriptionError: descriptionValidation.responseText
            });
        }
        else {
            this.setState({
                ...this.state,
                descriptionError: null
            });
        }
        return response;
    }
    public validateInput = (input: HTMLInputElement): ResponseModel => {
        const response: ResponseModel = new ResponseModel();
        response.success = true;

        if (input !== null && !isUndefined(input) && (input.value === null || input.value === "")) {
            response.success = false;
            response.responseText = "Please enter a value";
        }

        return response;
    }
    public setTitleEditable = (isEditable: boolean): void => {
        this.setState({
            ...this.state,
            isTitleEditable: isEditable
        });
    }
    public setDescriptionEditable = (isEditable: boolean): void => {
        this.setState({
            ...this.state,
            isDescriptionEditable: isEditable
        });
    }
    public setEditableStatusToFalse = (): void => {
        this.setState({
            ...this.state,
            isTitleEditable: false,
            isDescriptionEditable: false,
        });
    }
    public setTitle = (title: string) => {
        this.setState({
            ...this.state,
            title: title
        });
    }
    public setDescription = (description: string) => {
        this.setState({
            ...this.state,
            description: description
        });
    }
    public setDestroyedStatus = (destroyedStatus: boolean) => {
        this.setState({
            ...this.state,
            isDestroyed: destroyedStatus
        });
    }
    public render(): ReactElement<HTMLDivElement> {
        if (!this.state.isDestroyed) {
            return (
                <div className="checklist-item bounceIn" ref={this._component}>
                    <div className="checklist-item__top-row">
                        <div className="checklist-item__title-container checklist-item__input-container" ref={this._titleContainer}>
                            {
                                this.state.isTitleEditable ?
                                    <FormControl error={this.state.titleError !== null ? true : false} aria-describedby="name-error-text">
                                        <Input id="name-error" placeholder={this.state.title !== null ? this.state.title : "Title"} autoFocus={true} />
                                        <FormHelperText id="name-error-text" className="error-text">{this.state.titleError !== null ? this.state.titleError : null}</FormHelperText>
                                    </FormControl>
                                    :
                                    <p className="checklist-item__title-value" onClick={this.handleTitleValueClick}>{this.state.title !== null ? this.state.title : "Title"}</p>
                            }
                        </div>
                        <i className="checklist-item__remove fa fa-ban" onClick={() => this.setDestroyedStatus(true)}></i>
                    </div>
                    <div className="checklist-item__bottom-row checklist-item__input-container" ref={this._descriptionContainer}>
                        {
                            this.state.isDescriptionEditable ?
                                <FormControl error={this.state.descriptionError !== null ? true : false} aria-describedby="name-error-text">
                                    <Input id="name-error" placeholder={this.state.description !== null ? this.state.description : "Description"} autoFocus={true} />
                                    <FormHelperText id="name-error-text" className="error-text">{this.state.descriptionError !== null ? this.state.descriptionError : null}</FormHelperText>
                                </FormControl>
                                :
                                <p className="checklist-item__description" onClick={this.handleDescriptionValueClick}>{this.state.description !== null ? this.state.description : "Description"}</p>
                        }
                    </div>
                </div>
            )
        }
        else {
            return null
        }
    }
}
export default ChecklistItem

