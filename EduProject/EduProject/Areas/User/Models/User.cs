using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduProject.Areas.User.Models
{
    public class user
    {
        //public int Id { get; set; }
        //public string UserName { get; set; }
        //public string PassWord { get; set; }
        //public string UserType { get; set; }
        //public string Phone { get; set; }
        //public string Email { get; set; }
        //public string Address { get; set; }
        //public string Age { get; set; }
        //public string Sex { get; set; }
        public int Id { get; set; }
        public string UName { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string UType { get; set; }
        public string Age { get; set; }
        public string Sex { get; set; }
    }
}