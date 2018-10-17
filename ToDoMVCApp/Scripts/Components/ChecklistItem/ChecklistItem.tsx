import * as React from 'react'
import '../ChecklistItem/_ChecklistItem.scss';
import { postData, getAntiForgeryTokenWithoutData, AnimateCSSHelper } from '../../Common/Common';
import { Response, ResponseTypeEnum } from '../Response/Response';
import { Response as ResponseModel } from '../../Common/Models/Response';
import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom';
import '../../../node_modules/animate.css/animate.min.css';
import TextField from '@material-ui/core/TextField';
import { InputLabel, Input, FormHelperText, FormControl, Checkbox, createMuiTheme, Theme, MuiThemeProvider, WithStyles, withStyles, createStyles } from '@material-ui/core';
import { isUndefined } from 'util';

const textFieldTheme: Theme = createMuiTheme({
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
const checkBoxTheme: Theme = createMuiTheme({
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
})

export interface IChecklistItemState {
    isDestroyed: boolean,
    isSaved: boolean,
    isDescriptionEditable: boolean,
    title: string,
    isTitleEditable: boolean,
    titleError: string,
    description: string,
    descriptionError: string,
}
export interface IChecklistItemProps {
    title: string;
    description: string;
}

export class ChecklistItem extends React.Component<IChecklistItemProps, IChecklistItemState> {
    private _component: React.RefObject<HTMLDivElement>;
    private _description: HTMLDivElement;
    private _titleContainer: React.RefObject<HTMLDivElement>;

    constructor(props: IChecklistItemProps) {
        super(props)
        this.state = {
            isDestroyed: false,
            isSaved: false,
            isDescriptionEditable: true,
            title: this.props.title,
            isTitleEditable: true,
            titleError: null,
            description: this.props.description,
            descriptionError: null,
        }

        this._titleContainer = React.createRef();
        this._component = React.createRef();
        this.setDescription = this.setDescription.bind(this);
        this.handleSaveIconClick = this.handleSaveIconClick.bind(this);
    }
    private handleTitleValueClick = (): void => {
        this.setTitleEditable(true);
    }
    private handleDescriptionValueClick = (): void => {
        this.setDescriptionEditable(true);
    }
    private handleSaveIconClick = (): void => {
        const validation: ResponseModel = this.handleChecklistValidation();
        if (validation.success) {
            if (this.state.isTitleEditable && this.state.isDescriptionEditable) {
                this.setState({
                    ...this.state,
                    title: this._titleContainer.current.getElementsByTagName('input')[0].value,
                    description: this._description.getElementsByTagName('textarea')[0].value,
                    isDescriptionEditable: false,
                    isTitleEditable: false,
                    isSaved: true
                })
            }
            else if (this.state.isTitleEditable) {
                this.setState({
                    ...this.state,
                    title: this._titleContainer.current.getElementsByTagName('input')[0].value,
                    isTitleEditable: false,
                    isSaved: true
                })
            }
            else if (this.state.isDescriptionEditable) {
                this.setState({
                    ...this.state,
                    description: this._description.getElementsByTagName('textarea')[0].value,
                    isDescriptionEditable: false,
                    isSaved: true
                })
            }

        };
    }
    private handleChecklistValidation = (): ResponseModel => {
        const response: ResponseModel = new ResponseModel();
        response.success = true;

        const descriptionValidation: ResponseModel = this.validateInput(this._description.getElementsByTagName('textarea')[0] as HTMLTextAreaElement);
        const titleValidation: ResponseModel = this.validateInput(this._titleContainer.current.getElementsByTagName('input')[0] as HTMLInputElement);


        if (!titleValidation.success && !descriptionValidation.success) {
            console.log('both failed');
            response.success = false;
            this.setState({
                ...this.state,
                titleError: titleValidation.responseText,
                descriptionError: descriptionValidation.responseText
            })
        }
        else if (!titleValidation.success) {
            console.log('title failed');
            response.success = false;
            this.setState({
                ...this.state,
                titleError: titleValidation.responseText,
                descriptionError: null
            })
        }
        else if (!descriptionValidation.success) {
            console.log('description failed');
            response.success = false;
            this.setState({
                ...this.state,
                descriptionError: descriptionValidation.responseText,
                titleError: null
            })
        }
        else {
            this.setState({
                ...this.state,
                descriptionError: null,
                titleError: null
            })
        }
        return response;
    }
    public validateInput = (input): ResponseModel => {
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
    public setTitle = (title: string): void => {
        this.setState({
            ...this.state,
            title: title
        });
    }
    public setDescription = (description: string): void => {
        this.setState({
            ...this.state,
            description: description
        });
    }
    public setDestroyedStatus = (status: boolean): void => {
        this.setState({
            ...this.state,
            isDestroyed: status
        });
    }
    public setSavedStatus = (status: boolean): void => {
        this.setState({
            ...this.state,
            isSaved: status
        })
    }
    public render() {
        return (
            this.state.isDestroyed ?
                null
                :
                (
                    <div className="checklist-item bounceIn" ref={this._component}>
                        <div className="checklist-item__left-column">
                            <div className="checklist-item__title-container checklist-item__input-container" ref={this._titleContainer}>
                                {
                                    this.state.isTitleEditable ?
                                        <FormControl error={this.state.titleError !== null ? true : false}>
                                            <MuiThemeProvider theme={textFieldTheme}>
                                                <Input value={this.state.title !== null ? this.state.title : null} placeholder="Title" onChange={(e) => { this.setState({ ...this.state, title: e.target.value, isSaved: false }) } }/>
                                                <FormHelperText className="error-text">{this.state.titleError !== null ? this.state.titleError : null}</FormHelperText>
                                            </MuiThemeProvider>
                                        </FormControl>
                                        :
                                        <p className="checklist-item__title-value" onClick={this.handleTitleValueClick}>{this.state.title !== null ? this.state.title : "Title"}</p>
                                }
                            </div>
                            <div className="checklist-item__description-container" ref={(ref) => { this._description = ref; }}>
                                {
                                    this.state.isDescriptionEditable ?
                                        <FormControl error={this.state.descriptionError !== null ? true : false}>
                                            <MuiThemeProvider theme={textFieldTheme}>
                                                <Input value={this.state.description !== null ? this.state.description : null} placeholder="Description" multiline={true} rows={3} onChange={(e) => { this.setState({ ...this.state, description: e.target.value, isSaved: false }) }}></Input>
                                                <FormHelperText className="error-text">{this.state.descriptionError !== null ? this.state.descriptionError : null}</FormHelperText>
                                            </MuiThemeProvider>
                                        </FormControl>
                                        :
                                        <p className="checklist-item__description" onClick={this.handleDescriptionValueClick}>{this.state.description !== null ? this.state.description : "Description"}</p>
                                }
                            </div>


                        </div>
                        <div className="checklist-item__right-column">
                            <div className="checklist-item__crud-operation checklist-item__material-checkbox-container">
                                <MuiThemeProvider theme={checkBoxTheme}>
                                    <Checkbox
                                        onChange={() => { }}
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div className="checklist-item__crud-operation checklist-item__save">
                                <i className={this.state.isSaved ? "fa fa-floppy-o saved" : "fa fa-floppy-o"} onClick={() => { this.handleSaveIconClick() }}></i>
                            </div>
                            <div className="checklist-item__crud-operation checklist-item__remove fa fa-ban" onClick={() => { this.setDestroyedStatus(true) }}> </div>
                        </div>
                    </div>
                )
        )
    }
}
export default ChecklistItem



