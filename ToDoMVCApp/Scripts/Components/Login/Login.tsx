import * as React from 'react'
import Button from '../Button/Button';
import '../Login/_Login.scss';

export interface ILoginState {
    loginError: string;
    isPasswordRevealed?: boolean;
}

export class Login extends React.Component<{}, ILoginState> {
    constructor(props) {
        super(props)
        this.state = {
            loginError: "",
            isPasswordRevealed: false,            
        }
        this.login = this.login.bind(this);
        this.revealPassword = this.revealPassword.bind(this);
    }    
    public login() {
        
    }
    public revealPassword():void {
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
                        <div className="right-column__input-group">
                            <label>Email Address</label>
                            <div className="inputs">
                                <div className="inputs__icon-container icon-envelope">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </div>
                                <div>
                                    <input id="LoginUsername" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="right-column__input-group">
                            <label>Password</label>
                            <div className="inputs">
                                <div className="inputs__icon-container icon-lock">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </div>
                                <div>
                                    <input id="LoginPassword" type={this.state.isPasswordRevealed ? "text" : "password"} />
                                </div>
                                <div className="inputs__icon-container icon-eye">
                                    <i className="fa fa-eye" aria-hidden="true" onClick={this.revealPassword}></i>
                                </div>
                            </div>
                        </div>
                        <div className="right-column__input-group login-container">
                            <Button Color="#0E99D1" Text="Login" OnClick={this.login} />
                        </div>
                        {
                            this.state.loginError.length > 0 ? (
                                <div className="right-column__login-error login-error-container">
                                    <p className="alert alert-danger"> {this.state.loginError}</p>
                                </div>
                            ) : null
                        }

                    </div>
                </div>
            </div>
        )
    }
}
export default Login