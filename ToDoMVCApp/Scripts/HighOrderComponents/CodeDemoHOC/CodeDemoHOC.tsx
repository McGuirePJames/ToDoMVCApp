import * as React from 'react';
import { Dropdown } from '../../Components/CodeDemo/Dropdown/Dropdown';
import Checklist from '../../Common/Models/Checklist';

export interface Props {

}
export interface State {

}

export class CodeDemoHOC extends React.Component<Props, State>{
    constructor(props) {
        super(props)
    }
    private getChecklists = (): Checklist[] => {
        let checklistOne = new Checklist();
        checklistOne.name = "Checklist One";
        checklistOne.checklistsId = 1;

        let checklistTwo = new Checklist();
        checklistTwo.name = "ChecklistTwo";
        checklistTwo.checklistsId = 2;

        let checklistThree = new Checklist();
        checklistThree.name = "ChecklistThree";
        checklistThree.checklistsId = 3;

        const checklists: Checklist[] = [checklistOne, checklistTwo, checklistThree]
        return checklists;
    }
    render(): React.ReactElement<HTMLDivElement> {
        return (
            <div className="container">
                <Dropdown checklists={this.getChecklists()} onChange={() => {console.log("Change")}}/>
            </div>
        )
    }
}
export default CodeDemoHOC;