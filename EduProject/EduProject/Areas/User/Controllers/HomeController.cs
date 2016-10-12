using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EduProject.Database;
using EduProject.Areas.User.Models;
using log4net;
using System.Data;


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
            //读取Cookie
            if (Request.Cookies["myCookie"] != null)
            {

            }

            string email =HttpUtility.HtmlEncode(form["email"]);
            string pwd = HttpUtility.HtmlEncode(form["passWord"]);
            loginData logData = new loginData();
            var userData = logData.getLoginData(email, pwd);
            if (userData.Count() <=0)
            {
                string script = string.Format("<script>alert('用户名和密码不一致！');location.href='{0}'</script>", Url.Action("Login", "Home", "User"));
                return Content(script, "text/html");
            }
            else if (userData.Count() > 1)
            {
                string script = string.Format("<script>alert('账户信息出错,有重复信息出现！');location.href='{0}'</script>", Url.Action("Login", "Home", "User"));
                return Content(script, "text/html");
            }
            else
            {
                //添加Cookie
                HttpCookie cookie = new HttpCookie("myCookie");
                DateTime dt = DateTime.Now;
                TimeSpan ts = new TimeSpan(0, 0, 1, 0, 0);//过期时间为1分钟
                cookie.Expires = dt.Add(ts);//设置过期时间
                cookie.Values.Add("email", email);
                cookie.Values.Add("pwd", pwd);
                Response.AppendCookie(cookie);
                ViewBag.Name = userData.First().UName;
            }
            return View("IndexIn");
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
            if (string.IsNullOrEmpty(UserModel.UName))
            {
                ModelState.AddModelError("UserName", "用户名不能为空");
            }
            
            if(string.IsNullOrEmpty(UserModel.Password))
            {
                ModelState.AddModelError("PassWord", "密码不能为空");
            }
            else if (UserModel.Password.Length < 6)
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
                bool res = user.RegistData(UserModel);
                if (res == true)
                {
                    string script = string.Format("<script>alert('注册成功！');location.href='{0}'</script>", Url.Action("Login", "Home", "User"));
                    return Content(script, "text/html");
                }
                else
                {
                    string script = string.Format("<script>alert('注册失败！');location.href='{0}'</script>", Url.Action("Register", "Home", "User"));
                    return Content(script, "text/html");
                }
            }
            return View("Register");

        }
	}
}