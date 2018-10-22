using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ToDoMVCApp.Web.Controllers
{
    public class CodeDemoController : Controller
    {
		[Route("/CodeDemo")]
        public IActionResult CodeDemo()
        {
            return View("~/Views/CodeDemo/CodeDemo.cshtml");
        }
    }
}