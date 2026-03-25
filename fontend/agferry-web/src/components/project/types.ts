// Tên file: types.ts
export interface ProjectFormData {
    tenCongTrinh: string;
    donVi: string;
    ngayTao: string;
    
    // Nhóm Dự toán
    dt_ngay: string;
    dt_TongGiaTri: number;
    dt_TongCPXD: number;
    dt_DonVi: string;
    dt_link: string;
    
    // Nhóm Thẩm tra
    tt_ngay: string;
    tt_TongGiaTri: number;
    tt_TongCPXD: number;
    tt_DonVi: string;
    tt_link: string;

    // Nhóm Qđ phê duyệt DT
    pd_ngay: string;
    pd_TongGiaTri: number;
    pd_TongCPXD: number;
    pd_DonVi: string;
    pd_link: string;


    // Nhóm Thi công
    tc_ngayKhoiCong: string;
    tc_tongNgay: string;
    tc_ngayHoanThanh: string;
    
    // Nhóm Nghiệm thu
    nt_ngayNghiemThu: string;
    nt_link: string;

    // Nhóm Qđ phê duyệt DT điều chỉnh
    pddc_ngay: string;
    pddc_TongGiaTri: number;
    pddc_TongCPXD: number;
    pddc_DonVi: string;
    pddc_link: string;

   // Nhóm Quyết toán
    qt_ngay: string;
    qt_TongGiaTri: number;
    qt_TongCPXD: number;
    qt_DonVi: string;
    qt_link: string;
}