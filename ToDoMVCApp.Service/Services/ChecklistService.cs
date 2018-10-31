using System;
using System.Collections.Generic;
using System.Text;
using ToDoMVCApp.Data.Models;
using ToDoMVCApp.Repo.Interfaces;
using ToDoMVCApp.Repo.Repos;
using ToDoMVCApp.Service.Interfaces;

namespace ToDoMVCApp.Service.Services
{
    public class ChecklistService : IChecklistService
    {
		private readonly IChecklistRepo<Checklist> _checklistRepository;

		public ChecklistService(IChecklistRepo<Checklist> checklistRepository)
		{
			_checklistRepository = checklistRepository;
		}

		public Checklist CreateChecklist(string name, string userId)
		{
			var checklist = new Checklist();
			checklist.Name = name;
			checklist.AspNetUsersId = userId;
			checklist.DateModified = DateTime.Now;
			checklist.DateCreated = DateTime.Now;

		    return _checklistRepository.CreateChecklist(checklist);
		}

		public List<Checklist> GetChecklists(string userId)
		{
			return _checklistRepository.GetChecklistItems(userId);
		}
		public void DeleteChecklist(int checklistId)
		{
			var checklist = new Checklist() { ChecklistsId = checklistId };
			_checklistRepository.DeleteChecklist(checklist);
		}
		public void SaveChecklist(Checklist checklist)
		{
			_checklistRepository.SaveChecklist(checklist);
		}
	}
}
