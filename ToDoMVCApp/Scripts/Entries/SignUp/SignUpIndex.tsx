import * as ReactDOM from 'react-dom';
import SignUpHOC from '../../HighOrderComponents/SignUpHOC/SignUpHOC';
import * as React from 'react';

window.onload = function () {
    ReactDOM.render(
        <SignUpHOC />,
        document.getElementById('mount')
    )
}