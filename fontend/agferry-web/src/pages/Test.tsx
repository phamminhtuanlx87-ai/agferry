import { getProject } from "@/services/projectService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface ChiTiet {
  maHieuGiaiDoan: string;
  chiPhiXayDung: number;
  tongGiaTri: number;
  ngayHoanThanh: string;
}

interface ProjectDetail {
  tenCongTrinh: string;
  tenGiaiDoan: string;
  ngayTao: string;
  chiTietCongTrinhs: ChiTiet[]; // Khai báo mảng chứa các ChiTiet
}
const Test = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetail>();
  const navigate = useNavigate(); // 2. Khởi tạo navigate
  useEffect(() => {
    const fetchData = async () => {
      // Bước 1: Kiểm tra id trên URL có tồn tại và là số không
      const projectId = Number(id);
      if (!id || isNaN(projectId)) {
        console.warn("ID không hợp lệ, chuyển trang...");
        navigate("/projects"); // Chuyển hướng nếu ID bậy (ví dụ: /test/abc)
        return;
      }

      try {
        const res = await getProject(projectId);
        console.log(res);
        // Bước 2: Kiểm tra dữ liệu trả về từ API
        // Giả sử API trả về null hoặc object rỗng khi không tìm thấy
        if (
          !res ||
          (res.data && !res.data.tenCongTrinh && !res.data.chiTietCongTrinhs)
        ) {
          console.warn("Không tìm thấy dự án, chuyển trang...");
          navigate("/404"); // Chuyển sang trang 404 hoặc danh sách
          return;
        }

        setProject(res.data || res);
      } catch (error) {
        // Bước 3: Nếu API báo lỗi (404, 500...), cũng chuyển trang
        console.error("Lỗi API, chuyển trang:", error);
        navigate("/projects");
      }
    };

    fetchData();
  }, [id, navigate]); // Thêm navigate vào dependency

  return (
    <div style={{ padding: "20px" }}>
      {project ? (
        <div>
          {/* Phần thông tin chung */}
          <h2 style={{ color: "#1a237e" }}>{project.tenCongTrinh}</h2>
          <p>
            <strong>Giai đoạn:</strong> {project.tenGiaiDoan}
          </p>
          <p>
            <strong>Ngày tạo:</strong> {project.ngayTao}
          </p>

          <hr />

          {/* Phần in chi tiết công trình */}
          <h3>Danh sách chi tiết:</h3>
          {project.chiTietCongTrinhs && project.chiTietCongTrinhs.length > 0 ? (
            <table
              border={1}
              cellPadding={10}
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th>Mã Giai Đoạn</th>
                  <th>Chi phí xây dựng</th>
                  <th>Tổng giá trị</th>
                  <th>Ngày hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {project.chiTietCongTrinhs.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.maHieuGiaiDoan}</td>
                    <td>{detail.chiPhiXayDung?.toLocaleString()} VNĐ</td>
                    <td>{detail.tongGiaTri?.toLocaleString()} VNĐ</td>
                    <td>{detail.ngayHoanThanh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có dữ liệu chi tiết.</p>
          )}
        </div>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};
export default Test;
