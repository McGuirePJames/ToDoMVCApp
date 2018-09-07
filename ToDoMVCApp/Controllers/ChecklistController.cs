using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ToDoMVCApp.Controllers
{
    public class ChecklistController : Controller
    {
		[Route("/Checklist")]
        public IActionResult Checklist()
        {
            return View();
        }
    }
}