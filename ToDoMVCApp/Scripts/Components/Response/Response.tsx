import * as React from 'react';
import { ReactElement } from 'react';
import '../Response/_Response.scss';

export enum ResponseTypeEnum {
    Error,
    Warning,
    Success,
    None
}
export interface IResponseProps {
    ResponseType: ResponseTypeEnum;
    Message: string;
}

export class Response extends React.Component<IResponseProps, {}>{
    constructor(props) {
        super(props)
    }
    public render(): ReactElement<HTMLDivElement> {
        return (
            <div>
                {
                    this.props.ResponseType === ResponseTypeEnum.Error ?
                        (<div className="container-response error-response">
                            <p className="container-response__title">Error</p>
                            <p className="response">{this.props.Message}</p>
                        </div>) :
                        this.props.ResponseType === ResponseTypeEnum.Warning ?
                            (<div className="container-response warning-response">
                                <p className="container-response__title">Warning</p>
                                <p className="response">{this.props.Message}</p>
                            </div>) :
                            this.props.ResponseType === ResponseTypeEnum.Success ?
                                (<div className="container-response success-response">
                                    <p className="container-response__title">Success</p>
                                    <p className="response">{this.props.Message}</p>
                                </div>) : null
                }
            </div>
        )
    }
}
export default Response;