"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("../SignUp/SignUp.scss");
var Textbox_1 = require("../Textbox/Textbox");
var Button_1 = require("../../Components/Button/Button");
var SideImage = require('../../../wwwroot/images/GenericSnowPicture.jpg');
var Common_1 = require("../../Common/Common");
var SignUp = /** @class */ (function (_super) {
    __extends(SignUp, _super);
    function SignUp(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSignUpClick = function () {
            console.log('hit');
            var username = _this._emailInputContainer.current.getElementsByTagName('input')[0].value;
            var password = _this._passwordInputContainer.current.getElementsByTagName('input')[0].value;
            var signUpData = { EmailAddress: username, Password: password };
            _this.signUp(signUpData);
        };
        _this.signUp = function (signUpModel) {
            console.log('signup');
            var response = Common_1.postData("/api/User/CreateUserAsync", JSON.stringify(signUpModel), Common_1.getAntiForgeryTokenWithoutData());
            console.log(response);
        };
        _this.state = {
            signUpError: "",
            isPasswordRevealed: false,
        };
        _this._emailInputContainer = React.createRef();
        _this._passwordInputContainer = React.createRef();
        _this._passwordConfirmInputContainer = React.createRef();
        _this.handleSignUpClick = _this.handleSignUpClick.bind(_this);
        _this.revealPassword = _this.revealPassword.bind(_this);
        _this.signUp = _this.signUp.bind(_this);
        return _this;
    }
    SignUp.prototype.revealPassword = function () {
        this.setState(__assign({}, this.state, { isPasswordRevealed: this.state.isPasswordRevealed ? false : true }));
    };
    SignUp.prototype.render = function () {
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
                    this.state.signUpError.length > 0 ? (React.createElement("div", { className: "form__error sign-up-error-container" },
                        React.createElement("p", { className: "alert alert-danger" },
                            " ",
                            this.state.signUpError))) : null))));
    };
    return SignUp;
}(React.Component));
exports.SignUp = SignUp;
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map