import * as React from 'react'
import Button from '../Button/Button';
import '../Login/_Login.scss';
import TextBox from '../Textbox/Textbox';
import { Response as ResponseModel } from '../../Common/Models/Response';
import { postData, getAntiForgeryTokenWithoutData } from '../../Common/Common';
import { Response, ResponseTypeEnum } from '../Response/Response';

export interface ILoginState {
    loginResponseMessage: string;
    loginResponseType: ResponseTypeEnum;
    isPasswordRevealed?: boolean;
}

export class Login extends React.Component<{}, ILoginState> {
    _emailInputContainer: React.RefObject<HTMLDivElement>;
    _passwordInputContainer: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props)
        this.state = {
            loginResponseMessage: "",
            loginResponseType: ResponseTypeEnum.None,
            isPasswordRevealed: false,
        }
        this._emailInputContainer = React.createRef();
        this._passwordInputContainer = React.createRef();

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.revealPassword = this.revealPassword.bind(this);
    }
    public handleLoginClick = async (): Promise<void> => {
        const username:string = (this._emailInputContainer.current.getElementsByTagName('input')[0] as HTMLInputElement).value;
        const password:string = (this._passwordInputContainer.current.getElementsByTagName('input')[0] as HTMLInputElement).value;
        const loginModel:object = { EmailAddress: username, Password: password };

        this.login(loginModel).then((loginResponse) => {
            if (!loginResponse.success) {
                this.setLoginResponseState(loginResponse.responseText, ResponseTypeEnum.Error);
            }
            else {
                this.setLoginResponseState("Success!", ResponseTypeEnum.Success);
                window.location.href = "/";
            }
        });
    }
    public login = async (loginModel: object): Promise<ResponseModel> => {
        const loginResult: string = await postData("/api/User/LoginAsync", JSON.stringify(loginModel), getAntiForgeryTokenWithoutData());
        const loginObject: ResponseModel = JSON.parse(loginResult);
        return loginObject;
    }
    public setLoginResponseState = (message: string, responseType: ResponseTypeEnum): void => {
        this.setState({
            ...this.state,
            loginResponseMessage: message,
            loginResponseType: responseType
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
            <div id="LoginComponentContainer" className="login-component-container">
                <div id="LoginComponent" className="login-component row">
                    <div className="login-component__left-column left">
                        <div className="left-column__action">
                            <h5 className="left-column display-4">Login</h5>
                        </div>
                        <div className="left-column__action">
                            <a href="/User/SignUp">Don't have an account?</a>

                        </div>
                        <div className="left-column__action">
                            <a href="/User/ForgotPassword">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="login-component__right-column right">
                        <div className="right-column__input-group" ref={this._emailInputContainer}>
                            <TextBox id="emailAddress" class="input-container" label="Email Address" inputType="text" multiline={false} rows={1} leftIconClassName="fa fa-envelope" rightIconClassName={null} />
                        </div>
                        <div className="right-column__input-group" ref={this._passwordInputContainer}>
                            <TextBox id="loginPassword" class="input-container" label="Password" inputType="password" multiline={false} rows={1} leftIconClassName="fa fa-lock" rightIconClassName="fa fa-eye" />
                        </div>
                        <div className="right-column__input-group login-container">
                            <Button Color="#0E99D1" Text="Login" OnClick={this.handleLoginClick} />
                        </div>
                        <Response Message={this.state.loginResponseMessage} ResponseType={this.state.loginResponseType} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Login