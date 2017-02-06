using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using EduProject.Areas.User.Models;
using System.Data.Entity.Validation;

namespace EduProject.Database
{
    public class UserRegist
    {
        BShopEntities shopEntity = new BShopEntities();
        public bool RegistData(Register userModel)
        {
            
            bool flag = false;
            //判断注册的用户是否已经注册过
            string name = userModel.UName;
            string pwd = userModel.Password;
            User RegUser=shopEntity.User.Where(c => c.UName == name & c.Password == pwd).FirstOrDefault();
            if (RegUser != null)
            {
                flag = false;
            }
            else
            {
                var user = new User()
                {
                    UName = userModel.UName,
                    Password = userModel.Password,
                    Address = "河南省郑州市",
                    Age = userModel.Age,
                    Phone = userModel.Phone,
                    Email = userModel.Email,
                    UType="02"
                    
                };
                try
                {
                    shopEntity.User.Add(user);
                    int i = shopEntity.SaveChanges();
                    if (i == 1)
                    {
                        flag = true;
                    }
                }
                catch (DbEntityValidationException dbEx)
                {
                    flag = false;
                }
               
            }
            return flag;
        }


       

    }
}