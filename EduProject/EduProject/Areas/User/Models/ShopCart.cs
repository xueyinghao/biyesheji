using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using log4net;

namespace EduProject.Areas.User.Models
{
    public class ShopCart
    {
        /// <summary>
        /// Cart表中CartId为购物车ID,未登录使用GUID，登录使用用户名
        /// ProductId为商品ID
        /// </summary>
       
        BShopEntities shopEntity = new BShopEntities();
        string ShoppingCartId { get; set; }
        public const string CartSessionKey = "CartId";

        //对于未登陆的用户，需要为他们创建一个临时的唯一标识，使用GUID



        public static ShopCart GetCart(HttpContextBase context)
        {
            var cart = new ShopCart();
            cart.ShoppingCartId = cart.GetCartId(context);
            return cart;
        }
        public static ShopCart GetCart(Controller controller)
        {
            return GetCart(controller.HttpContext);
        }

        //购物车添加商品
        public void AddToCart(Product addPro,int count)
        {
            var cartItem = shopEntity.Cart.SingleOrDefault(c => c.ProductId ==addPro.Id && c.CartId==ShoppingCartId);
            if (cartItem == null)
            {
                cartItem = new Cart
                {
                   CartId=ShoppingCartId,
                   Count=count,
                   ProductId=addPro.Id,
                   PName=addPro.PName,
                   DateCreated = DateTime.Now,
                   Price=addPro.Price,
                   image=addPro.pic,
                   mlNum=addPro.mlNum
                };
                shopEntity.Cart.Add(cartItem);
            }
            else
            {
                cartItem.Count+=count;
            }
            shopEntity.SaveChanges();

        }

        //将商品从购物车删除，同时返回当前商品剩余数量
        public int RemoveFromCart(int id)
        {
            var cartItem = shopEntity.Cart.SingleOrDefault(c=>c.ProductId==id&&c.CartId==ShoppingCartId);
            int itemCount = 0;
            if (cartItem != null)
            {
                if (cartItem.Count > 1)
                {
                    cartItem.Count--;
                    itemCount = cartItem.Count;
                }
                else
                {
                    shopEntity.Cart.Remove(cartItem);
                }
                shopEntity.SaveChanges();
            }
            return itemCount;
        }

        public void EmptyCart()
        {
            var cartItems = shopEntity.Cart.Where(c => c.CartId==ShoppingCartId);
            foreach (var cartItem in cartItems)
            {
                shopEntity.Cart.Remove(cartItem);
            }
            shopEntity.SaveChanges();
        }

        public List<Cart> GetCartItems()
        {
            return shopEntity.Cart.Where(c => c.CartId == ShoppingCartId).ToList();
        }

        public int GetCount()
        {
            int? count = (from cartItems in shopEntity.Cart
                          where cartItems.CartId == ShoppingCartId//"df73abfb-6938-4c89-a03e-5e5209490f44"
                          select (int?)cartItems.Count).Sum();
            return count ?? 0;
        }

        public decimal getTotal()
        {
            decimal? total = (from cartItems in shopEntity.Cart
                              where cartItems.CartId == ShoppingCartId
                              select (int?)cartItems.Count * cartItems.Price).Sum();
            return total??decimal.Zero;
        }

        public string GetCartId(HttpContextBase context)
        {
            if (context.Session[CartSessionKey] == null)
            {
                if (!string.IsNullOrWhiteSpace(context.User.Identity.Name))
                {
                    context.Session[CartSessionKey] = context.User.Identity.Name;
                }
                else
                {
                    Guid tempCartId = Guid.NewGuid();
                    context.Session[CartSessionKey] = tempCartId.ToString();
                }
            }
            return context.Session[CartSessionKey].ToString();
        }


        //用户登录时将购物车与他们的用户名进行关联
        public void MigrateCart(string username)
        {
            var shoppingcart = shopEntity.Cart.Where(c => c.CartId == ShoppingCartId);
            foreach (Cart item in shoppingcart)
            {
                item.CartId = username;
            }
            shopEntity.SaveChanges();
        }

        public bool ChangeNum(int id, int num)
        {
            bool flag = false;
            try
            {
                var shoppingcart = shopEntity.Cart.Where(c => c.ProductId == id && c.CartId == ShoppingCartId).SingleOrDefault();
                if (shoppingcart != null)
                {
                    shoppingcart.Count = num;
                }
                shopEntity.SaveChanges();
                flag=true;
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(ex.ToString());
                flag = false;
            }
            return flag;
        }



    }
}   