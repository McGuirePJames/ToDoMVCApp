using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoMVCApp.Data;
using ToDoMVCApp.Data.Models;
using ToDoMVCApp.Repo.Interfaces;

namespace ToDoMVCApp.Repo.Repos
{
	public class ChecklistRepo<T> : IChecklistRepo<T> where T : BaseEntity
	{
		private readonly ApplicationContext _context;
		private DbSet<T> entities;
		string errorMessage = string.Empty;

		public ChecklistRepo(ApplicationContext context)
		{
			this._context = context;
			entities = context.Set<T>();
		}

		public void Delete(T entity)
		{
			if (entity == null)
			{
				throw new ArgumentNullException("entity");
			}
			entities.Remove(entity);
			SaveChange();
		}

		public async Task<T> GetAsync(long id)
		{
			return await entities.FindAsync(id);
		}

		public IQueryable<T> GetAll()
		{
			return entities.AsQueryable();
		}

		public IQueryable<T> GetQueryable()
		{
			return entities.AsQueryable();
		}

		public IQueryable<T> GetQueryable(long id)
		{
			//return entities.Where(x => x.Id == id).AsQueryable();
			throw new NotImplementedException();
		}

		public List<Checklist> GetChecklistItems(string userId)
		{
			return (from checklists in _context.checklist
						 select new Checklist
						 {
							 ChecklistsId = checklists.ChecklistsId,
							 Name = checklists.Name,
							 AspNetUsersId = checklists.AspNetUsersId,
							 ChecklistItems = 
							 (from checklistItem in _context.checklistItem
							  where checklistItem.ChecklistsId == checklists.ChecklistsId
							  select new ChecklistItem {
								  ChecklistsId = checklistItem.ChecklistsId,
								  ChecklistsItemId = checklistItem.ChecklistsItemId,
								  Name = checklistItem.Name,
								  Description = checklistItem.Description,
								  DateCreated = checklistItem.DateCreated,
								  DateModified = checklistItem.DateModified}).ToList(),
							 DateCreated = checklists.DateCreated,
							 DateModified = checklists.DateModified
						 }).ToList();
		}

		public Checklist CreateChecklist(T entity)
		{
			var checklist = entity as Checklist;
			if (entity == null)
			{
				throw new ArgumentNullException("entity");
			}
			_context.checklist.Add(checklist);
			_context.SaveChanges();
			return checklist;
		}

		public void Update(T entity)
		{
			if (entity == null)
			{
				throw new ArgumentNullException("entity");
			}
			SaveChange();
		}

		private void SaveChange()
		{
			_context.SaveChanges();
		}

		public Task<T> Get(long id)
		{
			throw new NotImplementedException();
		}
	}
}
