using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoMVCApp.ViewModels
{
    public class UserSignUp
    {
		[StringLength(160)]
		public string EmailAddress { get; set; }
		[StringLength(80)]
		public string Password { get; set; }
    }
}
