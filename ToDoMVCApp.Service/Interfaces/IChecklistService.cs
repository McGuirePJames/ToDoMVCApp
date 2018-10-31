using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ToDoMVCApp.Data.Models;

namespace ToDoMVCApp.Service.Interfaces
{
    public interface IChecklistService
    {
		List<Checklist> GetChecklists(string userId);
		Checklist CreateChecklist(string name, string userId);
		void DeleteChecklist(int checklistId);
		void SaveChecklist(Checklist checklist);
    }
}
