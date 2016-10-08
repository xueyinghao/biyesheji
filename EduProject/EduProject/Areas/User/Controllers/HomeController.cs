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
        public ActionResult Register(FormCollection form)
        {
            string UserName = HttpUtility.HtmlEncode(form["UserName"]);
            string PassWord = HttpUtility.HtmlEncode(form["PassWord"]);
            string Email = HttpUtility.HtmlEncode(form["Email"]);
            string Phone = HttpUtility.HtmlEncode(form["Phone"]);
            string Age = HttpUtility.HtmlEncode(form["Age"]);
            string sex = HttpUtility.HtmlEncode(form["Sex"]);


        }
	}
}