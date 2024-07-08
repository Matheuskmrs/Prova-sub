using Microsoft.EntityFrameworkCore;
using ProvaSubApi.Models;

namespace ProvaSubApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<IMC> IMCs { get; set; }
    }
}

