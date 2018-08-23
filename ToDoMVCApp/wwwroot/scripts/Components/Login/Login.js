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
var Button_1 = require("../Button/Button");
require("../Login/_Login.scss");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loginError: "",
            isPasswordRevealed: false,
        };
        _this.login = _this.login.bind(_this);
        _this.revealPassword = _this.revealPassword.bind(_this);
        return _this;
    }
    Login.prototype.login = function () {
    };
    Login.prototype.componentDidMount = function () {
        console.log("login comopnent mount");
    };
    Login.prototype.revealPassword = function () {
        this.setState(__assign({}, this.state, { isPasswordRevealed: this.state.isPasswordRevealed ? false : true }));
    };
    Login.prototype.render = function () {
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
                    React.createElement("div", { className: "right-column__input-group" },
                        React.createElement("label", null, "Email Address"),
                        React.createElement("div", { className: "inputs" },
                            React.createElement("div", { className: "inputs__icon-container icon-envelope" },
                                React.createElement("i", { className: "fa fa-envelope", "aria-hidden": "true" })),
                            React.createElement("div", null,
                                React.createElement("input", { id: "LoginUsername", type: "text" })))),
                    React.createElement("div", { className: "right-column__input-group" },
                        React.createElement("label", null, "Password"),
                        React.createElement("div", { className: "inputs" },
                            React.createElement("div", { className: "inputs__icon-container icon-lock" },
                                React.createElement("i", { className: "fa fa-lock", "aria-hidden": "true" })),
                            React.createElement("div", null,
                                React.createElement("input", { id: "LoginPassword", type: this.state.isPasswordRevealed ? "text" : "password" })),
                            React.createElement("div", { className: "inputs__icon-container icon-eye" },
                                React.createElement("i", { className: "fa fa-eye", "aria-hidden": "true", onClick: this.revealPassword })))),
                    React.createElement("div", { className: "right-column__input-group login-container" },
                        React.createElement(Button_1.default, { Color: "#0E99D1", Text: "Login", OnClick: this.login })),
                    this.state.loginError.length > 0 ? (React.createElement("div", { className: "right-column__login-error login-error-container" },
                        React.createElement("p", { className: "alert alert-danger" },
                            " ",
                            this.state.loginError))) : null))));
    };
    return Login;
}(React.Component));
exports.Login = Login;
exports.default = Login;
//# sourceMappingURL=Login.js.map