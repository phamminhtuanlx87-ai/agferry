import React, { useState } from "react";
import RoleSelect from "./RoleSelect";
import { useNavigate } from "react-router-dom";
import { register } from "@/services/authService";

type Props = {
  mode: "register" | "create" | "edit";
};
const UserForm = ({ mode }: Props) => {
  const isAdmin = mode !== "register";
  const isEdit = mode === "edit";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [roleID, setRole] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAdmin) {
      if (!roleID) {
        alert("Vui lòng chọn phòng ban");
        return;
      }
    } 
    const roleToSend = isAdmin ? roleID : "1";
    try {
        await register(username, password, email, fullname, Number(roleToSend));
        alert("Đăng ký thành công!");
        if(isAdmin)
        {
           navigate("/dashboard"); 
        }
        else navigate("/login");
      } catch (error) {
        console.error(error);
        alert("Không đăng ký được");
      }
  };

  return (
    <>
      <div className="card-login flex items-center justify-center w-full max-w-5xl mx-auto px-4 mt-5">
        <div className="banerright bg-[#f3f4f6]">
          <div className="sm:w-111.75 w-83.75 bg-white card-soft">
            <h2 className="text-xl font-bold mb-2 text-shadow-sm">
              Tạo tài khoản mới
            </h2>

            <form
              method="post"
              className="flex flex-col gap-3"
              onSubmit={handleRegister}
            >
              {!isEdit && (
                <>
                  <label className="text-shadow-sm text-gray-500">
                    Tên đăng nhập:
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="username card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
                  />
                </>
              )}
              <label className="text-shadow-sm text-gray-500">Mật khẩu:</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="password card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />
              <label className="text-shadow-sm text-gray-500">Họ và tên</label>
              <input
                type="text"
                onChange={(e) => setFullname(e.target.value)}
                className="fullname card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />
              <label className="text-shadow-sm text-gray-500">Email:</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="email card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />
              {isAdmin && (
                <RoleSelect
                  value={roleID}
                  onChange={(value) => setRole(value)}
                ></RoleSelect>
              )}
              <button className="btn-login btn-primary min-w-60 mx-auto btn-elevated mt-3">
                Tạo tài khoản
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
