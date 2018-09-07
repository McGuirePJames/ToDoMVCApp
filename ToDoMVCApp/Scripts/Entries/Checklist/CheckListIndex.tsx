import * as ReactDOM from 'react-dom';
import ChecklistHOC from '../../HighOrderComponents/ChecklistHOC/ChecklistHOC';
import * as React from 'react';

window.onload = function () {
    ReactDOM.render(
        <ChecklistHOC />,
        document.getElementById('mount')
    )
}