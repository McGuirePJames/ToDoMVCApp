using System;
using System.Collections.Generic;
using System.Text;
using ToDoMVCApp.Data.Models;
using ToDoMVCApp.Repo.Interfaces;
using ToDoMVCApp.Service.Interfaces;

namespace ToDoMVCApp.Service.Services
{
    public class ChecklistItemService : IChecklistItemService
    {
		private readonly IChecklistItemRepo<ChecklistItem> _checklistItemRepository;

		public ChecklistItemService(IChecklistItemRepo<ChecklistItem> checklistItemRepo)
		{
			this._checklistItemRepository = checklistItemRepo;
		}

		public void DeleteChecklistItems(List<ChecklistItem> checklistItems)
		{
			_checklistItemRepository.DeleteChecklistItems(checklistItems);
		}

		public List<ChecklistItem> GetChecklistItems()
		{
			throw new NotImplementedException();
		}
		public void SaveChecklistItem(ChecklistItem checklistItem)
		{

		}
		public void CreateChecklistItem(ChecklistItem checklistItem)
		{
			_checklistItemRepository.CreateChecklistItem(checklistItem);
		}
	}
}
