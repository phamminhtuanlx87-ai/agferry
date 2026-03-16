/* =========================================
   INIT DATABASE - USER & DEPARTMENT MODULE
   ========================================= */

-- Xóa nếu tồn tại (chỉ dùng khi test)
IF OBJECT_ID('Users', 'U') IS NOT NULL DROP TABLE Users;
IF OBJECT_ID('Departments', 'U') IS NOT NULL DROP TABLE Departments;

------------------------------------------------
-- 1. CREATE TABLE: Departments
------------------------------------------------
CREATE TABLE Departments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1
);

------------------------------------------------
-- 2. INSERT DEFAULT DEPARTMENTS
------------------------------------------------
INSERT INTO Departments (Name) VALUES
(N'Chưa xác định'),
(N'Phòng Kế toán'),
(N'Phòng Đầu tư'),
(N'Phòng Kỹ thuật - Vật tư'),
(N'Ban giám đốc'),
(N'XN Cơ khí - Giao thông');

------------------------------------------------
-- 3. CREATE TABLE: Users
------------------------------------------------
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),

    FullName NVARCHAR(150) NOT NULL,
   
    PasswordHash NVARCHAR(500) NULL,
 Email NVARCHAR(150) NOT NULL UNIQUE,

    -- Mặc định = 1 (Chưa xác định)
    DepartmentId INT NOT NULL DEFAULT 1,

    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Users_Departments
        FOREIGN KEY (DepartmentId)
        REFERENCES Departments(Id)
);

------------------------------------------------
-- 4. CHECK DATA
------------------------------------------------
SELECT * FROM Departments;