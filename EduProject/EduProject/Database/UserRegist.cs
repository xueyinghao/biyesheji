using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using EduProject.Areas.User.Models;

namespace EduProject.Database
{
    public class UserRegist
    {
        BeautyShopEntities shopEntity = new BeautyShopEntities();
        public  bool RegistData(Register userModel)
        {
            bool flag = false;
            var user = new UserInfo()
            {
                UserName = userModel.UserName,
                PassWord = userModel.PassWord,
                Sex = userModel.Sex,
                Age = userModel.Age,
                Phone = userModel.Phone,
                Email = userModel.Email
            };
            shopEntity.UserInfo.Add(user);
            int i=shopEntity.SaveChanges();
            if (i==1)
            {
                flag = true;
            }
            return flag;
        }
    }
}