using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoMVCApp.Data.Models;

namespace ToDoMVCApp.Repo.Interfaces
{
    public interface IRepo<T>
    {
		IQueryable<T> GetAll();
		Task<T> GetAsync(long id);
		IQueryable<T> GetQueryable(long id);
		IQueryable<T> GetQueryable();
		void Insert(T entity);
		void Update(T entity);
		void Delete(T entity);
	}
}
