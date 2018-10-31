using System;
using System.Collections.Generic;
using System.Text;
using ToDoMVCApp.Data.Models;

namespace ToDoMVCApp.Repo.Interfaces
{
    public interface IChecklistItemRepo<T>
    {
		void DeleteChecklistItems(List<ChecklistItem> checklistItems);
		void SaveChecklistItem(ChecklistItem checklistItem);
		void CreateChecklistItem(ChecklistItem checklistItem);
	}
}
