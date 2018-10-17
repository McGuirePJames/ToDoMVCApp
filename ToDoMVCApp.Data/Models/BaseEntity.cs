using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoMVCApp.Data.Models
{
    public class BaseEntity
    {
		public DateTime DateCreated { get; set; }
		public DateTime DateModified { get; set; }
	}
}
