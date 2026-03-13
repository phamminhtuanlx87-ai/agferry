using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace agferry.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new List<object>
        {
            new { Id = 1, Title = "Learn React" },
            new { Id = 2, Title = "Learn API" },
            new { Id = 3, Title = "Learn Typescipt" }
        });
        }

    }
}
