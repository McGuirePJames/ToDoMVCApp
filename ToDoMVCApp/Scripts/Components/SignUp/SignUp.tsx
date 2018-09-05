import * as React from 'react';
import '../SignUp/SignUp.scss';
import { TextBox } from '../Textbox/Textbox';
import { Button } from '../../Components/Button/Button';
var SideImage = require('../../../wwwroot/images/GenericSnowPicture.jpg');
import { postData, getAntiForgeryToken, getAntiForgeryTokenWithoutData } from '../../Common/Common';
import { HtmlHTMLAttributes } from 'react';
import { Response as ResponseModel} from '../../Common/Models/Response';
import { Response, ResponseTypeEnum } from '../Response/Response';

export interface ISignUpProps {
    Title?: string;
}
export interface ISignUpState {
    signUpResponseMessage?: string;
    signUpResponseType: ResponseTypeEnum;
    isPasswordRevealed?: boolean;
}

export class SignUp extends React.Component<ISignUpProps, ISignUpState> {

    _emailInputContainer: React.RefObject<HTMLDivElement>;
    _passwordInputContainer: React.RefObject<HTMLDivElement>;
    _passwordConfirmInputContainer: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props)
        this.state = {
            signUpResponseMessage: "",
            signUpResponseType: ResponseTypeEnum.None,
            isPasswordRevealed: false,
        }
        this._emailInputContainer = React.createRef();
        this._passwordInputContainer = React.createRef();
        this._passwordConfirmInputContainer = React.createRef();

        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.revealPassword = this.revealPassword.bind(this);
        this.setLoginResponseState = this.setLoginResponseState.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    public handleSignUpClick = async (): Promise<void> => {
        const username:string = (this._emailInputContainer.current.getElementsByTagName('input')[0] as HTMLInputElement).value;
        const password:string = (this._passwordInputContainer.current.getElementsByTagName('input')[0] as HTMLInputElement).value;
        const signUpModel:object = { EmailAddress: username, Password: password };

        this.signUp(signUpModel).then((signUpResponse) => {
            if (!signUpResponse.success) {
                this.setLoginResponseState(signUpResponse.responseText, ResponseTypeEnum.Error);
            }
            else {
                this.setLoginResponseState("Success!", ResponseTypeEnum.Success);
                window.location.href = "/";
            }
        });
    }
    public signUp = async (signUpModel: object): Promise<ResponseModel> => {
        const signUpResult: string = await postData("/api/User/CreateUserAsync", JSON.stringify(signUpModel), getAntiForgeryTokenWithoutData());
        const signUpResultObject: ResponseModel = JSON.parse(signUpResult);
        return signUpResultObject;
    }
    public setLoginResponseState = (message: string, responseType: ResponseTypeEnum): void => {
        this.setState({
            ...this.state,
            signUpResponseMessage: message,
            signUpResponseType: responseType
        });
    }
    public revealPassword = (): void => {
        this.setState({
            ...this.state,
            isPasswordRevealed: this.state.isPasswordRevealed ? false : true
        })
    }
    public render() {
        return (
            <div id="UserSignUpComponent" className="sign-up-container">
                <div id="UserSignUpComponentContainer" className="sign-up">
                    <div className="sign-up__left">
                        <img src={"/bundles/" + SideImage} />
                    </div>
                    <form className="sign-up__form">
                        <div className="company-information">
                            <div className="company-information__logo">
                                <img src="" />
                            </div>
                            <div className="company-information__name">
                                <h5>{this.props.Title}</h5>
                            </div>
                        </div>
                        <div className="form__description">
                            <p>Sign Up</p>
                        </div>
                        <div className="form__inputs">
                            <div className="form__input form-group" ref={this._emailInputContainer}>
                                <TextBox id="emailAddress" class="input-container" label="Email Address" inputType="text" multiline={false} rows={1} leftIconClassName="fa fa-envelope-o" rightIconClassName={null} />
                            </div>
                            <div className="form__input form-group" ref={this._passwordInputContainer}>
                                <TextBox id="password" class="input-container" label="Password" inputType="password" multiline={false} rows={1} leftIconClassName="fa fa-key" rightIconClassName="fa fa-eye" />
                            </div>
                            <div className="form__input form-group" ref={this._passwordConfirmInputContainer}>
                                <TextBox id="confirmPassword" class="input-container" label="Confirm Password" inputType="password" multiline={false} rows={1} leftIconClassName="fa fa-key" rightIconClassName="fa fa-eye" />
                            </div>
                        </div>
                        <div className="form__submit sign-up-button-container">
                            <Button Text="Sign Up" Color="#0E99D1" OnClick={this.handleSignUpClick} />
                        </div>
                        <div className="form__submit-response">
                            <Response Message={this.state.signUpResponseMessage} ResponseType={this.state.signUpResponseType} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default SignUp;