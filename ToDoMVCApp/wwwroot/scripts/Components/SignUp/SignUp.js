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
require("../SignUp/SignUp.scss");
const Textbox_1 = require("../Textbox/Textbox");
const Button_1 = require("../../Components/Button/Button");
var SideImage = require('../../../wwwroot/images/GenericSnowPicture.jpg');
const Common_1 = require("../../Common/Common");
const Response_1 = require("../Response/Response");
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignUpClick = () => __awaiter(this, void 0, void 0, function* () {
            const username = this._emailInputContainer.current.getElementsByTagName('input')[0].value;
            const password = this._passwordInputContainer.current.getElementsByTagName('input')[0].value;
            const signUpModel = { EmailAddress: username, Password: password };
            this.signUp(signUpModel).then((signUpResponse) => {
                if (!signUpResponse.success) {
                    this.setLoginResponseState(signUpResponse.responseText, Response_1.ResponseTypeEnum.Error);
                }
                else {
                    this.setLoginResponseState("Success!", Response_1.ResponseTypeEnum.Success);
                    window.location.href = "/";
                }
            });
        });
        this.signUp = (signUpModel) => __awaiter(this, void 0, void 0, function* () {
            const signUpResult = yield Common_1.postData("/api/User/CreateUserAsync", JSON.stringify(signUpModel), Common_1.getAntiForgeryTokenWithoutData());
            const signUpResultObject = JSON.parse(signUpResult);
            return signUpResultObject;
        });
        this.setLoginResponseState = (message, responseType) => {
            this.setState(Object.assign({}, this.state, { signUpResponseMessage: message, signUpResponseType: responseType }));
        };
        this.revealPassword = () => {
            this.setState(Object.assign({}, this.state, { isPasswordRevealed: this.state.isPasswordRevealed ? false : true }));
        };
        this.state = {
            signUpResponseMessage: "",
            signUpResponseType: Response_1.ResponseTypeEnum.None,
            isPasswordRevealed: false,
        };
        this._emailInputContainer = React.createRef();
        this._passwordInputContainer = React.createRef();
        this._passwordConfirmInputContainer = React.createRef();
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.revealPassword = this.revealPassword.bind(this);
        this.setLoginResponseState = this.setLoginResponseState.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    render() {
        return (React.createElement("div", { id: "UserSignUpComponent", className: "sign-up-container" },
            React.createElement("div", { id: "UserSignUpComponentContainer", className: "sign-up" },
                React.createElement("div", { className: "sign-up__left" },
                    React.createElement("img", { src: "/bundles/" + SideImage })),
                React.createElement("form", { className: "sign-up__form" },
                    React.createElement("div", { className: "company-information" },
                        React.createElement("div", { className: "company-information__logo" },
                            React.createElement("img", { src: "" })),
                        React.createElement("div", { className: "company-information__name" },
                            React.createElement("h5", null, this.props.Title))),
                    React.createElement("div", { className: "form__description" },
                        React.createElement("p", null, "Sign Up")),
                    React.createElement("div", { className: "form__inputs" },
                        React.createElement("div", { className: "form__input form-group", ref: this._emailInputContainer },
                            React.createElement(Textbox_1.TextBox, { id: "emailAddress", class: "input-container", label: "Email Address", inputType: "text", multiline: false, rows: 1, leftIconClassName: "fa fa-envelope-o", rightIconClassName: null })),
                        React.createElement("div", { className: "form__input form-group", ref: this._passwordInputContainer },
                            React.createElement(Textbox_1.TextBox, { id: "password", class: "input-container", label: "Password", inputType: "password", multiline: false, rows: 1, leftIconClassName: "fa fa-key", rightIconClassName: "fa fa-eye" })),
                        React.createElement("div", { className: "form__input form-group", ref: this._passwordConfirmInputContainer },
                            React.createElement(Textbox_1.TextBox, { id: "confirmPassword", class: "input-container", label: "Confirm Password", inputType: "password", multiline: false, rows: 1, leftIconClassName: "fa fa-key", rightIconClassName: "fa fa-eye" }))),
                    React.createElement("div", { className: "form__submit sign-up-button-container" },
                        React.createElement(Button_1.Button, { Text: "Sign Up", Color: "#0E99D1", OnClick: this.handleSignUpClick })),
                    React.createElement("div", { className: "form__submit-response" },
                        React.createElement(Response_1.Response, { Message: this.state.signUpResponseMessage, ResponseType: this.state.signUpResponseType }))))));
    }
}
exports.SignUp = SignUp;
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map