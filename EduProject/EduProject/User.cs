//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace EduProject
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public User()
        {
            this.Order = new HashSet<Order>();
        }
    
        public int Id { get; set; }
        public string UName { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string UType { get; set; }
        public string Age { get; set; }
        public string Sex { get; set; }
        public string Image { get; set; }
    
        public virtual ICollection<Order> Order { get; set; }
    }
}
