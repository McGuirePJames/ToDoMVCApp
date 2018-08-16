import * as ReactDOM from 'react-dom';
import LoginHOC from '../../HighOrderComponents/LoginHOC/LoginHOC';
import * as React from 'react';

window.onload = function () {
    ReactDOM.render(
        <LoginHOC />,
        document.getElementById('mount')
    )
}