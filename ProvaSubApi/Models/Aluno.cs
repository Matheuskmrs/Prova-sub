using System;
using System.ComponentModel.DataAnnotations;

namespace ProvaSubApi.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        
        [Required]
        public string Nome { get; set; }
        
        [Required]
        public DateTime DataNascimento { get; set; }
    }
}
