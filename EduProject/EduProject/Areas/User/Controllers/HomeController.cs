using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EduProject.Database;
using EduProject.Areas.User.Models;
using log4net;
using System.Data;


namespace EduProject.Areas.User.Controllers
{
    public class HomeController : Controller
    {
        //测试日志组件
        private ILog log = LogManager.GetLogger("MoonTest");
        BShopEntities shopEntity = new BShopEntities();
        public HttpCookie cookie = new HttpCookie("myCookie");

        //美妆商城首页
        // GET: /User/index/
        public ActionResult Index()    
        {            
            var product = GetTopSellingProduct(3);
            ViewBag.proMsg = product;
            return View();
        }

        public List<Product> GetTopSellingProduct(int count)
        {
            return shopEntity.Product.OrderByDescending(c => c.Id).Take(count).ToList();
        }


        

        [HttpPost]
        public int GetProCount()
        {
            var cart = ShopCart.GetCart(this.HttpContext);
            return cart.GetCount();
        }

	}
}