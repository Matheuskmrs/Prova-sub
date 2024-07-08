using Microsoft.AspNetCore.Mvc;
using ProvaSubApi.Models;
using ProvaSubApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ProvaSubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AlunoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Aluno>> CadastrarAluno(Aluno aluno)
        {
            if (await _context.Alunos.AnyAsync(a => a.Nome == aluno.Nome))
            {
                return BadRequest("Aluno com o mesmo nome já cadastrado.");
            }

            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();

            return Ok(aluno);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aluno>>> ListarAlunos()
        {
            return await _context.Alunos.ToListAsync();
        }
    }
}
