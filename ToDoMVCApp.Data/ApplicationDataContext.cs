using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace ToDoMVCApp.Data
{
	public class ApplicationDataContext : IdentityDbContext<Microsoft.AspNetCore.Identity.IdentityUser<Guid> , IdentityRole<Guid>, Guid>
	{
		public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options)
			: base(options)
		{ }

		public DbSet<string> Attachments { get; set; }
	}
}
