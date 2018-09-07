import * as React from 'react';
import '../ChecklistHOC/_ChecklistHOC.scss';
import { ComponentReadyStateEnum } from '../../Common/Models/ComponentReadyStateEnum';
import { ReactElement } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChecklistItems from '../../Components/ChecklistItems/ChecklistItems';

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
    public render(): ReactElement<HTMLDivElement> {
        return (
            <div className="hocMount">
                {
                    this.state.readyState === ComponentReadyStateEnum.Started ?
                        <div className="page-load-progress-container">
                            <CircularProgress />
                        </div>
                        :
                        <ChecklistItems />
                }

            </div>
        )
    }
}
export default LoginHOC;