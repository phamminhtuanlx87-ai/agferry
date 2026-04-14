# GIAI ĐOẠN 1: Build ứng dụng
FROM mcr.microsoft.com / dotnet / sdk:8.0 AS build-env
WORKDIR /app

# Copy các file dự án (.csproj) và phục hồi các thư viện (restore)
# Lưu ý: Chỉnh sửa đường dẫn này cho đúng với cấu trúc thư mục của bạn
COPY backend/agferry.api/*.csproj ./backend/agferry.api/
RUN dotnet restore backend/agferry.api/agferry.api.csproj

# Copy toàn bộ code và build
COPY . ./
RUN dotnet publish backend/agferry.api/agferry.api.csproj -c Release -o out

# GIAI ĐOẠN 2: Chạy ứng dụng
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# Cấu hình cổng (Render thường dùng cổng 80 hoặc 10000)
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

# Lệnh khởi chạy file .dll của bạn
ENTRYPOINT ["dotnet", "agferry.api.dll"]