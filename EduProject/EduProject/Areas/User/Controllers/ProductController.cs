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
        Cart cart = new Cart();
      
        // GET: /User/Product/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Single(int id)
        {
            var singlePro = (shopEntity.Product.Where(c => c.Id == id).ToList())[0];
            return View(singlePro);
        }



        [HttpPost]
        public ActionResult AddCart(int id,int count)
        {
            var addPro = shopEntity.Product.Where(c => c.Id == id).ToList();
            HttpCookie cookie = Request.Cookies["myCookie"];
            if (cookie == null)
            {
                //如果用户未登录则使用GUID对该用户进行表示
                cart.RecordId = Convert.ToInt32(Guid.NewGuid());
                cookie.Values.Add("name", Guid.NewGuid().ToString());
            }
            else
            {
                cart.RecordId = Convert.ToInt32(cookie["UserId"]);
            }
            cart.Count = count;
            
            return View();
        }

      

       

	}
}