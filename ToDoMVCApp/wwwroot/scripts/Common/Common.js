"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAntiForgeryToken(data) {
    var antiForgElement = document.getElementsByName('__RequestVerificationToken')[0];
    if (antiForgElement != null) {
        data.__RequestVerificationToken = antiForgElement.value;
    }
    return data;
}
exports.getAntiForgeryToken = getAntiForgeryToken;
;
function getAntiForgeryTokenWithoutData() {
    var antiForgElement = document.getElementsByName('__RequestVerificationToken')[0];
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
        xhr.send(data);
    });
}
exports.postData = postData;
//# sourceMappingURL=Common.js.map