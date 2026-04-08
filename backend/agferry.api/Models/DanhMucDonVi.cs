using System;
using System.Collections.Generic;

namespace agferry.api.Models;

public partial class DanhMucDonVi
{
    public int Id { get; set; }

    public string MaHieuDonVi { get; set; } = null!;

    public string TenDonVi { get; set; } = null!;

    public string? LoaiDonVi { get; set; }

    public virtual ICollection<ChiTietCongTrinh> ChiTietCongTrinhs { get; set; } = new List<ChiTietCongTrinh>();
}
