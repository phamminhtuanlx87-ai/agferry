-- 1. Bảng danh mục Giai đoạn
CREATE TABLE DanhMucGiaiDoan (
    id INT IDENTITY(1,1),
    ma_hieu_giai_doan VARCHAR(10) PRIMARY KEY,
    ten_giai_doan NVARCHAR(255) NOT NULL
);

-- 2. Bảng danh mục Đơn vị
CREATE TABLE DanhMucDonVi (
    id INT IDENTITY(1,1),
    ma_hieu_don_vi VARCHAR(10) PRIMARY KEY, 
    ten_don_vi NVARCHAR(255) NOT NULL,
    loai_don_vi NVARCHAR(50)
);

-- 3. Bảng Thông tin chung (Đã thêm dấu phẩy thiếu)
CREATE TABLE CongTrinh (
    id INT PRIMARY KEY IDENTITY(1,1),
    ten_cong_trinh NVARCHAR(255) NOT NULL,
    ngay_tao DATE,
    don_vi_chu_quan NVARCHAR(255),
    ma_hieu_giai_doan VARCHAR(10), -- Đã thêm dấu phẩy ở đây
    CONSTRAINT FK_GiaiDoanChung FOREIGN KEY (ma_hieu_giai_doan) 
        REFERENCES DanhMucGiaiDoan(ma_hieu_giai_doan)
);

-- 4. Bảng Chi tiết các Giai đoạn
CREATE TABLE ChiTietCongTrinh (
    id INT PRIMARY KEY IDENTITY(1,1),
    cong_trinh_id INT,
    ma_hieu_giai_doan VARCHAR(10), 
    ma_hieu_don_vi VARCHAR(10),
    ngay_thuc_hien DATE,
    tong_gia_tri DECIMAL(18, 0) DEFAULT 0,
    chi_phi_xay_dung DECIMAL(18, 0) DEFAULT 0,
    so_ngay_tc_pgv INT,
    ngay_hoan_thanh DATE,
    so_ngay_tc_thuc_te INT,
    link_file NVARCHAR(500),

    CONSTRAINT FK_CongTrinh FOREIGN KEY (cong_trinh_id) 
        REFERENCES CongTrinh(id) ON DELETE CASCADE,
    
    CONSTRAINT FK_GiaiDoan FOREIGN KEY (ma_hieu_giai_doan) 
        REFERENCES DanhMucGiaiDoan(ma_hieu_giai_doan),
        
    CONSTRAINT FK_DonViChiTiet FOREIGN KEY (ma_hieu_don_vi) 
        REFERENCES DanhMucDonVi(ma_hieu_don_vi)
);

-- INSERT DỮ LIỆU DANH MỤC
INSERT INTO DanhMucGiaiDoan (ten_giai_doan, ma_hieu_giai_doan) VALUES 
(N'Dự toán','DT'), 
(N'Thẩm tra Dự toán','TTR_DT'),
(N'Phê duyệt Dự toán','PD_DT'), 
(N'Đang thi công','TC'), 
(N'Nghiệm thu hoàn thành','NT'), 
(N'Dự toán Phát sinh','DT_PS'), 
(N'Thẩm tra DT Phát sinh','TTR_DT_PS'), 
(N'Phê duyệt DT Phát sinh','PD_DT_PS'), 
(N'Quyết toán','QT');

INSERT INTO DanhMucDonVi (ten_don_vi, loai_don_vi, ma_hieu_don_vi) VALUES 
(N'P. Kỹ thuật - Vật tư', N'Nội bộ','PKT'),
(N'Phòng Đầu tư', N'Nội bộ','PDT'),
(N'Cty CP TVXD GT KTC', N'Tư vấn','KTC'),
(N'Cty TNHH TK Soài Rạp', N'Tư vấn','SR'),
(N'Cty TNHH TVXD Tây Nam Bộ', N'Thẩm tra','TNB'),
(N'Cty TNHH TV TKXD Trường Phú', N'Thẩm tra','TP');

