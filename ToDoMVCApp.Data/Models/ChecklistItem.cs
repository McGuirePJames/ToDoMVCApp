using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ToDoMVCApp.Data.Models
{
	[Table("ChecklistItems")]
    public class ChecklistItem : BaseEntity
	{
		[Key]
		[Column("ChecklistsItemId")]
		public int ChecklistsItemId { get; set; }
		[Column("ChecklistsId")]
		public int ChecklistsId { get; set; }
		[Column("Name")]
		public string Name { get; set; }
		[Column("Description")]
		public string Description { get; set; }
    }
}
