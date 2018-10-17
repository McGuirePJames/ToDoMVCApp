using System;
using System.Collections.Generic;
using System.Text;
using ToDoMVCApp.Data.Models;

namespace ToDoMVCApp.Service.Interfaces
{
    public interface IChecklistItemService
    {
		List<ChecklistItem> GetChecklistItems();
    }
}
