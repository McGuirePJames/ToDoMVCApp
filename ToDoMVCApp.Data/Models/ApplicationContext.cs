using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using ToDoMVCApp.Data.Models;

namespace ToDoMVCApp.Data
{
	public class ApplicationContext : DbContext
	{
		public virtual DbSet<Checklist> checklist { get; set; }
		public virtual DbSet<ChecklistItem> checklistItem { get; set; }

		public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
		{
		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}
