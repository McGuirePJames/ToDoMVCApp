"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GetAntiForgeryToken(data) {
    var antiForgElement = document.getElementsByName('__RequestVerificationToken')[0];
    if (antiForgElement != null) {
        //data.__
    }
    //data.__RequestVerificationToken = 
    //return data;
}
exports.default = GetAntiForgeryToken;
;
function GetAntiForgeryTokenWithoutData() {
    //return $("[name='__RequestVerificationToken']").val();
}
exports.GetAntiForgeryTokenWithoutData = GetAntiForgeryTokenWithoutData;
;
//# sourceMappingURL=GetAntiForgeryToken.js.map