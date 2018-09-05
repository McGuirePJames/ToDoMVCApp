import { Response } from "./Models/Response";

export function getAntiForgeryToken(data) {
    const antiForgElement: HTMLInputElement = document.getElementsByName('__RequestVerificationToken')[0] as HTMLInputElement;
    if (antiForgElement != null) {
        data.__RequestVerificationToken = antiForgElement.value;
    }
    return data;
};
export function getAntiForgeryTokenWithoutData() {
    const antiForgElement: HTMLInputElement = document.getElementsByName('__RequestVerificationToken')[0] as HTMLInputElement;
    if (antiForgElement) {
        return antiForgElement.value;
    }
    return null;
};

export function postData(url: string, data: string, requestVerificationToken: string):Promise<string> {
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



