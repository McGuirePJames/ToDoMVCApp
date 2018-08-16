import * as React from "react";
import "../Button/_Button.scss";
import { ReactElement } from "react";

export interface IButtonProps {
    Text: string;
    Color: string;
    OnClick: () => void;
}
export class Button extends React.Component<IButtonProps, {}> {
    constructor(props: IButtonProps) {
        super(props);

        this.state = {

        };
    }
    public render(): ReactElement<IButtonProps> {
        return (
            <button className="custom-button" type="button" style={{ backgroundColor: this.props.Color }} onClick={this.props.OnClick}>
                <span>{this.props.Text}</span>
            </button>
        );
    }
}
export default Button;