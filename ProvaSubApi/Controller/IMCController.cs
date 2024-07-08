using Microsoft.AspNetCore.Mvc;
using ProvaSubApi.Models;
using ProvaSubApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ProvaSubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IMCController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IMCController(ApplicationDbContext context)
        {
            _context = context;
        }

        private string ClassificarIMC(float imc)
        {
            if (imc < 18.5) return "Magreza";
            if (imc < 24.9) return "Normal";
            if (imc < 29.9) return "Sobrepeso";
            if (imc < 39.9) return "Obesidade";
            return "Obesidade Grave";
        }

        [HttpPost]
        public async Task<ActionResult<IMC>> CadastrarIMC(IMC imc)
        {
            var aluno = await _context.Alunos.FindAsync(imc.AlunoId);
            if (aluno == null)
            {
                return BadRequest("Aluno não encontrado.");
            }

            imc.ValorIMC = imc.Peso / (imc.Altura * imc.Altura);
            imc.Classificacao = ClassificarIMC(imc.ValorIMC);
            imc.DataMedicao = DateTime.Now;

            _context.IMCs.Add(imc);
            await _context.SaveChangesAsync();

            return Ok(imc);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IMC>>> ListarIMCs()
        {
            return await _context.IMCs.Include(i => i.Aluno).ToListAsync();
        }

        [HttpGet("por-aluno/{alunoId}")]
        public async Task<ActionResult<IEnumerable<IMC>>> ListarIMCsPorAluno(int alunoId)
        {
            var imcsPorAluno = await _context.IMCs.Include(i => i.Aluno)
                                                  .Where(i => i.AlunoId == alunoId)
                                                  .ToListAsync();
            if (!imcsPorAluno.Any())
                return NotFound("Nenhum IMC encontrado para o aluno especificado.");
            return Ok(imcsPorAluno);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<IMC>> AlterarIMC(int id, IMC imc)
        {
            var existingIMC = await _context.IMCs.FindAsync(id);
            if (existingIMC == null)
                return NotFound("IMC não encontrado.");

            existingIMC.Peso = imc.Peso;
            existingIMC.Altura = imc.Altura;
            existingIMC.ValorIMC = imc.Peso / (imc.Altura * imc.Altura);
            existingIMC.Classificacao = ClassificarIMC(existingIMC.ValorIMC);
            existingIMC.DataMedicao = imc.DataMedicao;

            _context.Entry(existingIMC).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(existingIMC);
        }
    }
}
