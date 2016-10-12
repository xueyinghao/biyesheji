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
        BShopEntities shopEntity = new BShopEntities();
        public bool RegistData(Register userModel)
        {
            bool flag = false;
            var user = new User()
            {
                UName = userModel.UName,
                Password = userModel.Password,
                Address = userModel.Address,
                Age = userModel.Age,
                Phone = userModel.Phone,
                Email = userModel.Email
            };
            shopEntity.User.Add(user);
            int i=shopEntity.SaveChanges();
            if (i==1)
            {
                flag = true;
            }
            return flag;
        }


       

    }
}