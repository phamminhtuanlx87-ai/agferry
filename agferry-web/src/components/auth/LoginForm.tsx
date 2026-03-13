import { useState } from "react";
import bannerLeft from "@/assets/images/banner_left.png";
import googleIcon from "@/assets/icons/googleicon.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response  = await login(username, password);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };


  return (
    <>
      <div className="card-login flex items-center justify-center w-full max-w-5xl mx-auto px-4">
        <div
          className="banerleft w-130 h-100 bg-no-repeat bg-contain bg-center md:flex md:flex-col items-center justify-center text-center hidden"
          style={{ backgroundImage: `url(${bannerLeft})` }}
        ></div>

        <div className="banerright bg-[#f3f4f6]">
          <div className="sm:w-111.75 w-83.75 bg-white card-soft">
            <h2 className="text-xl font-bold mb-2 text-shadow-sm">Đăng nhập</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <label className="text-shadow-sm text-gray-500">
                Tên đăng nhập:
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />

              <label className="text-shadow-sm text-gray-500">Mật khẩu:</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />

              <button
                type="submit"
                className="btn-login btn-primary min-w-60 mx-auto btn-elevated mt-3"
              >
                Đăng nhập
              </button>

              <button
                type="button"
                className="btn-login-google btn-secondary text-gray-700 min-w-60 flex justify-center items-center gap-3 
                mx-auto btn-elevated my-2 mt-3"
              >
                <img src={googleIcon} className="w-5 h-5" />
                Đăng nhập với Google
              </button>

              <p className="text-center mt-3">
                Chưa có tài khoản?
                <Link
                  to="/register"
                  className="text-blue-600 font-medium ml-1 hover:text-accent hover:cursor-pointer hover:underline"
                >
                  Đăng ký
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
