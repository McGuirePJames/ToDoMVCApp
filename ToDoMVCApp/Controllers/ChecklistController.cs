using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoMVCApp.Data;
using ToDoMVCApp.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using ToDoMVCApp.Data.Models;
using System.Collections.Generic;
using System.Security.Claims;

namespace ToDoMVCApp.Controllers
{
	public class ChecklistController : Controller
    {
		private readonly IChecklistService _checklistService;
		private readonly UserManager<ApplicationUser> _userManager;

		public ChecklistController(IChecklistService checklistService, UserManager<ApplicationUser> userManager)
		{
			_checklistService = checklistService;
			_userManager = userManager;
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
	}
}