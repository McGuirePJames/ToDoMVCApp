import * as React from 'react';
import Login from '../../Components/Login/Login';
import '../../HighOrderComponents/LoginHOC/LoginHOC.scss';
import { ComponentReadyStateEnum } from '../../Common/Models/ComponentReadyStateEnum';
import { ReactElement } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface ILogicHOCState {
    readyState: ComponentReadyStateEnum;
}
export class LoginHOC extends React.Component<{}, ILogicHOCState>{
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
                        <Login />
                }

            </div>
        )
    }
}
export default LoginHOC;