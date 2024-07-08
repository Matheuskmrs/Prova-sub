using System;
using System.ComponentModel.DataAnnotations;

namespace ProvaSubApi.Models
{
    public class IMC
    {
        public int Id { get; set; }
        
        [Required]
        public int AlunoId { get; set; }
        
        public Aluno Aluno { get; set; }
        
        [Required]
        public float Peso { get; set; }
        
        [Required]
        public float Altura { get; set; }
        
        public float ValorIMC { get; set; }
        
        public string Classificacao { get; set; }
        
        public DateTime DataMedicao { get; set; }
    }
}
