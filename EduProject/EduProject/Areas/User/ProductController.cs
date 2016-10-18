using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EduProject.Areas.User
{
    public class ProductController : Controller
    {
        BShopEntities shopEntity = new BShopEntities();
        //
        // GET: /User/Product/
        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult Recommned()
        //{
        //    shopEntity.Product.Where(c=>c.TypeId=)
        //}


        //针对ajax的请求返回Json数据
        //[HttpPost]
        //public ActionResult ShopCart()
        //{
            
        //}
	}
}