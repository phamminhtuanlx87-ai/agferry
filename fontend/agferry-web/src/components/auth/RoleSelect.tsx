type Props = {
  value: string
  onChange: (value: string) => void
}
export default function RoleSelect({ value ,onChange }: Props) {
  const roles = [
    { id: "1", name: "Chưa xác định" },
    { id: "2", name: "Phòng Kế toán" },
    { id: "3", name: "Phòng Đầu tư" },
    { id: "4", name: "Phòng Kỹ thuật - Vật tư" },
    { id: "6", name: "XN Cơ khí - Giao thông" },
    { id: "5", name: "Ban giám đốc" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <label className="text-shadow-sm text-gray-500">Chọn Phòng ban:</label>
      <select
        value={value}
        onChange={handleChange}
        className="input-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm "
      >
        <option value="">-- Chọn phòng ban --</option>

        {roles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
    </>
  );
}
