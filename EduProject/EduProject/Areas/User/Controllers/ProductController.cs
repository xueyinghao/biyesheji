using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EduProject.Areas.User.Models;

namespace EduProject.Areas.User.Controllers
{
    public class ProductController : Controller
    {
        //
        // GET: /User/Product/
        public ActionResult Index()
        {
            return View();
        }
        //在ShopCart.js里面写ajax
        [HttpPost]
        public ActionResult AddCart(string pic,string name,decimal price)
        {
            
            return View();
        }
	}
}