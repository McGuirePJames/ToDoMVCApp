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

export function postData(url: string, data: string, requestVerificationToken: string): Promise<string> {
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

export function getData(url: string, requestVerificationToken: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        var xhr: XMLHttpRequest = new XMLHttpRequest(); 
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

export class AnimateCSSHelper {
    private _transitionEvent = null;
    private _item: HTMLElement = null;
    private _callback: Function = null;

    constructor(element: HTMLElement, callback: Function) {
        this._transitionEvent = this.whichTransitionEvent();
        this._item = element;
        this._callback = callback;
        //this._item.addEventListener('click', () => {
        this._item.classList.toggle('bounceOut');
        this._item.addEventListener(this._transitionEvent, this.transitionEndCallback);
        //});

    }

    transitionEndCallback = (event): void => {
        this._item.removeEventListener(this._transitionEvent, this.transitionEndCallback);
        this._item.classList.remove('bounceOut');
        this._callback();
    }
    whichTransitionEvent = (): void => {
        var t,
            el = document.createElement("fakeelement");

        var transitions = {
            "transition": "transitionend",
            "OTransition": "oTransitionEnd",
            "MozTransition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }
}