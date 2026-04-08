using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace agferry.api.Models;

public partial class AgferryDatabaseContext : DbContext
{
    public AgferryDatabaseContext()
    {
    }

    public AgferryDatabaseContext(DbContextOptions<AgferryDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ChiTietCongTrinh> ChiTietCongTrinhs { get; set; }

    public virtual DbSet<CongTrinh> CongTrinhs { get; set; }

    public virtual DbSet<DanhMucDonVi> DanhMucDonVis { get; set; }

    public virtual DbSet<DanhMucGiaiDoan> DanhMucGiaiDoans { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; Initial Catalog=AGFerryDatabase;User ID=sa; Password = 123456; Integrated Security = True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChiTietCongTrinh>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ChiTietC__3213E83F5D2E1B30");

            entity.ToTable("ChiTietCongTrinh");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ChiPhiXayDung)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("chi_phi_xay_dung");
            entity.Property(e => e.CongTrinhId).HasColumnName("cong_trinh_id");
            entity.Property(e => e.LinkFile)
                .HasMaxLength(500)
                .HasColumnName("link_file");
            entity.Property(e => e.MaHieuDonVi)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ma_hieu_don_vi");
            entity.Property(e => e.MaHieuGiaiDoan)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ma_hieu_giai_doan");
            entity.Property(e => e.NgayHoanThanh).HasColumnName("ngay_hoan_thanh");
            entity.Property(e => e.NgayThucHien).HasColumnName("ngay_thuc_hien");
            entity.Property(e => e.SoNgayTcPgv).HasColumnName("so_ngay_tc_pgv");
            entity.Property(e => e.SoNgayTcThucTe).HasColumnName("so_ngay_tc_thuc_te");
            entity.Property(e => e.TongGiaTri)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("tong_gia_tri");

            entity.HasOne(d => d.CongTrinh).WithMany(p => p.ChiTietCongTrinhs)
                .HasForeignKey(d => d.CongTrinhId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_CongTrinh");

            entity.HasOne(d => d.MaHieuDonViNavigation).WithMany(p => p.ChiTietCongTrinhs)
                .HasForeignKey(d => d.MaHieuDonVi)
                .HasConstraintName("FK_DonViChiTiet");

            entity.HasOne(d => d.MaHieuGiaiDoanNavigation).WithMany(p => p.ChiTietCongTrinhs)
                .HasForeignKey(d => d.MaHieuGiaiDoan)
                .HasConstraintName("FK_GiaiDoan");
        });

        modelBuilder.Entity<CongTrinh>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CongTrin__3213E83FD3493FDF");

            entity.ToTable("CongTrinh");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DonViChuQuan)
                .HasMaxLength(255)
                .HasColumnName("don_vi_chu_quan");
            entity.Property(e => e.MaHieuGiaiDoan)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ma_hieu_giai_doan");
            entity.Property(e => e.NgayTao).HasColumnName("ngay_tao");
            entity.Property(e => e.TenCongTrinh)
                .HasMaxLength(255)
                .HasColumnName("ten_cong_trinh");

            entity.HasOne(d => d.MaHieuGiaiDoanNavigation).WithMany(p => p.CongTrinhs)
                .HasForeignKey(d => d.MaHieuGiaiDoan)
                .HasConstraintName("FK_GiaiDoanChung");
        });

        modelBuilder.Entity<DanhMucDonVi>(entity =>
        {
            entity.HasKey(e => e.MaHieuDonVi).HasName("PK__DanhMucD__E1A859EE85776702");

            entity.ToTable("DanhMucDonVi");

            entity.Property(e => e.MaHieuDonVi)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ma_hieu_don_vi");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.LoaiDonVi)
                .HasMaxLength(50)
                .HasColumnName("loai_don_vi");
            entity.Property(e => e.TenDonVi)
                .HasMaxLength(255)
                .HasColumnName("ten_don_vi");
        });

        modelBuilder.Entity<DanhMucGiaiDoan>(entity =>
        {
            entity.HasKey(e => e.MaHieuGiaiDoan).HasName("PK__DanhMucG__F6F58BD96FD4C074");

            entity.ToTable("DanhMucGiaiDoan");

            entity.Property(e => e.MaHieuGiaiDoan)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ma_hieu_giai_doan");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.TenGiaiDoan)
                .HasMaxLength(255)
                .HasColumnName("ten_giai_doan");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Departme__3214EC074C35A953");

            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Name).HasMaxLength(150);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07DC8A4379");

            entity.HasIndex(e => e.Email, "IX_Users_Email");

            entity.HasIndex(e => e.UserName, "IX_Users_UserName");

            entity.HasIndex(e => e.Email, "UQ_Users_Email").IsUnique();

            entity.HasIndex(e => e.UserName, "UQ_Users_UserName").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.DepartmentId).HasDefaultValue(1);
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.FullName).HasMaxLength(150);
            entity.Property(e => e.GoogleId).HasMaxLength(200);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.PasswordHash).HasMaxLength(500);
            entity.Property(e => e.UserName).HasMaxLength(50);

            entity.HasOne(d => d.Department).WithMany(p => p.Users)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_Departments");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
