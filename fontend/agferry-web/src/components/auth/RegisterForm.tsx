// import React from 'react'

import RoleSelect from "./RoleSelect"

const RegisterForm = () => {
  return (
    <>
      <div className="card-login flex items-center justify-center w-full max-w-5xl mx-auto px-4 mt-5">
        <div className="banerright bg-[#f3f4f6]">
          <div className="sm:w-111.75 w-83.75 bg-white card-soft">
            <h2 className="text-xl font-bold mb-2 text-shadow-sm">Tạo tài khoản mới</h2>

            <form method="post" className="flex flex-col gap-3">
              <label className="text-shadow-sm text-gray-500">
                Tên đăng nhập:
              </label>
              <input
                type="text"
                className="username card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />
              <label className="text-shadow-sm text-gray-500">Mật khẩu:</label>
              <input
                type="password"
                className="password card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />
              <label className="text-shadow-sm text-gray-500">Họ và tên</label>
              <input
                type="text"
                className="fullname card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />
              <label className="text-shadow-sm text-gray-500">Email:</label>
              <input
                type="email"
                className="email card-soft rounded-md h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 text-shadow-sm"
              />
              
              <RoleSelect></RoleSelect>
              <button className="btn-login btn-primary min-w-60 mx-auto btn-elevated mt-3">
                Tạo tài khoản
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
