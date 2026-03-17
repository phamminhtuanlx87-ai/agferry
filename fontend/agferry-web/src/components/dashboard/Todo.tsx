
const Todo = () => {
  return (
    <div>
       <div className="todo_card bg-white border border-gray-50 border-shadow min-w-75 min-h-110">
              {/* <!-- do something --> */}
              <h3 className="text-lg font-semibold text-gray-800 mb-5">
                Công việc cần xử lý
              </h3>
              <hr className="text-gray-300 shadow-2xl" />
              <div className="divide-y divide-gray-100">
                {/* <!-- Item 1 --> */}
                <div className="flex items-center justify-between py-4 hover:bg-gray-50 transition rounded-lg px-2 -mx-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                      ⚠
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        3 công trình sắp quá hạn
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500"> Hôm nay </span>
                </div>

                {/* <!-- Item 2 --> */}
                <div className="flex items-center justify-between py-4 hover:bg-gray-50 transition rounded-lg px-2 -mx-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      📄
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        2 hồ sơ chưa duyệt
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500"> Ngày mai </span>
                </div>

                {/* <!-- Item 3 --> */}
                <div className="flex items-center justify-between py-4 hover:bg-gray-50 transition rounded-lg px-2 -mx-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                      💰
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        1 công trình vượt dự toán
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500"> 25/04/2024 </span>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Todo
