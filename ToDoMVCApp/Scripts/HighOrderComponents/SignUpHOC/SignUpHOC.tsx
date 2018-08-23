import * as React from 'react';
import SignUp from '../../Components/SignUp/SignUp';
import '../../HighOrderComponents/SignUpHOC/SignUpHOC.scss';
import { ReactElement } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ComponentReadyStateEnum } from '../../Common/Models/ComponentReadyStateEnum';

export interface ISignUpHOCState {
    readyState: ComponentReadyStateEnum;
}

export class SignUpHOC extends React.Component<{}, ISignUpHOCState>{
    constructor(props) {
        super(props)
        this.state = {
            readyState: null
        }
    }
    componentWillMount() {
        this.setState({
            ...this.state,
            readyState: ComponentReadyStateEnum.Started
        });
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ...this.state,
                readyState: ComponentReadyStateEnum.Finished
            });
        }, 2000);
    }
    public render():ReactElement<HTMLDivElement> {
        return (
            <div className="hocMount">
                {
                    this.state.readyState === ComponentReadyStateEnum.Started ?
                        <div className="progress-container">
                            <CircularProgress />
                        </div>

                        :
                        <SignUp Title="To Do MVC App" />
                }
            </div>
        )
    }
}
export default SignUpHOC;