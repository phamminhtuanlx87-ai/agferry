using System;
using System.Collections.Generic;

namespace agferry.api.Models;

public partial class Department
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
