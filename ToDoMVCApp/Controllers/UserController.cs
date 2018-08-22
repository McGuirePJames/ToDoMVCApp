using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ToDoMVCApp.Data;
using ToDoMVCApp.Service.Interfaces;
using ToDoMVCApp.ViewModels;

namespace ToDoMVCApp.Controllers
{
	[Route("/api/User/")]
	public class UserController : Controller
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly IUserService userService;

		public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
		}
		[Route("/User/SignUp")]
		public IActionResult SignUp()
		{
			return View();
		}
		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public IActionResult SignUp([FromBody] UserSignUp signUpModel)
		{
			return Ok();
		}
		public IActionResult Index()
		{
			return View();
		}
		public async Task<IActionResult> Login()
		{
			return BadRequest();
		}
		[HttpGet]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> GetCurrentUser()
		{
			ClaimsPrincipal userClaims = HttpContext.User;
			ApplicationUser applicationUser = await _userManager.GetUserAsync(userClaims);
			if (applicationUser != null)
			{
				return Json(new { success = true, responseText = applicationUser });
			}
			return Json(new { success = false });

		}
		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		[Route("/api/User/CreateUserAsync")]
		public async Task<IActionResult> CreateUserAsync([FromBody] UserSignUp signUpModel)
		{
			IdentityResult result = null;
			try
			{
				ApplicationUser user = new ApplicationUser
				{
					UserName = signUpModel.EmailAddress,
					Email = signUpModel.EmailAddress,
				};
				result = await _userManager.CreateAsync(user, signUpModel.Password);

				if (result.Succeeded)
				{
					IdentityUser newUser = await _userManager.FindByEmailAsync(signUpModel.EmailAddress);
					return Json(new { success = true });
				}
			}
			catch (Exception ex)
			{
				string exception = ex.ToString();
			}
			return Json(new { success = false, responseText = result.Errors.FirstOrDefault().Description });
		}
		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> LoginAsync(string username, string password)
		{
			//await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

			// Sign user in with the valid credentials
			ApplicationUser user = new ApplicationUser();

			var result = await _signInManager.PasswordSignInAsync(
				username, password,
				isPersistent: false, lockoutOnFailure: false);

			if (result.Succeeded)
			{
				return Json(new { success = true });
			}
			if (result.RequiresTwoFactor)
			{
				return Json(new { success = false, responseText = "Requires Two Factor Authentication" });

			}
			if (result.IsNotAllowed)
			{
				return Json(new { success = false, responseText = "Not allowed" });
			}
			if (result.IsLockedOut)
			{
				return Json(new { success = false, responseText = "Account is locked out" });
			}
			else
			{
				return Json(new { success = false, responseText = "Invalid again attempt" });
			}
		}
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> SignOutAsync()
		{
			await _signInManager.SignOutAsync();
			return Json(new { success = true });
		}
		[HttpPost]
		[Authorize]
		[ValidateAntiForgeryToken]
		public async Task AuthorizeCurrentUser()
		{
			var user = HttpContext.User;
			var userAgain = await _userManager.GetUserAsync(user);
		}

	}
}