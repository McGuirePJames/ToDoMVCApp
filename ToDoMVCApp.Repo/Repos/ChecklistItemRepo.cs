using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using ToDoMVCApp.Data;
using ToDoMVCApp.Data.Models;
using ToDoMVCApp.Repo.Interfaces;

namespace ToDoMVCApp.Repo.Repos
{
    public class ChecklistItemRepo<T> : IChecklistItemRepo<T> where T : BaseEntity
	{
		private readonly ApplicationContext _context;
		private readonly DbSet<T> entities;
		string errorMessage = string.Empty;

		public ChecklistItemRepo(ApplicationContext context)
		{
			this._context = context;
			entities = context.Set<T>();
		}

		public void DeleteChecklistItems(List<ChecklistItem> checklistItems)
		{
			_context.checklistItem.RemoveRange(checklistItems);
			_context.SaveChanges();
		}

		public void SaveChecklsitItem(ChecklistItem checklistItem)
		{
			_context.Update(checklistItem);
			SaveChanges();
		}

		public void CreateChecklistItem(ChecklistItem checklistItem)
		{
			_context.Add(checklistItem);
			SaveChanges();
		}

		private void SaveChanges()
		{
			this._context.SaveChanges();
		}

		public void SaveChecklistItem(ChecklistItem checklistItem)
		{
			throw new NotImplementedException();
		}
	}
}
