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
        private ILog log = LogManager.GetLogger("MoonTest");
        //
        // GET: /User/index/
        public ActionResult Index()
        {
            return View();
        }
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
        public ActionResult LogOut()
        {
            return RedirectToAction("Index");
        }
        public ActionResult Register()
        {
            return View();
        }
	}
}