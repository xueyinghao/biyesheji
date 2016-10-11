using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EduProject.Areas.User.Models
{
    public class Register
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string PassWord { get; set; }
        
        
        public string ConfirmPassWord { get; set; }
        public string Sex { get; set; }
        public string Age { get; set; }

        [Required]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}")]
        public string Email { get; set; }

        [Required]
        //[RegularExpression(@"13\\d{9}|14[57]\\d{8}|15[012356789]\\d{8}|18[01256789]\\d{8}|17[0678]\\d{8}")]
        public string Phone { get; set; }
    }
}