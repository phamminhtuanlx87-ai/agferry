# GIAI ĐOẠN 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy file project từ thư mục backend vào
COPY backend/agferry.api/*.csproj ./backend/agferry.api/
RUN dotnet restore backend/agferry.api/agferry.api.csproj

# Copy toàn bộ mã nguồn
COPY . ./
RUN dotnet publish backend/agferry.api/agferry.api.csproj -c Release -o out

# GIAI ĐOẠN 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "agferry.api.dll"]