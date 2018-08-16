import * as React from 'react';
import Login from '../../Components/Login/Login';
import '../../HighOrderComponents/LoginHOC/LoginHOC.scss';

export class LoginHOC extends React.Component<{}, {}>{
    public render() {
        return (
            <div className="hocMount">
                <Login/>
            </div>
        )
    }
}
export default LoginHOC;