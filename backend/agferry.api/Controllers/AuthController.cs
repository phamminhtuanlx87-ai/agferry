using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace agferry.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            // Safely access Name using null-propagation and provide a fallback to avoid CS8602.
            var username = User?.Identity?.Name ?? "Unknown";
            return Ok(new
            {
                message = "Authorized",
                user = username,
            });
        }
    }
}