using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduProject.Database
{
    public static class CookIeUser
    {
        public static HttpCookie cookie = new HttpCookie("myCookie");
        public static string UserName(string Url = "/")
        {
            return cookie["name"].ToString();
        }
        public static string UserId(string Url = "/")
        {
            return cookie["UserId"].ToString();
        }
        public static string SessionId(string Url = "/")
        {
            return cookie["sessionId"].ToString();
        }
    }
}