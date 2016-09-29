using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduProject.Areas.User.Models
{
    public class UserInfo
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string UserType { get; set; }
        public string Tell { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}