using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduProject.Areas.User.Models
{
    public class Register
    {
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string ConfirmPassWord { get; set; }
        public string Sex { get; set; }
        public string Age { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}