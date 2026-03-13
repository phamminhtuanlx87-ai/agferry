using agferry.api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
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
                .FirstOrDefault(u => u.UserName == request.Username && u.PasswordHash == request.Password);

            if (user == null)
                return Unauthorized("Sai tài khoản");

            if (user.PasswordHash != request.Password)
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
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}
