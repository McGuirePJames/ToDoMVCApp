import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactElement, SyntheticEvent } from 'react';
import { Checklist } from '../../../Common/Models/Checklist'
import '../Dropdown/_Dropdown.scss';

interface Props {
    checklists: Checklist[];
    onChange: Function,
}
interface State {
    isOpen: boolean;
    currentChecklist: Checklist
}

export class Dropdown extends React.Component<Props, State>{

}
export default Dropdown;