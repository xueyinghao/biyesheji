using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EduProject.Areas.User.Models;
using EduProject.Database;
using Newtonsoft.Json;
using System.Text;
using log4net;

namespace EduProject.Areas.User.Controllers
{
    public class ProductController : Controller
    {
        private ILog log ;
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
            ViewBag.Id=id;
            return View(singlePro);
        }


        public ActionResult MyCart()
        {
            StringBuilder sb = new StringBuilder();
            var cart = ShopCart.GetCart(this.HttpContext);
            List<Cart> allList = cart.GetCartItems();
            ViewBag.ModelData = allList;
            ViewBag.TotalCount = cart.GetCount();
            ViewBag.TotalPrice = cart.getTotal();
            return View();
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
            StringBuilder sb = new StringBuilder();
            var carts = ShopCart.GetCart(this.HttpContext);
            int totalCount = carts.GetCount();
            decimal totalPrice=carts.getTotal();
            List<Cart> list = carts.GetCartItems();
            sb.Append("<div class=\"ibar_plugin_content\"><div class=\"ibar_cart_group ibar_cart_product\" style=\"width:292px;\"><div class=\"ibar_cart_group_header\"><span class=\"ibar_cart_group_title\">商品信息</span><a href=\"\">我的购物车</a></div>");
            if (list.Count == 0)
            {
                sb.AppendLine("<div class=\"cart_item\"></div>");
            }
            else
            {
                foreach (var item in list)
                {
                    sb.AppendLine("<div class=\"cart_item\"><div class=\"cart_item_pic\"><a href=\"/User/Product/Single?id=" + item.ProductId + "\"><img src=\"" + item.image + "\"/></a></div><div class=\"cart_item_desc\"><a href=\"/User/Product/Single?id=" + item.ProductId + "\" class=\"cart_item_name\">" + item.PName + "</a><div class=\"cart_item_sku\"><span>型号:" + item.mlNum + "</span></div><div class=\"cart_item_price\"><span class=\"cart_price\">￥" + item.Price + "×" + item.Count + "</span></div></div></div>");
                }
            }
            sb.Append("</div><div class=\"cart_handler\"><div class=\"cart_handler_header\"><span class=\"cart_handler_left\">共<span class=\"cart_price\">" + totalCount + "</span>件商品</span><span class=\"cart_handler_right\">￥" + totalPrice + "</span></div><a href=\"/User/Product/MyCart\" class=\"cart_go_btn\">去购物车结算</a></div></div>");
            return sb.ToString();
        }
        [HttpPost]
        public string ChangeNum(int id, int count)
        {
            string json = "";
            var carts = ShopCart.GetCart(this.HttpContext);
            bool res = carts.ChangeNum(id, count);
            if (res == true)
            {
                json = "true";
            }
            else
            {
                json = "false";
            }
            return json;
        }
        [HttpPost]
        public string DeleteProduct(int id)
        {
            var cart = ShopCart.GetCart(this.HttpContext);
            bool result = cart.DeleteProduct(id);
            return result.ToString();
        }
        

	}
}