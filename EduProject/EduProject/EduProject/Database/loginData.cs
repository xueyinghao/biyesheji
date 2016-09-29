using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using EduProject.Areas.User.Models;

namespace EduProject.Database
{
    public class loginData
    {
        BeautyShopEntities shopEntity = new BeautyShopEntities();
        //登录获取用户个人信息
        public UserInfo getLoginData(string email, string password)
        {
            var data = shopEntity.UserInfo.Where(c => c.Email == email && c.PassWord == password).FirstOrDefault();
            return data;
        }
    }
}