using System;
using System.Collections.Generic;

namespace ContosoPizza.Models
{
    public partial class Coupon
    {
        public long Id { get; set; }
        public DateTime Description { get; set; }
        public string? Expiration { get; set; }
    }
}
