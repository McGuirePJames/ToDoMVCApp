import * as React from 'react'
import * as ReactDOM from 'react-dom';
import '../ChecklistItems/_ChecklistItems.scss';
import { postData, getAntiForgeryTokenWithoutData } from '../../Common/Common';
import { Response, ResponseTypeEnum } from '../Response/Response';
import { ReactElement, createElement } from 'react';
import ChecklistItem from '../ChecklistItem/ChecklistItem';

export interface IChecklistItemsState {

}

export class ChecklistItems extends React.Component<{}, IChecklistItemsState> {

    private _checklistItems: React.RefObject<HTMLDivElement>

    constructor(props) {
        super(props)
        this.state = {

        }
        this._checklistItems = React.createRef();
    }
    private handleAddItemClick = () => {
        this.addChecklistItem();
    }
    public addChecklistItem = () => {
        const mount: HTMLDivElement = document.createElement('div');

        ReactDOM.render(
            <ChecklistItem title={null} description={null} />,
            mount
        )
        document.getElementById('checklistItems').insertBefore(mount, document.getElementById('containerAddItem'));
    }
    public render(): ReactElement<HTMLDivElement> {
        return (
            <div>
                <div className="container-navigation">
                    <p>Navigation Container</p>
                </div>
                <div id="checklistItems" className="checklist-items" ref={this._checklistItems}>
                    <ChecklistItem title={null} description={null} />
                    <ChecklistItem title={null} description={null} />
                    <div id="containerAddItem" className="checklist-items__item checklist-items__add">
                        <i className="fa fa-plus-square-o" aria-hidden="true" onClick={this.handleAddItemClick}></i>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChecklistItems