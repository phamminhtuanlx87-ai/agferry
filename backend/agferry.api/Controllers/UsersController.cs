using agferry.api.Models;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace agferry.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly AgferryDatabaseContext _context;

        public UsersController(AgferryDatabaseContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);

            var user = _context.Users
                .Include(u => u.Department)
                .FirstOrDefault(u => u.UserName == request.Username);

            if (user == null)
                return Unauthorized("Sai tài khoản");
            if (user.PasswordHash == null)
                return Unauthorized("Tài khoản đăng nhập bằng Google");
            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password
            );

            if (result == PasswordVerificationResult.Failed)
                return Unauthorized("Sai mật khẩu");

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token = token,
                username = user.UserName,
                depart = user.Department.Id
            });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.Role, "Admin")
    };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("AGFERRY_SUPER_SECRET_KEY_123456789123456")
            );

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: "AGFerry",
                audience: "AGFerry",
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public class LoginRequest
        {
            [Required]
            public required string Username { get; set; }
            [Required]
            public required string Password { get; set; }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);
            if (_context.Users.Any(u => u.UserName == request.Username))
            {
                return BadRequest("Username đã tồn tại");
            }
            var hasher = new PasswordHasher<User>();

            var user = new User
            {
                UserName = request.Username,
                Email = request.Email,
                FullName = request.FullName,
                DepartmentId = request.DepartmentId == 0 ? 1 : request.DepartmentId
            };
            user.PasswordHash = hasher.HashPassword(user, request.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = user.Id,
                username = user.UserName,
                email = user.Email
            });
        }
<<<<<<< HEAD
        [Authorize]
        [HttpPost("me")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);
            var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserName == request.Username);
            var hasher = new PasswordHasher<User>();
            var currentUser = User.Identity?.Name;

            if (currentUser != request.Username && !User.IsInRole("Admin"))
                return Forbid();
            if (user != null)
            {
                user.Email = request.Email;
                user.FullName = request.FullName;
                if (request.DepartmentId != 7)
                {
                    user.DepartmentId = request.DepartmentId == 0
                        ? 1
                        : request.DepartmentId;
                }
                user.PasswordHash = hasher.HashPassword(user, request.Password);

                await _context.SaveChangesAsync();
            }
            else
                return NotFound();
            return Ok(new
            {
                username = user.UserName,
                email = user.Email,
                fullname = user.FullName,
                departmentid = user.DepartmentId
            });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUserAsync()
        {
            var username = User.Identity?.Name;
            if(username == null)
                return Unauthorized();
            var user = await _context.Users
            .Include(u => u.Department)
            .FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
                return NotFound();
            return Ok(new { 
                username = user.UserName,
                email = user.Email,
                fullName = user.FullName,
                departmentName = user.Department.Name
            });
        }
=======
>>>>>>> f42b77668fb7ffa8608a267c25a4db9f9dfb5bd6
        public class UserRequest
        {
            [Required]
            public required string Username { get; set; }

            [Required]
            public required string Password { get; set; }

            [EmailAddress]
            public required string Email { get; set; }

            [Required]
            public required string FullName { get; set; }

            [Required]
            public int DepartmentId { get; set; }
        }
    }
}
