using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduProject.Areas.User.Models
{
    public class Carts
    {
        public int RecordId { get; set; }
        public string CartId { get; set; }
        public int Count { get; set; }
        public DateTime DateCreated { get; set; }
        public string PName { get; set; }
        public int ProductId { get; set; }
    }
}