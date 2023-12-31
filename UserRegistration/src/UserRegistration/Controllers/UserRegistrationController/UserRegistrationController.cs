using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using UserRegistration.Models;
using UserRegistration.Services;

namespace UserRegistration.Controllers;

[ApiController]
[Route("registration")]
public class UserRegistrationController : ControllerBase
{
  private readonly IUserService userService;
  private readonly IWebHostEnvironment webHostEnvironment;

  public UserRegistrationController(IUserService userService, IWebHostEnvironment webHostEnvironment)
  {
    this.userService = userService;
    this.webHostEnvironment = webHostEnvironment;
  }

  [HttpGet]
  [Route("ping")]
  public IActionResult Ping()
  {
    return Ok($"You've reached the user registration api. Environment = {webHostEnvironment.EnvironmentName}");
  }

  [HttpPost]
  public async Task<IActionResult> PostNewUser([FromBody] CreateUserRequestDTO newUser)
  {
    try
    {
      Response response = await userService.CreateNewUser(newUser);
      if (response.WasSuccess)
      {
        return Ok();
      }
      return BadRequest(response);
    }
    catch
    {
      return BadRequest("Something terrible and unforeseen has happened");
    }
  }
}