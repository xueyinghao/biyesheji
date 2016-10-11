using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EduProject.Database;
using EduProject.Areas.User.Models;
using log4net;
 

namespace EduProject.Areas.User.Controllers
{
    public class HomeController : Controller
    {
        //测试日志组件
        private ILog log = LogManager.GetLogger("MoonTest");
        

        //美妆商城首页
        // GET: /User/index/
        public ActionResult Index()
        {
            return View();
        }
        
        //登录
        public ActionResult login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult login(FormCollection form)
        {
            string email =HttpUtility.HtmlEncode(form["email"]);
            string pwd = HttpUtility.HtmlEncode(form["passWord"]);
            loginData dt = new loginData();
            UserInfo user = dt.getLoginData(email, pwd);
            if (user == null)
            {
                string script = String.Format("<script>alert('用户名密码错误！');</script>");
                return Content(script);
            }
            ViewBag.name = user.UserName;
            log.Info(user.UserName);
            return View("indexIn");
        }

        //退出系统
        public ActionResult LogOut()
        {
            return RedirectToAction("Index");
        }

        //用户注册
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(Register UserModel)
        {
            if (string.IsNullOrEmpty(UserModel.UserName))
            {
                ModelState.AddModelError("UserName", "用户名不能为空");
            }
            
            if(string.IsNullOrEmpty(UserModel.PassWord))
            {
                ModelState.AddModelError("PassWord", "密码不能为空");
            }
            else if (UserModel.PassWord.Length < 6)
            {
                ModelState.AddModelError("PassWord", "密码长度不能少于6位");
            }

            if (string.IsNullOrEmpty(UserModel.Phone))
            {
                ModelState.AddModelError("Phone", "手机号码不能为空");
            }
            else if (UserModel.Phone.Length < 11)
            {
                ModelState.AddModelError("Phone", "手机号码格式不正确");
            }
          
            if(ModelState.IsValid)
            {
                UserRegist user = new UserRegist();
                bool res=user.RegistData(UserModel);
                if (res == true)
                {
                    ViewBag.message = "注册成功";
                    return RedirectToAction("Login");
                }
                else
                {

                    return RedirectToAction("Register");
                }
            }
            return View("Register");

        }
	}
}