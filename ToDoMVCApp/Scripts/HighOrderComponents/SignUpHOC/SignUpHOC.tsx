import * as React from 'react';
import SignUp from '../../Components/SignUp/SignUp';
import '../../HighOrderComponents/SignUpHOC/SignUpHOC.scss';

export class SignUpHOC extends React.Component<{}, {}>{
    public render() {
        return (
            <div className="hocMount">
                <SignUp Title="To Do MVC App"/>
            </div>
        )
    }
}
export default SignUpHOC;