using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoMVCApp.Data;
using ToDoMVCApp.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using ToDoMVCApp.Data.Models;
using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;

namespace ToDoMVCApp.Controllers
{
	public class ChecklistController : Controller
    {
		private readonly IChecklistService _checklistService;
		private readonly IChecklistItemService _checklistItemService;
		private readonly UserManager<ApplicationUser> _userManager;

		public ChecklistController(IChecklistService checklistService, IChecklistItemService checklistItemService, UserManager<ApplicationUser> userManager)
		{
			_checklistService = checklistService;
			_checklistItemService = checklistItemService;
			_userManager = userManager;
		}
		private async Task<Checklist> GetUserChecklist(int checklistId)
		{
			ClaimsPrincipal userClaims = HttpContext.User;
			ApplicationUser applicationUser = await _userManager.GetUserAsync(userClaims);

			//checks if requested checklist to delete actually belongs to user;
			List<Checklist> checklists = _checklistService.GetChecklists(applicationUser.Id);
			Checklist result = checklists.Where(x => x.ChecklistsId == checklistId)
				.FirstOrDefault();
			if(result != null)
			{
				return result;
			}
			return null;
		}
		[Route("/Checklist")]
		[Authorize]
        public IActionResult Checklist()
        {
            return View();
        }
		[Authorize]
		[HttpGet]
		[Route("/api/[controller]/[action]")]
		public async Task<List<Checklist>> GetChecklists()
		{
			ClaimsPrincipal userClaims = HttpContext.User;
			ApplicationUser applicationUser = await _userManager.GetUserAsync(userClaims);

			return _checklistService.GetChecklists(applicationUser.Id);
		}
		[Authorize]
		[HttpPost]
		[Route("/api/[controller]/[action]")]
		public async Task<Checklist> CreateChecklist([FromBody] string name)
		{
			ClaimsPrincipal userClaims = HttpContext.User;
			ApplicationUser applicationUser = await _userManager.GetUserAsync(userClaims);

			return _checklistService.CreateChecklist(name, applicationUser.Id);
		}
		[Authorize]
		[HttpPost]
		[Route("/api/[controller]/[action]")]
		public async Task DeleteChecklist([FromBody] int checklistId)
		{
			Checklist result = await GetUserChecklist(checklistId);
			if(result != null)
			{
				_checklistItemService.DeleteChecklistItems(result.ChecklistItems);
				_checklistService.DeleteChecklist(checklistId);
			}
		}
		[Authorize]
		[HttpPost]
		[Route("/api/[controller]/[action]")]
		public async Task SaveChecklist([FromBody] Checklist checklist)
		{
			Checklist result = await GetUserChecklist(checklist.ChecklistsId);
			if (result != null)
			{
				_checklistService.SaveChecklist(checklist);
			}
		}
	}
}