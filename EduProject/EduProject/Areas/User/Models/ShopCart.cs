using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduProject.Areas.User.Models
{
    public class ShopCart
    {
        public string PNane { get; set; }
        public decimal Price { get; set; }
        //毫升数
        public string mlNum { get; set; }
        //商品数量
        public int Num { get; set; }
        //商品图片
        public string pic { get; set; }
    }
}