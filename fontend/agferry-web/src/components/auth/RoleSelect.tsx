import { useState } from "react";

export default function RoleSelect() {
  const [role, setRole] = useState("");

  const roles = [
    { id: "2", name: "Phòng Kế toán" },
    { id: "3", name: "Phòng Đầu tư" },
    { id: "4", name: "Phòng Kỹ thuật - Vật tư" },
    { id: "6", name: "XN Cơ khí - Giao thông" },
    { id: "5", name: "Ban giám đốc" }
  ];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500">Vai trò</label>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="h-11 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-shadow-sm"
      >
        <option value="" >-- Chọn Phòng ban --</option>

        {roles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}

      </select>
    </div>
  );
}