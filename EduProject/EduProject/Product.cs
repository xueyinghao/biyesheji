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
    
    public partial class Product
    {
        public Product()
        {
            this.UserOrderDetail = new HashSet<UserOrderDetail>();
        }
    
        public int Id { get; set; }
        public string PName { get; set; }
        public decimal Price { get; set; }
        public string Detail { get; set; }
        public int TypeId { get; set; }
    
        public virtual Type Type { get; set; }
        public virtual ICollection<UserOrderDetail> UserOrderDetail { get; set; }
    }
}
