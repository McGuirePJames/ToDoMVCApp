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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("../Button/Button");
require("../Login/_Login.scss");
var Textbox_1 = require("../Textbox/Textbox");
var Common_1 = require("../../Common/Common");
var Response_1 = require("../Response/Response");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.handleLoginClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var username, password, loginModel;
            return __generator(this, function (_a) {
                username = this._emailInputContainer.current.getElementsByTagName('input')[0].value;
                password = this._passwordInputContainer.current.getElementsByTagName('input')[0].value;
                loginModel = { EmailAddress: username, Password: password };
                this.login(loginModel).then(function (loginResponse) {
                    if (!loginResponse.success) {
                        _this.setLoginResponseState(loginResponse.responseText, Response_1.ResponseTypeEnum.Error);
                    }
                    else {
                        _this.setLoginResponseState("Success!", Response_1.ResponseTypeEnum.Success);
                        window.location.href = "/";
                    }
                });
                return [2 /*return*/];
            });
        }); };
        _this.login = function (loginModel) { return __awaiter(_this, void 0, void 0, function () {
            var loginResult, loginObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Common_1.postData("/api/User/LoginAsync", JSON.stringify(loginModel), Common_1.getAntiForgeryTokenWithoutData())];
                    case 1:
                        loginResult = _a.sent();
                        loginObject = JSON.parse(loginResult);
                        return [2 /*return*/, loginObject];
                }
            });
        }); };
        _this.setLoginResponseState = function (message, responseType) {
            _this.setState(__assign({}, _this.state, { loginResponseMessage: message, loginResponseType: responseType }));
        };
        _this.revealPassword = function () {
            _this.setState(__assign({}, _this.state, { isPasswordRevealed: _this.state.isPasswordRevealed ? false : true }));
        };
        _this.state = {
            loginResponseMessage: "",
            loginResponseType: Response_1.ResponseTypeEnum.None,
            isPasswordRevealed: false,
        };
        _this._emailInputContainer = React.createRef();
        _this._passwordInputContainer = React.createRef();
        _this.handleLoginClick = _this.handleLoginClick.bind(_this);
        _this.revealPassword = _this.revealPassword.bind(_this);
        return _this;
    }
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
                    React.createElement("div", { className: "right-column__input-group", ref: this._emailInputContainer },
                        React.createElement(Textbox_1.default, { id: "emailAddress", class: "input-container", label: "Email Address", inputType: "text", multiline: false, rows: 1, leftIconClassName: "fa fa-envelope", rightIconClassName: null })),
                    React.createElement("div", { className: "right-column__input-group", ref: this._passwordInputContainer },
                        React.createElement(Textbox_1.default, { id: "loginPassword", class: "input-container", label: "Password", inputType: "password", multiline: false, rows: 1, leftIconClassName: "fa fa-lock", rightIconClassName: "fa fa-eye" })),
                    React.createElement("div", { className: "right-column__input-group login-container" },
                        React.createElement(Button_1.default, { Color: "#0E99D1", Text: "Login", OnClick: this.handleLoginClick })),
                    React.createElement(Response_1.Response, { Message: this.state.loginResponseMessage, ResponseType: this.state.loginResponseType })))));
    };
    return Login;
}(React.Component));
exports.Login = Login;
exports.default = Login;
//# sourceMappingURL=Login.js.map