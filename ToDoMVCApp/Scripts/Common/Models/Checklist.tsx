import ChecklistItems from "./ChecklistItems";

export class Checklist {
    checklistsId: number;
    aspNetUsersId: string;
    name: string;
    checklistItems: ChecklistItems[];
    dateCreated: Date;
    dateModified: Date;
}
export default Checklist