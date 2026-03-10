using System;
using System.Collections.Generic;

namespace agferry.api.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = null!;

    public string? Email { get; set; }

    public string FullName { get; set; } = null!;

    public string? PasswordHash { get; set; }

    public string? GoogleId { get; set; }

    public int DepartmentId { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Department Department { get; set; } = null!;
}
