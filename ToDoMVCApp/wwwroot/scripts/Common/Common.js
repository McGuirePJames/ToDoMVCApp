"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAntiForgeryToken(data) {
    const antiForgElement = document.getElementsByName('__RequestVerificationToken')[0];
    if (antiForgElement != null) {
        data.__RequestVerificationToken = antiForgElement.value;
    }
    return data;
}
exports.getAntiForgeryToken = getAntiForgeryToken;
;
function getAntiForgeryTokenWithoutData() {
    const antiForgElement = document.getElementsByName('__RequestVerificationToken')[0];
    if (antiForgElement) {
        return antiForgElement.value;
    }
    return null;
}
exports.getAntiForgeryTokenWithoutData = getAntiForgeryTokenWithoutData;
;
function postData(url, data, requestVerificationToken) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('RequestVerificationToken', requestVerificationToken);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
            else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error("Network Error"));
        };
        xhr.setRequestHeader('Content-type', 'application/json');
        console.log(data);
        xhr.send(data);
    });
}
exports.postData = postData;
function getData(url, requestVerificationToken) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('RequestVerificationToken', requestVerificationToken);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
            else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error("Network Error"));
        };
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();
    });
}
exports.getData = getData;
class AnimateCSSHelper {
    constructor(element, callback) {
        this._transitionEvent = null;
        this._item = null;
        this._callback = null;
        this.transitionEndCallback = (event) => {
            this._item.removeEventListener(this._transitionEvent, this.transitionEndCallback);
            this._item.classList.remove('bounceOut');
            this._callback();
        };
        this.whichTransitionEvent = () => {
            var t, el = document.createElement("fakeelement");
            var transitions = {
                "transition": "transitionend",
                "OTransition": "oTransitionEnd",
                "MozTransition": "transitionend",
                "WebkitTransition": "webkitTransitionEnd"
            };
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        };
        this._transitionEvent = this.whichTransitionEvent();
        this._item = element;
        this._callback = callback;
        //this._item.addEventListener('click', () => {
        this._item.classList.toggle('bounceOut');
        this._item.addEventListener(this._transitionEvent, this.transitionEndCallback);
        //});
    }
}
exports.AnimateCSSHelper = AnimateCSSHelper;
//# sourceMappingURL=Common.js.map