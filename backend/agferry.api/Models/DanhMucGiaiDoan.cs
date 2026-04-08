using System;
using System.Collections.Generic;

namespace agferry.api.Models;

public partial class DanhMucGiaiDoan
{
    public int Id { get; set; }

    public string MaHieuGiaiDoan { get; set; } = null!;

    public string TenGiaiDoan { get; set; } = null!;

    public virtual ICollection<ChiTietCongTrinh> ChiTietCongTrinhs { get; set; } = new List<ChiTietCongTrinh>();

    public virtual ICollection<CongTrinh> CongTrinhs { get; set; } = new List<CongTrinh>();
}
