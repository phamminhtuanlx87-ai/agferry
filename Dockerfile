# GIAI ĐOẠN 1: Build ứng dụng
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy file .csproj và restore
COPY backend/agferry.api/*.csproj ./backend/agferry.api/
RUN dotnet restore backend/agferry.api/agferry.api.csproj

# Copy toàn bộ code và build
COPY . ./
RUN dotnet publish backend/agferry.api/agferry.api.csproj -c Release -o out

# GIAI ĐOẠN 2: Chạy ứng dụng
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# Render sử dụng cổng 10000 mặc định cho web service
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "agferry.api.dll"]