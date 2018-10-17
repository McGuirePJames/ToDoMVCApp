"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Button_1 = require("../Button/Button");
require("../Login/_Login.scss");
const Textbox_1 = require("../Textbox/Textbox");
const Common_1 = require("../../Common/Common");
const Response_1 = require("../Response/Response");
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = () => __awaiter(this, void 0, void 0, function* () {
            const username = this._emailInputContainer.current.getElementsByTagName('input')[0].value;
            const password = this._passwordInputContainer.current.getElementsByTagName('input')[0].value;
            const loginModel = { EmailAddress: username, Password: password };
            this.login(loginModel).then((loginResponse) => {
                if (!loginResponse.success) {
                    this.setLoginResponseState(loginResponse.responseText, Response_1.ResponseTypeEnum.Error);
                }
                else {
                    this.setLoginResponseState("Success!", Response_1.ResponseTypeEnum.Success);
                    window.location.href = "/";
                }
            });
        });
        this.login = (loginModel) => __awaiter(this, void 0, void 0, function* () {
            const loginResult = yield Common_1.postData("/api/User/LoginAsync", JSON.stringify(loginModel), Common_1.getAntiForgeryTokenWithoutData());
            const loginObject = JSON.parse(loginResult);
            return loginObject;
        });
        this.setLoginResponseState = (message, responseType) => {
            this.setState(Object.assign({}, this.state, { loginResponseMessage: message, loginResponseType: responseType }));
        };
        this.revealPassword = () => {
            this.setState(Object.assign({}, this.state, { isPasswordRevealed: this.state.isPasswordRevealed ? false : true }));
        };
        this.state = {
            loginResponseMessage: "",
            loginResponseType: Response_1.ResponseTypeEnum.None,
            isPasswordRevealed: false,
        };
        this._emailInputContainer = React.createRef();
        this._passwordInputContainer = React.createRef();
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.revealPassword = this.revealPassword.bind(this);
    }
    render() {
        return (React.createElement("div", { id: "LoginComponentContainer", className: "login-component-container" },
            React.createElement("div", { id: "LoginComponent", className: "login-component row" },
                React.createElement("div", { className: "login-component__left-column left" },
                    React.createElement("div", { className: "left-column__action" },
                        React.createElement("h5", { className: "left-column display-4" }, "Login")),
                    React.createElement("div", { className: "left-column__action" },
                        React.createElement("a", { href: "/User/SignUp" }, "Don't have an account?")),
                    React.createElement("div", { className: "left-column__action" },
                        React.createElement("a", { href: "/User/ForgotPassword" }, "Forgot Password?"))),
                React.createElement("div", { className: "login-component__right-column right" },
                    React.createElement("div", { className: "right-column__input-group", ref: this._emailInputContainer },
                        React.createElement(Textbox_1.default, { id: "emailAddress", class: "input-container", label: "Email Address", inputType: "text", multiline: false, rows: 1, leftIconClassName: "fa fa-envelope", rightIconClassName: null })),
                    React.createElement("div", { className: "right-column__input-group", ref: this._passwordInputContainer },
                        React.createElement(Textbox_1.default, { id: "loginPassword", class: "input-container", label: "Password", inputType: "password", multiline: false, rows: 1, leftIconClassName: "fa fa-lock", rightIconClassName: "fa fa-eye" })),
                    React.createElement("div", { className: "right-column__input-group login-container" },
                        React.createElement(Button_1.default, { Color: "#0E99D1", Text: "Login", OnClick: this.handleLoginClick })),
                    React.createElement(Response_1.Response, { Message: this.state.loginResponseMessage, ResponseType: this.state.loginResponseType })))));
    }
}
exports.Login = Login;
exports.default = Login;
//# sourceMappingURL=Login.js.map