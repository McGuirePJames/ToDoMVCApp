import CodeDemoHOC from '../../HighOrderComponents/CodeDemoHOC/CodeDemoHOC';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

window.onload = function () {
    ReactDOM.render(
        <CodeDemoHOC />,
        document.getElementById('mount')
    )
}