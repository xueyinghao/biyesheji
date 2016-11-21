using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using EduProject.Areas.User.Models;

namespace EduProject.Database
{
    public class ProductInfo
    {
        public BShopEntities shopEntity = new BShopEntities();

        //获取商品的最新的商品展示在页面
        public  List<Product> GetTopSellingProduct(int count)
        {
            return shopEntity.Product.OrderByDescending(c => c.Id).Take(count).ToList();
        }

    }
}