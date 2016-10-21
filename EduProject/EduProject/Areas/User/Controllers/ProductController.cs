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
        BShopEntities shopEntity = new BShopEntities();
      
        // GET: /User/Product/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Single()
        {
            return View();
        }


       
        [HttpPost]
        public ActionResult AddCart(string pic, string name, decimal price)
        {
            var cart = ShopCart.GetCart(this.HttpContext);

            return View();
        }

      

       

	}
}