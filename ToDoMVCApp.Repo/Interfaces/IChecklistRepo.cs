using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoMVCApp.Data.Models;

namespace ToDoMVCApp.Repo.Interfaces
{
    public interface IChecklistRepo<T>
    {
		IQueryable<T> GetAll();
		Task<T> Get(long id);
		IQueryable<T> GetQueryable(long id);
		List<Checklist> GetChecklistItems(string userId);
		IQueryable<T> GetQueryable();
		Checklist CreateChecklist(T entity);
		void SaveChecklist(Checklist checklist);
		void DeleteChecklist(Checklist checklist);
	}
}
