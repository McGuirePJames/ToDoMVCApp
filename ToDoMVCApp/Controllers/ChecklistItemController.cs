using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoMVCApp.Data;
using ToDoMVCApp.Data.Models;
using ToDoMVCApp.Service.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ToDoMVCApp.Web.Controllers
{
    public class ChecklistItemController : Controller
    {
		private readonly IChecklistItemService _checklistItemService;
		private readonly UserManager<ApplicationUser> _userManager;

		public ChecklistItemController(IChecklistItemService checklistItemService, UserManager<ApplicationUser> userManager)
		{
			_checklistItemService = checklistItemService;
			_userManager = userManager;
		}

		public IActionResult Index()
        {
            return View();
        }
		[HttpPost]
		[Route("/api/[controller]/[action]")]
		[ValidateAntiForgeryToken]
		[Authorize]
		public async Task DeleteChecklistItems(List<ChecklistItem> checklistItems)
		{
			
		}
		[HttpPost]
		[Authorize]
		[ValidateAntiForgeryToken]
		[Route("/api/[controller]/[action]")]
		public async Task SaveChecklistItem(ChecklistItem checklistItem)
		{

		}
		[HttpPost]
		[Authorize]
		[ValidateAntiForgeryToken]
		[Route("/api/[controller]/[action]")]
		public void CreateChecklistItem([FromBody] ChecklistItem checklistItem)
		{
			_checklistItemService.CreateChecklistItem(checklistItem);
		}
	}
}