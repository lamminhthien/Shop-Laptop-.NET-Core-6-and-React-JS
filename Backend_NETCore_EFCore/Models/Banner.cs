using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopLaptop_EFCore.Models
{
  [Table("Banner")]
    public partial class Banner
    {
    public Banner( string fileAnh, string noiDung)
    {
      FileAnh = fileAnh;
      NoiDung = noiDung;
    }

    [Key]
        [Column("ma_banner")]
        public int MaBanner { get; set; }
        [Column("file_anh")]
        [StringLength(50)]
        public string FileAnh { get; set; } = null!;
        [Column("noi_dung")]
        [StringLength(255)]
        public string NoiDung { get; set; } = null!;
    }
}
