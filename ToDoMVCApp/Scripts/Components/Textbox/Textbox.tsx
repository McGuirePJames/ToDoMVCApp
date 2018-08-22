import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import '../TextBox/_TextBox.scss';

export interface ITextFieldProps {
    id: string;
    class: string;
    label: string;
    inputType: string;
    multiline: boolean;
    rows: number;
    leftIconClassName?: string;
    rightIconClassName?: string;    
}
export class TextBox extends React.Component<ITextFieldProps, {}> {
    textInput: React.RefObject<HTMLDivElement>;
    constructor(props) {
        super(props)
        this.textInput = React.createRef();
        this.state = {

        }
        this.togglePasswordReveal = this.togglePasswordReveal.bind(this);
    }
    private addStyling() {
        const materialInputContainer: HTMLElement = this.textInput.current;
        let styling = "";
        if (materialInputContainer !== null) {
            for (let i = 0; i < materialInputContainer.childNodes.length; i++) {
                let child: HTMLElement = materialInputContainer.childNodes[i] as HTMLElement;
                if (child.classList.contains("first-icon")) {
                    styling += "padding-left: 35px;";
                }
                else if (child.classList.contains("second-icon")) {
                    styling += "padding-right: 35px;";
                }
            }
            const input: HTMLElement = materialInputContainer.getElementsByTagName('input')[0];
            input.setAttribute('style', styling);
        }

    }
    private addClassNameToInput() {
        //needed a way to figure out when to add padding to input because of icons being present.  Since icons are absolute positioned.
        const materialInputContainer: HTMLElement = this.textInput.current;
        if (this.props.leftIconClassName !== null) {
            materialInputContainer.classList.add("has-left-icon");
        }
        if (this.props.rightIconClassName !== null) {
            materialInputContainer.classList.add("has-right-icon");
        }
    }
    private togglePasswordReveal() {
        const materialInputContainer: HTMLElement = this.textInput.current;
        const input: HTMLInputElement = materialInputContainer.getElementsByTagName('input')[0];

        if (input.type === "text") {
            input.setAttribute('type', 'password');
        }
        else if (input.type === "password") {
            input.setAttribute('type', 'text');
        }
    }
    public componentDidMount() {
        this.addStyling();
        this.addClassNameToInput();
    }
    render() {
        return (
            <div className="material-input" ref={this.textInput}>
                {this.props.leftIconClassName !== null ?
                    (
                        <div className="icon-container first-icon">
                            <i className={this.props.leftIconClassName} aria-hidden="true"></i>
                        </div>
                    ) : null
                }
                <TextField
                    id={this.props.id}
                    className={this.props.class}
                    label={this.props.label}
                    type={this.props.inputType}
                    multiline={this.props.multiline}
                    rows={this.props.rows}
                    margin="normal"
                    autoComplete="on"
                />
                {this.props.rightIconClassName !== null ?
                    (
                        <div className="icon-container second-icon">
                            <i className={this.props.rightIconClassName} aria-hidden="true" onClick={this.togglePasswordReveal}></i>
                        </div>
                    ) : null
                }
            </div>


        );
    }
}
export default TextBox