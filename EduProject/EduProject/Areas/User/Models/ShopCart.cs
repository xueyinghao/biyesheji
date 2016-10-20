using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EduProject.Areas.User.Models
{
    public  class ShopCart
    {
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

        public void AddToCart(Product product)
        {
            var cartItem = shopEntity.Cart.SingleOrDefault(c=>c.CartId==ShoppingCartId && c.ProductId==product.Id);
            if (cartItem == null)
            {
                cartItem = new Cart
                {
                    ProductId = product.Id,
                    CartId = ShoppingCartId,
                    Count = 1,
                    DateCreated = DateTime.Now
                };
                shopEntity.Cart.Add(cartItem);
            }
            else
            {
                cartItem.Count++;
            }
            shopEntity.SaveChanges();

        }

        public int RemoveFromCart(int id)
        {
            var cartItem = shopEntity.Cart.Single(c => c.CartId == ShoppingCartId && c.RecordId == id);
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
            var cartItems = shopEntity.Cart.Where(c => c.CartId == ShoppingCartId);
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
                          where cartItems.CartId == ShoppingCartId
                          select (int?)cartItems.Count).Sum();
            return count ?? 0;
        }

        //public decimal getTotal()
        //{
        //    decimal? total=(from cartItems in shopEntity.Cart
        //                        where cartItems.CartId==ShoppingCartId
        //                        select (int?)cartItems.Count*cartItems.)
        //}

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




    }
}