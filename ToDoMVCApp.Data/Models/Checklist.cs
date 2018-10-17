using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ToDoMVCApp.Data.Models
{
	[Table("Checklists")]
	public class Checklist : BaseEntity
    {
		[Key]
		[Column("ChecklistsId")]
		public int ChecklistsId { get; set; }
		[Column("AspNetUsersId")]
		public string AspNetUsersId { get; set; }
		[Column("Name")]
		public string Name { get; set; }		
		public List<ChecklistItem> ChecklistItems { get; set; }

		public Checklist()
		{
			this.ChecklistItems = new List<ChecklistItem>();
		}
	}	
}
