export const projectStatusMap: Record<
  number,
  { short: string; full: string; color: string }> = {
  1: {
    short: "Dự toán",
    full: "Lập dự toán công trình",
    color: "bg-amber-200 text-amber-900 border border-amber-400"
  },
  2: {
    short: "Thẩm tra DT",
    full: "Thẩm tra dự toán",
    color: "bg-blue-200 text-blue-900 border border-blue-400"
  },
  3: {
    short: "Phê duyệt DT",
    full: "Phê duyệt dự toán & KH lựa chọn nhà thầu",
    color: "bg-blue-300 text-blue-900 border border-blue-400"
  },
  4: {
    short: "Đang thi công",
    full: "Công trình đang thi công",
    color: "bg-indigo-300 text-indigo-900 border border-indigo-400"
  },
  5: {
    short: "Thi công HT",
    full: "Thi công hoàn thành",
    color: "bg-emerald-300 text-emerald-900 border border-emerald-400"
  },
  6: {
    short: "Dự Toán PS",
    full: "Lập dự toán phát sinh",
    color: "bg-amber-300 text-amber-900 border border-amber-400"
  },
  7: {
    short: "Thẩm tra DTPS",
    full: "Thẩm tra dự toán phát sinh",
    color: "bg-blue-400 text-blue-900 border border-blue-400"
  },
  8: {
    short: "Quyết toán",
    full: "Quyết toán hoàn thành công trình",
    color: "bg-emerald-400 text-emerald-900 border border-emerald-400"
  }
};