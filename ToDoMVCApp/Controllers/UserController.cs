using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ToDoMVCApp.Service.Interfaces;

namespace ToDoMVCApp.Controllers
{	[Route("/api/User/")]
    public class UserController : Controller
    {
		private readonly IUserService userService;
		public UserController(IUserService userService)
		{
			this.userService = userService;
		}
        public IActionResult Index()
        {
            return View();
        }
		public async Task<IActionResult> Login()
		{
			return BadRequest();
		}
    }
}