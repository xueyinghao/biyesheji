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
    
    public partial class Cart
    {
        public int RecordId { get; set; }
        public string CartId { get; set; }
        public int Count { get; set; }
        public System.DateTime DateCreated { get; set; }
        public string PName { get; set; }
        public int ProductId { get; set; }
    
        public virtual User User { get; set; }
    }
}
