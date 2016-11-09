using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EduProject.Areas.User.Models;
using EduProject.Database;
using Newtonsoft.Json;

namespace EduProject.Areas.User.Controllers
{
    public class ProductController : Controller
    {
        BShopEntities shopEntity = new BShopEntities();
        //public const string CartSessionKey = "CartId";
        //Cart cart = new Cart();
      
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


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">加入购物车的商品ID</param>
        /// <param name="count">加入购物车的商品数量</param>
        /// 用户未登录RecordId字段存储为用户分配唯一的GUID，用户已经登录则存UserId
        /// 在后期测试一下在将GUID加入到Cookie之后在进行用户登录时是不是把Cookie重新生成了(记得测试一下)
        /// <returns></returns>
        [HttpPost]
        public void AddCart(int id,int count,string name)
        {
            var addedProduct = shopEntity.Product.Single(Product => Product.Id == id && Product.PName == name);
            var cart = ShopCart.GetCart(this.HttpContext);
            cart.AddToCart(addedProduct,count);
            #region   注释内容
            //HttpCookie cookie = Request.Cookies["myCookie"];
            //if (cookie == null)        
            //{
            //    //如果用户未登录则使用GUID对该用户进行表示
            //    cart.RecordId =Guid.NewGuid().ToString();
            //    //用户标记
            //    Session["UserMark"] = Guid.NewGuid().ToString();
            //    cookie.Values.Add("sessionId", Session.SessionID.ToString());
            //}
            //else
            //{
            //    cart.RecordId = cookie["UserId"];
            //}
            //cart.Count = count;
            //cart.ProductId = id;
            //cart.PName = Pname;
            //cart.DateCreated = DateTime.Now;
            //shopEntity.Cart.Add(cart);
            //shopEntity.SaveChanges();
            //return cart.CartId;
            //return View();
            #endregion
        }

        [HttpPost]
        public string getFromCart()
       {
            var carts = ShopCart.GetCart(this.HttpContext);
            decimal totalPrice=carts.getTotal();
            string json = JsonConvert.SerializeObject(carts.GetCartItems());
            string s= "{TotalPrice:" + totalPrice + ",rows:" + json + "}";
            return s;
        }

      

       

	}
}